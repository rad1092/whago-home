import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

const workflow = [
  {
    number: "01",
    title: "요청 파싱",
    description: "API 요청 소스를 구조화합니다.",
  },
  {
    number: "02",
    title: "로컬 검증",
    description: "환경값을 주입해 요청과 응답을 확인합니다.",
  },
  {
    number: "03",
    title: "패키지 내보내기",
    description: "레시피와 MCP 도구 패키지를 생성합니다.",
  },
  {
    number: "04",
    title: "검사·가져오기",
    description: "패키지 구조와 해시를 검사한 뒤 가져옵니다.",
  },
  {
    number: "05",
    title: "로컬 재검증",
    description: "가져온 레시피를 다시 확인해야 재내보낼 수 있습니다.",
  },
] as const;

const newTabLabel = <span className="sr-only">(새 탭에서 열림)</span>;

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 바로가기
      </a>

      <header className="masthead" id="top">
        <a className="wordmark" href="#top" aria-label="WHAGO 홈">
          WHAGO
        </a>
        <p className="masthead-count">김홍대 · 작업 03</p>
        <nav className="masthead-links" aria-label="외부 링크">
          <a
            href="https://github.com/rad1092"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
            {newTabLabel}
          </a>
          <a href="mailto:rad174951@gmail.com">
            Email <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="feature" aria-labelledby="firstcall-title">
          <div className="feature-copy">
            <p className="project-kicker">
              <span className="signal" aria-hidden="true" />
              WORK 01 · RELEASED · RUST
            </p>
            <h1 id="firstcall-title">FirstCall</h1>
            <p className="feature-deck">
              API 요청 소스를 로컬에서 파싱·검증하고, 비밀값을 환경변수
              참조로 분리한 뒤 레시피와 실행 가능한 MCP 도구 패키지로
              내보냅니다.
            </p>
            <div className="feature-actions">
              <Link className="button button-solid" href="/work/firstcall">
                상세 보기 <span aria-hidden="true">→</span>
              </Link>
              <a
                className="button button-line"
                href="https://github.com/rad1092/firstcall-local-api-workbench/releases/tag/v0.2.1"
                target="_blank"
                rel="noreferrer"
              >
                v0.2.1 릴리스 <span aria-hidden="true">↗</span>
                {newTabLabel}
              </a>
            </div>
          </div>

          <figure className="feature-figure">
            <div className="figure-label">
              <span>ACTUAL UI</span>
              <span>FIRSTCALL v0.2.1</span>
            </div>
            <div className="screen-frame">
              <Image
                src="/firstcall-gui-still.png"
                alt="FirstCall 데스크톱 GUI에서 샘플 cURL 요청을 파싱하고 레시피로 저장하는 화면"
                width={1100}
                height={760}
                priority
                sizes="(max-width: 900px) 100vw, 58vw"
              />
            </div>
            <figcaption>
              <span>GUI / 샘플 cURL 파싱과 레시피 저장</span>
              <span>FirstCall v0.2.1 Windows 릴리스에서 캡처</span>
              <a href="/firstcall-gui.gif" target="_blank" rel="noreferrer">
                GUI 데모 재생 <span aria-hidden="true">↗</span>
                {newTabLabel}
              </a>
            </figcaption>
          </figure>
        </section>

        <section className="workflow" aria-labelledby="workflow-title">
          <header className="section-label">
            <p>FIRSTCALL / WORKFLOW</p>
            <h2 id="workflow-title">요청에서 패키지까지</h2>
          </header>
          <ol className="workflow-list">
            {workflow.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="project-index" aria-labelledby="project-index-title">
          <header className="index-header">
            <p>SELECTED WORK / 2026</p>
            <h2 id="project-index-title">작업</h2>
            <span>03</span>
          </header>

          <article className="project-row">
            <div className="project-number">01</div>
            <div className="project-copy">
              <p className="project-kicker">RELEASED · RUST</p>
              <h3>
                <Link href="/work/firstcall">FirstCall</Link>
              </h3>
              <p>
                API 요청을 검증하고 레시피와 MCP 도구 패키지로 내보내는
                로컬 우선 데스크톱 GUI·CLI입니다.
              </p>
              <Link className="inline-link" href="/work/firstcall">
                프로젝트 상세 <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="project-evidence package-evidence">
              <p>PACKAGE OUTPUT</p>
              <ul>
                <li>recipe.yaml</li>
                <li>verified.lock.json</li>
                <li>policy.json</li>
                <li>package.manifest.json</li>
                <li>mcp-server/</li>
              </ul>
            </div>
          </article>

          <article className="project-row">
            <div className="project-number">02</div>
            <div className="project-copy">
              <p className="project-kicker">PUBLIC SOURCE · TYPESCRIPT</p>
              <h3>
                <a
                  href="https://github.com/rad1092/ascii-diagram-editor"
                  target="_blank"
                  rel="noreferrer"
                >
                  ASCII Diagram Editor
                  <span className="sr-only">(새 탭에서 열림)</span>
                </a>
              </h3>
              <p>
                고정 200×80 문자 그리드에서 ASCII 다이어그램을 편집하고,
                결과를 실제 &lt;pre&gt; 요소로 출력하는 브라우저 도구입니다.
              </p>
              <a
                className="inline-link"
                href="https://github.com/rad1092/ascii-diagram-editor"
                target="_blank"
                rel="noreferrer"
              >
                소스 보기 <span aria-hidden="true">↗</span>
                {newTabLabel}
              </a>
            </div>
            <figure className="project-evidence ascii-evidence">
              <pre aria-label="ASCII 다이어그램 출력 예시">{`┌──────────────┐
│ 200 × 80 GRID│
└──────┬───────┘
       │
┌──────▼───────┐
│  <pre> OUTPUT │
└──────────────┘`}</pre>
              <figcaption>편집 결과 예시 / 실제 &lt;pre&gt; 출력</figcaption>
            </figure>
          </article>

          <article className="project-row">
            <div className="project-number">03</div>
            <div className="project-copy">
              <p className="project-kicker">RELEASED · GO</p>
              <h3>
                <a
                  href="https://github.com/rad1092/gh-dependency-risk"
                  target="_blank"
                  rel="noreferrer"
                >
                  gh-dep-risk
                  <span className="sr-only">(새 탭에서 열림)</span>
                </a>
              </h3>
              <p>
                PR의 의존성 변경을 요약하는 GitHub CLI 확장입니다. Dependency
                Review API를 우선 사용하고, 사용할 수 없으면 정적 로컬
                분석으로 대체합니다.
              </p>
              <a
                className="inline-link"
                href="https://github.com/rad1092/gh-dependency-risk"
                target="_blank"
                rel="noreferrer"
              >
                소스 보기 <span aria-hidden="true">↗</span>
                {newTabLabel}
              </a>
            </div>
            <div className="project-evidence route-evidence">
              <p>ANALYSIS ROUTE</p>
              <div>
                <span>01</span>
                <strong>Dependency Review API</strong>
                <small>PRIMARY</small>
              </div>
              <div>
                <span>02</span>
                <strong>Static local analysis</strong>
                <small>FALLBACK</small>
              </div>
            </div>
          </article>
        </section>

        <section className="about" aria-labelledby="about-title">
          <p className="section-code">ABOUT / KIM HONGDAE</p>
          <div>
            <h2 id="about-title">김홍대</h2>
          </div>
          <div className="about-copy">
            <p>
              자재 납품과 영업관리 현장에서 일정·재고·납기를 조율했습니다.
            </p>
            <p>현재 FirstCall과 개발 도구를 만들고 있습니다.</p>
            <div className="about-links">
              <a href="mailto:rad174951@gmail.com">
                Email <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://github.com/rad1092"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
                {newTabLabel}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <strong>WHAGO</strong>
        <span>© 2026</span>
        <a href="#top">맨 위로 ↑</a>
      </footer>
    </>
  );
}
