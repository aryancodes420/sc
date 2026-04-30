/**
 * /api/trigger/ui — Browser-safe proxy for manual pipeline trigger.
 * The browser button calls this route. It adds the CRON_SECRET header
 * server-side and forwards to /api/trigger. The browser never sees the secret.
 */

import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const host    = req.headers.get('host') ?? 'localhost:3000';
  const proto   = host.startsWith('localhost') ? 'http' : 'https';
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(`${baseUrl}/api/trigger`, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${process.env.CRON_SECRET}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
