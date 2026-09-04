import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

let worker;
async function render(pathname = "/") {
  worker ??= (await import("../dist/server/index.js")).default;
  return worker.fetch(new Request(new URL(pathname,"http://localhost"), {headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("Not found",{status:404})}},{waitUntil(){},passThroughOnException(){}});
}

test("homepage prioritizes FirstCall and does not offer retired apps as new products",async()=>{
  const response=await render(); const html=await response.text();
  assert.equal(response.status,200);
  assert.match(html,/firstcall-title/); assert.match(html,/API를/);
  assert.match(html,/href="\/software\/firstcall"/);
  assert.match(html,/href="\/software\/repolens"/); assert.match(html,/href="\/software\/gh-dep-risk"/);
  assert.match(html,/href="\/archive"/); assert.match(html,/개발을 종료/);
  assert.doesNotMatch(html,/Daymark 열기|웹 편집기 열기|오늘 끝낼 일을 세 개까지/);
});

test("active catalog, history, support, and archive render with usable navigation",async()=>{
  const pages=[
    ["/software","소프트웨어","FirstCall"],
    ["/software/firstcall","FirstCall","사용 흐름"],
    ["/software/repolens","RepoLens","프로젝트 스크립트를 실행하지 않고"],
    ["/software/gh-dep-risk","gh-dep-risk","휴리스틱"],
    ["/software/daymark","Daymark","개발 종료"],
    ["/software/siteboard","Siteboard","개발 종료"],
    ["/archive","종료 제품과 자료 회수","설치형 앱"],
    ["/releases","업데이트","자료 회수 안내"],
    ["/support","지원","오류 신고"],
    ["/house","소개","작업이 끝나는 도구"],
  ];
  for(const [path,title,marker] of pages){
    const response=await render(path); const html=await response.text();
    assert.equal(response.status,200,path);
    assert.ok(html.includes(`<title>${title} · WHAGO</title>`),path);
    assert.match(html,/<main[^>]*id="main"/); assert.ok(html.includes(marker),path);
    assert.doesNotMatch(html,/Your site is taking shape|Building your site/);
  }
  const catalog=await (await render("/software")).text();
  assert.doesNotMatch(catalog,/href="\/software\/(daymark|siteboard)"/);
  for(const slug of ["daymark","siteboard"]){
    const html=await (await render(`/software/${slug}`)).text();
    assert.ok(html.includes(`https://${slug}.whago.net/`));
    assert.ok(html.includes(`href="/${slug}/"`));
    assert.match(html,/자료를 수정|지우지 않습니다/);
  }
});

test("rendered public routes retain Korean language, keyboard bypass, metadata and security headers",async()=>{
  for(const path of ["/","/software/firstcall","/archive","/support"]){
    const response=await render(path); const html=await response.text();
    assert.match(response.headers.get("content-type")??"",/^text\/html/);
    assert.equal(response.headers.get("x-content-type-options"),"nosniff");
    assert.equal(response.headers.get("x-frame-options"),"DENY");
    assert.match(response.headers.get("content-security-policy")??"",/frame-ancestors 'none'/);
    assert.match(html,/<html[^>]*lang="ko"/);
    assert.match(html,/href="#main"/);
    assert.match(html,/rel="canonical"/);
  }
});

test("historical origins preserve origin-local recovery instead of redirecting before backup",async()=>{
  for(const [slug,name] of [["daymark","Daymark"],["siteboard","Siteboard"]]){
    const html=await readFile(new URL(`../public/${slug}/index.html`,import.meta.url),"utf8");
    assert.ok(html.includes(`data-product="${name}"`));
    assert.match(html,/id="backup-list"/); assert.match(html,/id="backup-count"/);
    assert.ok(html.includes(`https://${slug}.whago.net/legacy/`));
    assert.doesNotMatch(html,/http-equiv="refresh"|window.location/);
    assert.match(html,/<noscript>/);
  }
});

test("sitemap lists active products without resurrecting retired product promotion",async()=>{
  const response=await render("/sitemap.xml"); const xml=await response.text();
  assert.equal(response.status,200);
  assert.match(xml,/software\/firstcall/);
  assert.doesNotMatch(xml,/software\/(daymark|siteboard)/);
});
