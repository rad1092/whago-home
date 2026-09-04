import Link from "next/link";
import { getProduct } from "./_data/products";

export const dynamic = "force-static";

export default function Home() {
  const firstcall = getProduct("firstcall")!;
  return (
    <main id="main" className="reset-home">
      <section className="firstcall-intro page-shell" aria-labelledby="firstcall-title">
        <div className="firstcall-intro__copy">
          <p className="eyebrow">FIRSTCALL · LOCAL API → MCP</p>
          <h1 id="firstcall-title">쓰고 있는 API를<br />AI의 도구로.</h1>
          <p className="intro-description">요청을 가져오고, 직접 검증하고, AI가 호출할 도구로 연결합니다. 데이터와 인증 정보는 내 컴퓨터에서 관리합니다.</p>
          <div className="action-row">
            <Link className="solid-link" href="/software/firstcall">FirstCall 사용하기 <span aria-hidden="true">→</span></Link>
            <a className="quiet-link" href={firstcall.source} target="_blank" rel="noreferrer">소스 보기 ↗</a>
          </div>
          <p className="caption">기존 HTTP API · 로컬 MCP 클라이언트 · 오픈소스</p>
        </div>
        <div className="flow-example" aria-label="요청을 도구로 연결하는 흐름 예시">
          <div className="flow-example__header"><span>API → 도구</span><span>예시</span></div>
          <div className="flow-step"><span className="step-label">01 / 가져오기</span><code>GET /repos/&#123;owner&#125;/&#123;repo&#125;</code></div>
          <div className="flow-step"><span className="step-label">02 / 설명과 검증</span><strong>저장소 정보 조회</strong><p>소유자와 저장소 이름을 받아 현재 정보를 조회합니다.</p></div>
          <div className="flow-step"><span className="step-label">03 / MCP로 호출</span><pre>{'{\n  "name": "get_repository",\n  "arguments": {\n    "owner": "your-org",\n    "repo": "your-repo"\n  }\n}'}</pre></div>
        </div>
      </section>
      <section className="tool-shelf page-shell" aria-labelledby="tools-title">
        <header><div><p className="eyebrow">OPEN-SOURCE UTILITIES</p><h2 id="tools-title">개발 중에 쓰는 작은 도구</h2></div><Link href="/software">지원 범위 보기 →</Link></header>
        <div className="tool-shelf__grid">
          <article><span className="tool-symbol" aria-hidden="true">↳</span><h3>RepoLens</h3><p>기준선과 비교해 새로 생긴 저장소 관리 문제를 PR에 표시합니다.</p><p className="caption">Node · GitHub Actions · 구성 검사</p><Link href="/software/repolens">설치와 범위 →</Link></article>
          <article><span className="tool-symbol" aria-hidden="true">±</span><h3>gh-dep-risk</h3><p>의존성이 바뀐 PR에서 검토할 변경과 위험 점수의 근거를 요약합니다.</p><p className="caption">GitHub CLI · 의존성 변경 검토</p><Link href="/software/gh-dep-risk">설치와 범위 →</Link></article>
        </div>
      </section>
      <aside className="archive-note page-shell"><p>Daymark와 Siteboard는 개발을 종료했습니다. 기존 자료와 구버전은 계속 열 수 있습니다.</p><Link href="/archive">자료와 구버전 찾기 →</Link></aside>
    </main>
  );
}
