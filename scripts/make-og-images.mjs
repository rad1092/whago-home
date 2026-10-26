#!/usr/bin/env node
// Renders public/og/<slug>.png (1200x630 share cards) from content/products.json.
// Needs Playwright with Chromium: run it after changing a product's name,
// summary or screenshot, then commit the images.
import { readFileSync, mkdirSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const root = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const products = JSON.parse(readFileSync(path.join(root, "content/products.json"), "utf8"));
const escape = (text) => text.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function visual(product) {
  if (product.media) {
    const file = path.join(root, "public", product.media.src);
    const data = readFileSync(file).toString("base64");
    const type =
      path.extname(file) === ".gif" ? "image/gif" : path.extname(file) === ".jpg" ? "image/jpeg" : "image/png";
    return `<img src="data:${type};base64,${data}">`;
  }
  const sample = path.join(root, "content/terminal", `${product.terminal}.txt`);
  return existsSync(sample) ? `<pre>${escape(readFileSync(sample, "utf8"))}</pre>` : "";
}

const page = (product) => `<!doctype html><meta charset="utf-8"><style>
  body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #f8fafc; color: #142139;
    font-family: -apple-system, "Segoe UI", Roboto, "Noto Sans KR", sans-serif; }
  .copy { position: absolute; left: 64px; top: 64px; width: 470px; }
  .brand { font-weight: 850; letter-spacing: -0.06em; font-size: 28px; }
  .type { margin-top: 72px; color: #57657a; font-size: 24px; font-weight: 600; }
  h1 { margin: 8px 0 20px; font-size: 76px; letter-spacing: -0.03em; line-height: 1; }
  p { margin: 0; font-size: 30px; line-height: 1.35; color: #34425a; }
  .visual { position: absolute; left: 580px; top: 64px; width: 700px; height: 600px; overflow: hidden;
    border-radius: 16px; border: 1px solid #dce2eb; box-shadow: 0 20px 50px #14213922; background: #fff; }
  .visual img { width: 100%; display: block; }
  .visual pre { margin: 0; padding: 28px; height: 100%; background: #142139; color: #e3eaf8; font-size: 17px; line-height: 1.55;
    font-family: ui-monospace, Menlo, Consolas, monospace; white-space: pre-wrap; }
</style><div class="copy"><div class="brand">WHAGO</div><div class="type">${escape(product.en.type)}</div>
<h1>${escape(product.name)}</h1><p>${escape(product.en.summary)}</p></div><div class="visual">${visual(product)}</div>`;

const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 } });
mkdirSync(path.join(root, "public/og"), { recursive: true });
for (const product of products) {
  await tab.setContent(page(product));
  await tab.screenshot({ path: path.join(root, "public/og", `${product.slug}.png`) });
  console.log(`public/og/${product.slug}.png`);
}
await browser.close();
