#!/usr/bin/env python3
"""Minimal CONNECT-only forward proxy.

Chromium cannot open outbound :443 in this container, but Python can. Chromium
speaks plain HTTP to this proxy on loopback (which works), and Python opens the
real socket and blindly relays bytes. TLS stays end-to-end between Chromium and
the origin — this proxy never decrypts anything.
"""
import socket, threading, select, sys

LISTEN = ("127.0.0.1", int(sys.argv[1]) if len(sys.argv) > 1 else 8899)


def pipe(a, b):
    try:
        while True:
            r, _, _ = select.select([a, b], [], [], 60)
            if not r:
                break
            for s in r:
                data = s.recv(65536)
                if not data:
                    return
                (b if s is a else a).sendall(data)
    except Exception:
        pass


def handle(client):
    try:
        req = b""
        while b"\r\n\r\n" not in req:
            chunk = client.recv(4096)
            if not chunk:
                return
            req += chunk
        line = req.split(b"\r\n", 1)[0].decode("latin-1")
        parts = line.split()
        if len(parts) < 2 or parts[0].upper() != "CONNECT":
            client.sendall(b"HTTP/1.1 405 Only CONNECT\r\n\r\n")
            return
        host, _, port = parts[1].partition(":")
        upstream = socket.create_connection((host, int(port or 443)), timeout=30)
        client.sendall(b"HTTP/1.1 200 Connection Established\r\n\r\n")
        pipe(client, upstream)
        upstream.close()
    except Exception:
        try:
            client.sendall(b"HTTP/1.1 502 Bad Gateway\r\n\r\n")
        except Exception:
            pass
    finally:
        try:
            client.close()
        except Exception:
            pass


srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
srv.bind(LISTEN)
srv.listen(128)
print(f"tunnel proxy listening on {LISTEN[0]}:{LISTEN[1]}", flush=True)
while True:
    c, _ = srv.accept()
    threading.Thread(target=handle, args=(c,), daemon=True).start()
