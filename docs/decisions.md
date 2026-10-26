# Decisions

Short records of choices that shape this site. Newest first.

## 2026-10: English first, one build

- English pages live at `/`, Korean pages at `/ko/`. Every page links to its
  other-language version and declares both with `hreflang`.
- The site is a Next.js static export (`next build` → `out/`) served by Nginx.
  The earlier vinext/Cloudflare Worker build was removed: it was not deployed,
  and the tests were checking it instead of the files Nginx serves.
- The catalog is data, not code: `content/products.json` and
  `content/releases.json`, validated at build time by `lib/catalog.ts`.
  A product's version, download links and install commands all come from its
  newest entry in `releases.json`.
- Copy rules are in the README. `tests/site.test.mjs` enforces the ones a test
  can check.
- Matcha's web player is served from `play.whago.net`, not whago.net, because
  it needs `'wasm-unsafe-eval'` and `blob:` in its Content Security Policy and
  the main site doesn't.

## 2026-09-05: Daymark and Siteboard retired

- Neither product had an advantage over established tools that justified
  rebuilding it. FirstCall became the main product.
- Their data stays in each user's browser. The old addresses keep a page that
  reads the original data and downloads it without changing or deleting it,
  and the old app stays available at `/legacy/`.
- The site lists them only on `/archive` and in the footer.
