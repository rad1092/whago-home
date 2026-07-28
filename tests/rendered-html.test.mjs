import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);
const previewRoot = new URL("../app/_sites-preview/", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the WHAGO tool suite", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.match(
    response.headers.get("content-security-policy") ?? "",
    /frame-ancestors 'none'/,
  );

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="ko"/i);
  assert.match(html, /<title>WHAGO — 운영 도구<\/title>/i);
  assert.match(html, /계획하고,/);
  assert.match(html, /Daymark/);
  assert.match(html, /RepoLens/);
  assert.match(html, /Siteboard/);
  assert.match(html, /href="\/daymark\/"/);
  assert.match(html, /href="\/repolens\/"/);
  assert.match(html, /href="\/siteboard\/"/);
  assert.match(html, /github\.com\/rad1092\/daymark/);
  assert.match(html, /github\.com\/rad1092\/repolens/);
  assert.match(html, /github\.com\/rad1092\/siteboard/);
  assert.match(html, /repolens \./);
  assert.match(html, /Grade B/);
  assert.match(html, /detected/);
  assert.doesNotMatch(html, /repolens audit|GOOD|CI workflow[\s\S]*passing/);
  assert.match(html, /property="og:image" content="https:\/\/whago\.net\/og\.png"/);
  assert.match(html, /rel="icon" href="https:\/\/whago\.net\/favicon\.svg"/);
  assert.doesNotMatch(html, /김홍대\s*\/\s*소프트웨어 개발자/);
  assert.doesNotMatch(html, /FirstCall|ASCII Diagram Editor|gh-dep-risk/);
  assert.doesNotMatch(html, /포트폴리오|작업 페이지/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps the suite accessible and free of starter artifacts", async () => {
  const [page, layout, css, packageJson, nginxConfig, deployScript] =
    await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../ops/nginx-whago.conf", import.meta.url), "utf8"),
    readFile(new URL("../ops/deploy-on-lightsail.sh", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /"use client"/);
  assert.match(page, /className="skip-link"/);
  assert.match(page, /id="main"/);
  assert.match(page, /aria-labelledby="hero-title"/);
  assert.match(layout, /metadataBase:\s*new URL\("https:\/\/whago\.net"\)/);
  assert.match(layout, /export const viewport:\s*Viewport/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.match(packageJson, /"build:server":\s*"next build"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(nginxConfig, /X-Frame-Options "DENY" always/);
  assert.match(nginxConfig, /Content-Security-Policy "frame-ancestors 'none'" always/);
  assert.match(nginxConfig, /proxy_pass http:\/\/127\.0\.0\.1:3100\/healthz/);
  assert.doesNotMatch(nginxConfig, /try_files \$uri \$uri\/ \/(daymark|siteboard)\/index\.html/);
  assert.match(deployScript, /sudo ln -sfn "\$home_release"/);
  assert.match(deployScript, /sudo mv -Tf "\$home_root\/current\.next"/);
  assert.match(deployScript, /sudo ln -sfn "\$tools_release"/);
  assert.match(deployScript, /sudo mv -Tf "\$tools_root\/current\.next"/);

  const previewFiles = await readdir(previewRoot).catch((error) => {
    if (error?.code === "ENOENT") return [];
    throw error;
  });
  assert.deepEqual(previewFiles, []);

  await Promise.all([
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/favicon.svg", import.meta.url)),
  ]);
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
});

test("serves health, search metadata, tool routes in sitemap, and a noindex 404", async () => {
  const [
    healthResponse,
    robotsResponse,
    sitemapResponse,
    missingResponse,
    removedCaseResponse,
  ] =
    await Promise.all([
      render("/healthz"),
      render("/robots.txt"),
      render("/sitemap.xml"),
      render("/missing-page"),
      render("/work/firstcall"),
    ]);

  assert.equal(healthResponse.status, 200);
  assert.equal(await healthResponse.text(), "ok\n");
  assert.match(healthResponse.headers.get("cache-control") ?? "", /no-store/);

  assert.equal(robotsResponse.status, 200);
  assert.match(
    await robotsResponse.text(),
    /Sitemap: https:\/\/whago\.net\/sitemap\.xml/,
  );

  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /<loc>https:\/\/whago\.net<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/whago\.net\/daymark\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/whago\.net\/repolens\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/whago\.net\/siteboard\/<\/loc>/);

  assert.equal(missingResponse.status, 404);
  assert.match(
    await missingResponse.text(),
    /<meta(?=[^>]*\bcontent="noindex")(?=[^>]*\bname="robots")[^>]*>/,
  );

  assert.equal(removedCaseResponse.status, 404);
});
