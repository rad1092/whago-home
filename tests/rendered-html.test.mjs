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

test("renders a scalable WHAGO software house with separate product pages", async () => {
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
  assert.match(html, /<title>WHAGO — Independent software house<\/title>/i);
  assert.match(html, />WHAGO</);
  assert.match(html, /소프트웨어를 만들고 배포합니다/);
  assert.match(html, /Daymark/);
  assert.match(html, /RepoLens/);
  assert.match(html, /Siteboard/);
  assert.match(html, /href="\/software"/);
  assert.match(html, /href="\/software\/daymark"/);
  assert.match(html, /href="\/software\/repolens"/);
  assert.match(html, /href="\/software\/siteboard"/);
  assert.match(html, /href="\/releases"/);
  assert.match(html, /href="\/support"/);
  assert.match(html, /href="\/house"/);
  assert.match(html, /v(?:<!-- -->)?2\.2\.0/);
  assert.match(html, /v(?:<!-- -->)?0\.3\.0/);
  assert.match(html, /v(?:<!-- -->)?4\.0\.0/);
  assert.match(
    html,
    /property="og:image" content="https:\/\/whago\.net\/og\.png"/,
  );
  assert.match(html, /rel="icon" href="https:\/\/whago\.net\/favicon\.svg"/);
  assert.doesNotMatch(
    html,
    /김홍대|FirstCall|gh-dep-risk|LocalFit Lab|rad1092\.github\.io/,
  );
  assert.doesNotMatch(html, /배포 #18|확인 완료|방금 전/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);

  const pages = [
    ["/software", "소프트웨어 · WHAGO", "현재 배포 형태"],
    ["/software/daymark", "Daymark · WHAGO", "하루 최대 세 약속"],
    ["/software/repolens", "RepoLens · WHAGO", "GitHub Actions"],
    ["/software/siteboard", "Siteboard · WHAGO", "Cloudflare"],
    ["/releases", "릴리스 · WHAGO", "제품별 현재 버전"],
    ["/support", "지원 · WHAGO", "제품별 지원"],
    ["/house", "하우스 · WHAGO", "운영 원칙"],
  ];

  for (const [pathname, title, marker] of pages) {
    const pageResponse = await render(pathname);
    assert.equal(pageResponse.status, 200, pathname);
    const pageHtml = await pageResponse.text();
    assert.match(pageHtml, new RegExp(`<title>${title}</title>`, "i"), pathname);
    assert.match(pageHtml, /<main[^>]*id="main"/i, pathname);
    assert.match(pageHtml, new RegExp(marker), pathname);
  }

  const [daymarkResponse, releasesResponse, supportResponse] =
    await Promise.all([
      render("/software/daymark"),
      render("/releases"),
      render("/support"),
    ]);
  const daymarkHtml = await daymarkResponse.text();
  const releasesHtml = await releasesResponse.text();
  const supportHtml = await supportResponse.text();

  assert.match(daymarkHtml, /release-daymark-v2\.2\.0\.jpg/);
  assert.match(daymarkHtml, /href="https:\/\/daymark\.whago\.net\/"/);
  assert.match(daymarkHtml, /github\.com\/rad1092\/daymark/);
  assert.match(
    daymarkHtml,
    /github\.com\/rad1092\/daymark\/releases\/tag\/v2\.2\.0/,
  );
  assert.match(
    releasesHtml,
    /github\.com\/rad1092\/repolens\/releases\/tag\/v0\.3\.0/,
  );
  assert.match(
    releasesHtml,
    /github\.com\/rad1092\/siteboard\/releases\/tag\/v4\.0\.0/,
  );
  assert.match(supportHtml, /href="https:\/\/repolens\.whago\.net\/"/);
  assert.match(supportHtml, /github\.com\/rad1092\/siteboard\/issues/);
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
  assert.match(page, /id="main"/);
  assert.match(page, /href="\/software"/);
  assert.doesNotMatch(page, /김홍대|FirstCall|gh-dep-risk|LocalFit Lab/);

  assert.match(layout, /metadataBase:\s*new URL\("https:\/\/whago\.net"\)/);
  assert.match(layout, /export const viewport:\s*Viewport/);
  assert.match(layout, /className="skip-link"/);
  assert.match(layout, /href="\/software"/);
  assert.match(layout, /href="\/releases"/);
  assert.match(layout, /href="\/support"/);
  assert.match(layout, /href="\/house"/);
  assert.match(layout, /images:\s*\["\/og\.png"\]/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /\.product-shot/);
  assert.doesNotMatch(css, /\.daymark-preview|\.repolens-preview|\.siteboard-preview/);
  assert.doesNotMatch(css, /tailwindcss|@theme/);
  assert.doesNotMatch(packageJson, /@tailwindcss|tailwindcss/);
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
  assert.match(
    productDeployScript,
    /if sudo test -L "\$current_link"; then[\s\S]*previous_release=.*readlink -f "\$current_link"[\s\S]*elif sudo test -e "\$current_link"; then/,
  );
  assert.doesNotMatch(productDeployScript, /whago-home\.git|nginx-whago\.conf/);
  assert.match(bootstrapScript, /--cert-name "\$certificate_name"/);
  assert.match(bootstrapScript, /--expand/);
  assert.match(bootstrapScript, /daymark\.whago\.net/);
  assert.match(bootstrapScript, /repolens\.whago\.net/);
  assert.match(bootstrapScript, /siteboard\.whago\.net/);
  assert.match(bootstrapScript, /\/tmp\/whago-deploy\.lock/);
  assert.match(bootstrapScript, /\[\[ "\$EUID" -eq 0 \]\]/);
  assert.match(bootstrapScript, /product_vhost_ready="false"/);
  assert.match(bootstrapScript, /sleep 0\.25/);

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
    access(new URL("../public/og-release-desk.png", import.meta.url)),
    access(new URL("../public/release-daymark-v2.2.0.jpg", import.meta.url)),
    access(new URL("../public/release-repolens-v0.3.0.jpg", import.meta.url)),
    access(new URL("../public/release-siteboard-v4.0.0.jpg", import.meta.url)),
    access(new URL("../public/favicon.svg", import.meta.url)),
    access(new URL("../public/daymark/index.html", import.meta.url)),
    access(new URL("../public/siteboard/index.html", import.meta.url)),
    access(new URL("../public/data-move.js", import.meta.url)),
  ]);
  const releaseCaptures = await Promise.all([
    readFile(new URL("../public/release-daymark-v2.2.0.jpg", import.meta.url)),
    readFile(new URL("../public/release-repolens-v0.3.0.jpg", import.meta.url)),
    readFile(new URL("../public/release-siteboard-v4.0.0.jpg", import.meta.url)),
  ]);
  for (const capture of releaseCaptures) {
    assert.deepEqual([...capture.subarray(0, 3)], [0xff, 0xd8, 0xff]);
  }
  await assert.rejects(access(new URL("public/_sites-preview", templateRoot)));
  await assert.rejects(access(new URL("../postcss.config.mjs", import.meta.url)));
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
  assert.match(sitemap, /<loc>https:\/\/whago\.net\/software<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/whago\.net\/software\/daymark<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/whago\.net\/software\/repolens<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/whago\.net\/software\/siteboard<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/whago\.net\/releases<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/whago\.net\/support<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/whago\.net\/house<\/loc>/);
  assert.doesNotMatch(
    sitemap,
    /<loc>https:\/\/whago\.net\/(?:daymark|repolens|siteboard)\/?<\/loc>/,
  );

  assert.equal(missingResponse.status, 404);
  const missingHtml = await missingResponse.text();
  assert.match(
    missingHtml,
    /<meta(?=[^>]*\bcontent="noindex")(?=[^>]*\bname="robots")[^>]*>/,
  );
  assert.match(missingHtml, /요청한 주소를 확인해 주세요/);
});
