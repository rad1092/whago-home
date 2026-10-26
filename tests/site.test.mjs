// Checks the static export in out/, which is exactly what Nginx serves.
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const out = new URL("../out/", import.meta.url).pathname;
const products = JSON.parse(readFileSync(new URL("../content/products.json", import.meta.url), "utf8"));
const slugs = products.map((product) => product.slug);
const pages = ["/", "/software", ...slugs.map((slug) => `/software/${slug}`), "/support"];

const koPath = (page) => (page === "/" ? "/ko" : `/ko${page}`);

// Mirrors the Nginx try_files order: $uri.html, $uri/index.html, $uri.
function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  for (const candidate of [`${clean}.html`, path.join(clean, "index.html"), clean]) {
    const file = path.join(out, candidate);
    if (existsSync(file) && statSync(file).isFile()) return file;
  }
  return null;
}

function html(urlPath) {
  const file = resolve(urlPath);
  assert.ok(file, `${urlPath} is missing from out/`);
  return readFileSync(file, "utf8");
}

function visibleText(source) {
  return (
    source
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<pre[\s\S]*?<\/pre>/g, " ")
      // Release file names are shown as they are.
      .replace(/<details class="download-box__more">[\s\S]*?<\/details>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
  );
}

test("every page exists in English at / and Korean at /ko with matching metadata", () => {
  for (const page of pages) {
    for (const [locale, url] of [
      ["en", page],
      ["ko", koPath(page)],
    ]) {
      const source = html(url);
      assert.match(source, new RegExp(`<html lang="${locale}"`), url);
      assert.match(source, /<main[^>]*id="main"/, url);
      assert.match(source, /href="#main"/, url);
      assert.ok(
        source.includes(`<link rel="canonical" href="https://whago.net${url === "/" ? "" : url}"`),
        `${url} canonical`,
      );
      assert.ok(source.includes(`hrefLang="ko" href="https://whago.net${koPath(page)}"`), `${url} ko alternate`);
      assert.ok(
        source.includes(`<meta property="og:url" content="https://whago.net${url === "/" ? "" : url}"`),
        `${url} og:url`,
      );
      assert.match(source, new RegExp(`og:locale" content="${locale === "ko" ? "ko_KR" : "en_US"}"`), url);
    }
  }
});

test("product pages share their own card, not the home page's", () => {
  for (const product of products) {
    const source = html(`/software/${product.slug}`);
    assert.ok(source.includes(`<title>${product.name} · WHAGO</title>`), product.slug);
    assert.ok(source.includes(`og:title" content="${product.name} · WHAGO"`), product.slug);
    assert.ok(source.includes(`og:image" content="https://whago.net/og/${product.slug}.png"`), product.slug);
    assert.ok(existsSync(path.join(out, "og", `${product.slug}.png`)), `og image for ${product.slug}`);
  }
});

test("internal links and images resolve to exported files", () => {
  const seen = new Set();
  for (const page of pages.flatMap((page) => [page, koPath(page)])) {
    const source = html(page);
    for (const [, attr, value] of source.matchAll(/\s(href|src)="(\/[^"]*)"/g)) {
      if (value.startsWith("//") || seen.has(value)) continue;
      seen.add(value);
      if (value.startsWith("/_next/")) continue;
      assert.ok(resolve(value), `${page}: ${attr}="${value}" does not resolve`);
    }
  }
});

test("copy follows the site's rules", () => {
  for (const page of pages.flatMap((page) => [page, koPath(page)])) {
    const text = visibleText(html(page));
    assert.doesNotMatch(text, /→|↗|←/, `${page} uses arrow characters`);
    assert.doesNotMatch(text, /보장하지 않습니다|공증|Authenticode|notariz/i, `${page} has a disclaimer`);
    assert.doesNotMatch(
      text,
      /\b(TOOLS & UPDATES|OPEN-SOURCE UTILITIES|CONTACT|ARCHIVE)\b/,
      `${page} has an all-caps eyebrow`,
    );
    assert.doesNotMatch(text, /fixture|코퍼스|합성/i, `${page} uses internal jargon`);
  }
});

test("pages carry no retired products or portfolio link", () => {
  for (const page of pages.flatMap((page) => [page, koPath(page)])) {
    const source = html(page);
    const text = visibleText(source);
    assert.doesNotMatch(text, /Daymark|Siteboard/, `${page} mentions a retired product`);
    assert.doesNotMatch(source, /rad1092\.github\.io/, `${page} links to the portfolio`);
  }
  for (const removed of ["software/daymark", "software/siteboard", "archive", "releases", "house"]) {
    assert.equal(resolve(`/${removed}`), null, `${removed} is still exported`);
  }
});

test("every page offers both languages and remembers the choice", () => {
  for (const page of pages) {
    for (const source of [html(page), html(koPath(page))]) {
      assert.ok(source.includes(`href="${page}"`), `${page}: no English link`);
      assert.ok(source.includes(`href="${koPath(page)}"`), `${page}: no Korean link`);
      assert.match(source, /whago-language/, `${page} has no language detection`);
    }
  }
});

test("the 404 page has both languages and a skip target", () => {
  const source = readFileSync(path.join(out, "404.html"), "utf8");
  assert.match(source, /Page not found/);
  assert.match(source, /페이지가 없습니다/);
  assert.match(source, /id="main"/);
});

test("the sitemap lists every page with both languages", () => {
  const xml = readFileSync(path.join(out, "sitemap.xml"), "utf8");
  for (const page of pages) {
    assert.ok(xml.includes(`<loc>https://whago.net${page}</loc>`), page);
  }
  assert.match(xml, /hreflang="ko" href="https:\/\/whago.net\/ko\/support"/);
  assert.doesNotMatch(readFileSync(path.join(out, "robots.txt"), "utf8"), /^Host:/m);
});
