# Bundled fonts

**Fredoka** and **Nunito** are self-hosted here rather than loaded from Google's CDN.
Both are licensed under the **SIL Open Font License 1.1**, which permits bundling and
redistribution with this site.

- Fredoka — https://fonts.google.com/specimen/Fredoka
- Nunito — https://fonts.google.com/specimen/Nunito
- OFL 1.1 — https://openfontlicense.org/

Self-hosted on purpose: the site then works offline, loads faster (no third-party
connection), and avoids sending visitor IP addresses to Google — which has been treated
as a GDPR problem for EU/UK sites. Keep it this way unless you have a reason not to.

`fonts.css` is Google's generated stylesheet with the remote URLs rewritten to the local
`.woff2` files beside it. To update, re-fetch the stylesheet and repeat that rewrite.
