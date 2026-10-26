# whago.net

Source for [whago.net](https://whago.net), the site for WHAGO's apps and
command-line tools. English pages are at `/`, Korean pages at `/ko/`.

## Run it

Node.js 22.13 or newer.

```sh
npm ci
npm run dev        # http://localhost:3000
npm test           # builds the static export into out/ and checks it
npm run lint
npm run format     # Prettier
```

## Where things are

| Path                     | What                                                          |
| ------------------------ | ------------------------------------------------------------- |
| `content/products.json`  | Every product: copy in both languages, screenshots, downloads |
| `content/releases.json`  | Release notes. The newest entry sets a product's version      |
| `content/terminal/`      | Real command output shown for command-line tools              |
| `lib/catalog.ts`         | Loads and validates `content/` at build time                  |
| `lib/site.ts`            | Interface text, contact address, page metadata                |
| `app/_pages/`            | One component per page, rendered for both languages           |
| `app/(en)/`, `app/(ko)/` | Routes. Each file passes its language to a page from `_pages` |
| `ops/`                   | Nginx config and the Lightsail deploy scripts                 |
| `scripts/`               | `make-og-images.mjs` renders the share images in `public/og/` |
| `docs/decisions.md`      | Why the site is built the way it is                           |

## Add a release

1. Add an entry to the top of `content/releases.json` with notes in both languages.
2. If file names changed, update the product's `downloads` in `content/products.json`.
   `{version}` in a file name or command is filled in from the release.
3. `npm test`, then deploy.

## Copy rules

1. Headings state facts. No slogans or promises.
2. A product's one-line summary says what goes in and what comes out. Who it's for goes in the spec table.
3. Limitations and disclaimers go only under Limitations at the bottom of the product page.
4. Don't describe how honest or careful we are.
5. Use the words people use, not internal ones: "example", not "fixture" or "synthetic corpus".
6. "Review" and "verify" at most once per page.
7. Middle dots only inside short tags. In sentences, use commas or "and".
8. Arrows only as the external-link icon, never in buttons or internal links.
9. Short sentences, at most two per paragraph where possible.
10. Each fact lives in one place. Link to it elsewhere.

`tests/site.test.mjs` checks the ones a test can.

## Deploy

whago.net is a static export served by Nginx on Lightsail.

```sh
ops/deploy-on-lightsail.sh               # builds main, tests it, switches over, rolls back on failure
ops/deploy-product-on-lightsail.sh matcha main   # play.whago.net
```

`play.whago.net` needs a DNS record and a certificate before its first deploy.
Seed the release with `ops/deploy-product-on-lightsail.sh matcha main --bootstrap`,
then run `ops/bootstrap-products-on-lightsail.sh`, which expands the certificate
and installs the Nginx config.

Servers set up before October 2026 load Nginx from `sites-available/localfit`.
Run `ops/rename-nginx-site.sh` once to move it to `sites-available/whago`.

## Daymark and Siteboard

Both were retired on 2026-09-05. `public/daymark/` and `public/siteboard/` are
the pages at their old whago.net addresses. They read the data still stored in
that browser and download it without changing anything. `/archive` explains
how to get the data.

## License

[MIT](LICENSE)
