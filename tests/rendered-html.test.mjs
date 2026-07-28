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

test("server-renders the WHAGO portfolio", async () => {
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
  assert.match(html, /<title>WHAGO — HongDae Kim<\/title>/i);
  assert.match(html, /사람의 다음 한 걸음을 돕는 소프트웨어를 만듭니다\./);
  assert.match(html, /FirstCall/);
  assert.match(html, /Local-first API workbench/);
  assert.match(html, /rad1092\/firstcall-local-api-workbench/);
  assert.match(html, /mailto:rad174951@gmail\.com/);
  assert.match(html, /property="og:image" content="https:\/\/whago\.net\/og\.png"/);
  assert.match(html, /name="twitter:image" content="https:\/\/whago\.net\/og\.png"/);
  assert.match(html, /rel="icon" href="https:\/\/whago\.net\/favicon\.svg"/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
  assert.doesNotMatch(html, /react-loading-skeleton|codex-preview/);
});

test("keeps the portfolio static, accessible, and free of starter artifacts", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /"use client"/);
  assert.match(page, /className="skip-link"/);
  assert.match(page, /id="main"/);
  assert.match(layout, /metadataBase:\s*new URL\("https:\/\/whago\.net"\)/);
  assert.match(layout, /export const viewport:\s*Viewport/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

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

test("serves search metadata and a noindex 404", async () => {
  const [robotsResponse, sitemapResponse, missingResponse] = await Promise.all([
    render("/robots.txt"),
    render("/sitemap.xml"),
    render("/missing-page"),
  ]);

  assert.equal(robotsResponse.status, 200);
  assert.match(await robotsResponse.text(), /Sitemap: https:\/\/whago\.net\/sitemap\.xml/);

  assert.equal(sitemapResponse.status, 200);
  assert.match(await sitemapResponse.text(), /<loc>https:\/\/whago\.net<\/loc>/);

  assert.equal(missingResponse.status, 404);
  assert.match(
    await missingResponse.text(),
    /<meta(?=[^>]*\bcontent="noindex")(?=[^>]*\bname="robots")[^>]*>/,
  );
});
