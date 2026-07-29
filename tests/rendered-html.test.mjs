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

test("renders the WHAGO product homepage with three independent products", async () => {
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
  assert.match(
    html,
    /<title>WHAGO — Daymark · RepoLens · Siteboard<\/title>/i,
  );
  assert.match(html, />WHAGO</);
  assert.match(html, /Daymark/);
  assert.match(html, /RepoLens/);
  assert.match(html, /Siteboard/);
  assert.match(html, /href="https:\/\/daymark\.whago\.net\/"/);
  assert.match(html, /href="https:\/\/repolens\.whago\.net\/"/);
  assert.match(html, /href="https:\/\/siteboard\.whago\.net\/"/);
  assert.match(html, /github\.com\/rad1092\/daymark/);
  assert.match(html, /github\.com\/rad1092\/repolens/);
  assert.match(html, /github\.com\/rad1092\/siteboard/);
  assert.match(
    html,
    /repolens compare \. --baseline accepted\.json --fail-on new-warning/,
  );
  assert.match(html, /내용[\s\S]*구성[\s\S]*스타일[\s\S]*배포/);
  assert.doesNotMatch(html, /배포 #18|확인 완료|방금 전/);

  assert.match(html, /property="og:image" content="https:\/\/whago\.net\/og\.png"/);
  assert.match(html, /rel="icon" href="https:\/\/whago\.net\/favicon\.svg"/);
  assert.doesNotMatch(
    html,
    /김홍대|FirstCall|gh-dep-risk|LocalFit Lab|rad1092\.github\.io/,
  );
  assert.doesNotMatch(
    html,
    /일에 맞는 소프트웨어를 만듭니다|아닙니다|아니라|단순한|그저|데모/,
  );
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps copy, accessibility, and deployment boundaries explicit", async () => {
  const [
    page,
    layout,
    css,
    packageJson,
    nextConfig,
    nginxConfig,
    deployScript,
    productDeployScript,
    bootstrapScript,
    readme,
    dataMove,
    daymarkMove,
    siteboardMove,
  ] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../ops/nginx-whago.conf", import.meta.url), "utf8"),
    readFile(new URL("../ops/deploy-on-lightsail.sh", import.meta.url), "utf8"),
    readFile(
      new URL("../ops/deploy-product-on-lightsail.sh", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../ops/bootstrap-products-on-lightsail.sh", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
    readFile(new URL("../public/data-move.js", import.meta.url), "utf8"),
    readFile(new URL("../public/daymark/index.html", import.meta.url), "utf8"),
    readFile(new URL("../public/siteboard/index.html", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /"use client"/);
  assert.match(page, /className="skip-link"/);
  assert.match(page, /id="main"/);
  assert.match(page, /aria-labelledby="hero-title"/);
  assert.doesNotMatch(
    page,
    /일에 맞는 소프트웨어를 만듭니다|아닙니다|아니라|단순한|그저|데모/,
  );
  assert.doesNotMatch(page, /김홍대|FirstCall|gh-dep-risk|LocalFit Lab/);

  assert.match(layout, /metadataBase:\s*new URL\("https:\/\/whago\.net"\)/);
  assert.match(layout, /export const viewport:\s*Viewport/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.match(packageJson, /"build:static":\s*"WHAGO_STATIC_EXPORT=1 next build"/);
  assert.match(nextConfig, /output:\s*"export"/);
  assert.match(nextConfig, /process\.env\.WHAGO_STATIC_EXPORT/);

  assert.match(nginxConfig, /root \/srv\/whago-home\/current\/out;/);
  assert.match(nginxConfig, /X-Frame-Options "DENY" always/);
  assert.match(
    nginxConfig,
    /Content-Security-Policy "[^"]*frame-ancestors 'none'[^"]*" always/,
  );
  assert.match(nginxConfig, /try_files \/daymark\/index\.html =404/);
  assert.match(nginxConfig, /try_files \/siteboard\/index\.html =404/);
  assert.match(
    nginxConfig,
    /server_name daymark\.whago\.net;[\s\S]*root \/srv\/whago-products\/daymark\/current\/dist;/,
  );
  assert.match(
    nginxConfig,
    /server_name repolens\.whago\.net;[\s\S]*root \/srv\/whago-products\/repolens\/current\/docs;/,
  );
  assert.match(
    nginxConfig,
    /server_name siteboard\.whago\.net;[\s\S]*root \/srv\/whago-products\/siteboard\/current\/dist;/,
  );
  assert.match(nginxConfig, /server_name www\.whago\.net;[\s\S]*location = \/daymark\//);
  assert.match(nginxConfig, /server_name www\.whago\.net;[\s\S]*location = \/siteboard\//);
  assert.match(nginxConfig, /server_name www\.whago\.net;[\s\S]*location = \/data-move\.js/);
  assert.match(nginxConfig, /return 301 https:\/\/www\.whago\.net\/daymark\//);
  assert.match(nginxConfig, /return 301 https:\/\/www\.whago\.net\/siteboard\//);
  assert.match(nginxConfig, /return 308 https:\/\/repolens\.whago\.net\//);
  assert.match(nginxConfig, /ssl_reject_handshake on/);
  assert.match(nginxConfig, /return 301 https:\/\/\$host\$request_uri/);
  assert.doesNotMatch(nginxConfig, /rad1092\.github\.io/);
  assert.doesNotMatch(nginxConfig, /proxy_pass|whago-tools|127\.0\.0\.1:3100/);

  assert.match(deployScript, /npm --prefix "\$source_dir" run build:static/);
  assert.match(deployScript, /mktemp -d \/tmp\/whago-home-build/);
  assert.match(deployScript, /expected_release_json/);
  assert.match(deployScript, /systemctl disable --now "\$service_name"/);
  assert.match(deployScript, /sudo ln -sfnT "\$home_release"/);
  assert.match(deployScript, /sudo mv -Tf "\$home_root\/current\.next"/);
  assert.match(deployScript, /trap 'rollback \$\?' ERR/);
  assert.match(deployScript, /restore_current_link "\$previous_home"/);
  assert.match(deployScript, /systemctl stop "\$service_name"/);
  assert.match(deployScript, /systemctl disable "\$service_name"/);
  assert.doesNotMatch(
    deployScript,
    /git clone .*\/(daymark|repolens|siteboard)\.git|tools_root|tools_release/,
  );
  assert.match(productDeployScript, /daymark\|repolens\|siteboard/);
  assert.match(productDeployScript, /\/srv\/whago-products\/\$product/);
  assert.match(productDeployScript, /sudo ln -sfnT "\$release_dir"/);
  assert.match(productDeployScript, /sudo mv -Tf "\$next_link"/);
  assert.match(productDeployScript, /trap 'rollback \$\?' ERR/);
  assert.match(productDeployScript, /https:\/\/\$origin_host\/release\.json/);
  assert.match(productDeployScript, /\[\[ "\$EUID" -eq 0 \]\]/);
  assert.match(productDeployScript, /\/tmp\/whago-deploy\.lock/);
  assert.match(productDeployScript, /--bootstrap/);
  assert.doesNotMatch(productDeployScript, /whago-home\.git|nginx-whago\.conf/);
  assert.match(bootstrapScript, /--cert-name "\$certificate_name"/);
  assert.match(bootstrapScript, /--expand/);
  assert.match(bootstrapScript, /daymark\.whago\.net/);
  assert.match(bootstrapScript, /repolens\.whago\.net/);
  assert.match(bootstrapScript, /siteboard\.whago\.net/);
  assert.match(bootstrapScript, /\/tmp\/whago-deploy\.lock/);
  assert.match(bootstrapScript, /\[\[ "\$EUID" -eq 0 \]\]/);

  assert.match(readme, /https:\/\/daymark\.whago\.net\//);
  assert.match(readme, /https:\/\/repolens\.whago\.net\//);
  assert.match(readme, /https:\/\/siteboard\.whago\.net\//);
  assert.doesNotMatch(readme, /GitHub Pages|rad1092\.github\.io/);

  assert.match(dataMove, /daymark:data:v2/);
  assert.match(dataMove, /daymark:data:v1/);
  assert.match(dataMove, /daymark:data:backup"/);
  assert.match(dataMove, /siteboard\.document\.v2/);
  assert.match(dataMove, /siteboard\.document\.recovery\.raw/);
  assert.match(dataMove, /siteboard\.document\.v1/);
  assert.match(dataMove, /window\.localStorage\.getItem/);
  assert.match(dataMove, /https:\/\/daymark\.whago\.net\//);
  assert.match(dataMove, /https:\/\/siteboard\.whago\.net\//);
  assert.doesNotMatch(dataMove, /\bfetch\s*\(/);
  assert.match(daymarkMove, /새 Daymark 열기/);
  assert.match(siteboardMove, /새 Siteboard 열기/);

  const previewFiles = await readdir(previewRoot).catch((error) => {
    if (error?.code === "ENOENT") return [];
    throw error;
  });
  assert.deepEqual(previewFiles, []);

  await Promise.all([
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/favicon.svg", import.meta.url)),
    access(new URL("../public/daymark/index.html", import.meta.url)),
    access(new URL("../public/siteboard/index.html", import.meta.url)),
    access(new URL("../public/data-move.js", import.meta.url)),
  ]);
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
});

test("serves health and search metadata without folding tool pages into the site", async () => {
  const [healthResponse, robotsResponse, sitemapResponse, missingResponse] =
    await Promise.all([
      render("/healthz"),
      render("/robots.txt"),
      render("/sitemap.xml"),
      render("/missing-page"),
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
  assert.doesNotMatch(sitemap, /\/daymark\/|\/repolens\/|\/siteboard\//);

  assert.equal(missingResponse.status, 404);
  const missingHtml = await missingResponse.text();
  assert.match(
    missingHtml,
    /<meta(?=[^>]*\bcontent="noindex")(?=[^>]*\bname="robots")[^>]*>/,
  );
  assert.match(missingHtml, /요청한 주소를 확인해 주세요/);
});
