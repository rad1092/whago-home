export const dynamic = "force-static";

const principles = [
  {
    number: "01",
    title: "작게 시작합니다",
    description:
      "핵심 흐름이 실제로 작동하는 최소 단위부터 만들고, 필요가 확인된 다음에 확장합니다.",
  },
  {
    number: "02",
    title: "판단을 남깁니다",
    description:
      "결과뿐 아니라 무엇을 버렸는지, 왜 이 방향을 선택했는지 기록합니다.",
  },
  {
    number: "03",
    title: "운영까지 봅니다",
    description:
      "배포와 비용, 보안과 유지보수까지 제품을 이루는 중요한 경험으로 다룹니다.",
  },
] as const;

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 바로가기
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="WHAGO 홈">
          WHAGO
        </a>
        <p className="edition">
          <span className="status-dot" aria-hidden="true" />
          V1 · 2026.07
        </p>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">WHAGO · HongDae Kim</p>
            <h1 id="hero-title">
              사람의 다음 한 걸음을 돕는 소프트웨어를 만듭니다.
            </h1>
            <p className="hero-description">
              현장에서 사람과 일정, 문제를 조율하던 경험을 바탕으로 실제
              다음 행동으로 이어지는 제품과 도구를 설계하고 구현합니다.
            </p>
            <nav className="hero-actions" aria-label="주요 링크">
              <a className="primary-action" href="#work">
                대표 작업 보기
                <span aria-hidden="true">↘</span>
              </a>
              <a
                className="text-action"
                href="https://github.com/rad1092"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(새 탭에서 열림)</span>
              </a>
            </nav>
          </div>

          <aside className="hero-panel" aria-label="WHAGO 현재 상태">
            <div className="hero-panel-top">
              <span>WHG / 00</span>
              <span>2026.07</span>
            </div>
            <div className="hero-monogram" aria-hidden="true">
              W
            </div>
            <dl className="status-list">
              <div>
                <dt>Now</dt>
                <dd>사이트 재구축</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>제품 · 도구 · 시스템</dd>
              </div>
              <div>
                <dt>Mode</dt>
                <dd>독립 제작</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="section-index" aria-hidden="true">
            01
          </div>
          <div className="section-heading">
            <p className="eyebrow">Selected work · Shipped</p>
            <h2 id="work-title">FirstCall</h2>
            <p className="project-subtitle">
              Local-first API workbench
            </p>
          </div>
          <div className="work-content">
            <p className="section-lead">
              API 요청을 로컬에서 검증하고 비밀값을 환경변수 참조로 분리해,
              다시 검증할 수 있는 레시피와 실행 가능한 MCP 도구 패키지로
              내보냅니다.
            </p>

            <div className="project-facts" aria-label="FirstCall 프로젝트 요약">
              <div>
                <span>Scope</span>
                <strong>개인 프로젝트 · Rust</strong>
              </div>
              <div>
                <span>Surface</span>
                <strong>Desktop GUI · CLI</strong>
              </div>
              <div>
                <span>Output</span>
                <strong>Recipe package · MCP server</strong>
              </div>
            </div>

            <div className="project-flow" aria-label="FirstCall의 주요 흐름">
              <span>파싱</span>
              <i aria-hidden="true">→</i>
              <span>검증</span>
              <i aria-hidden="true">→</i>
              <span>패키징</span>
              <i aria-hidden="true">→</i>
              <span>검사·가져오기</span>
              <i aria-hidden="true">→</i>
              <span>재검증</span>
            </div>

            <div className="project-actions">
              <a
                className="project-link"
                href="https://github.com/rad1092/firstcall-local-api-workbench#readme"
                target="_blank"
                rel="noreferrer"
              >
                README 보기
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(새 탭에서 열림)</span>
              </a>
              <a
                className="project-link"
                href="https://github.com/rad1092/firstcall-local-api-workbench/releases"
                target="_blank"
                rel="noreferrer"
              >
                릴리스 보기
                <span aria-hidden="true">↗</span>
                <span className="sr-only">(새 탭에서 열림)</span>
              </a>
            </div>
          </div>
        </section>

        <section className="now-section" id="now" aria-labelledby="now-title">
          <div className="section-index" aria-hidden="true">
            02
          </div>
          <div className="section-heading">
            <p className="eyebrow">Now · 진행 중</p>
            <h2 id="now-title">WHAGO를 처음부터 다시 만들고 있습니다.</h2>
          </div>
          <div className="now-content">
            <p className="section-lead">
              이전 사이트와 내용을 걷어내고, 개인 포트폴리오에서 제품
              스튜디오까지 오래 쓸 수 있는 구조를 새로 설계합니다.
            </p>
            <div className="build-log" aria-label="현재 구축 단계">
              <div className="build-log-item is-complete">
                <span className="build-state">정리</span>
                <strong>필요 없는 구조를 덜어냅니다.</strong>
                <span>완료</span>
              </div>
              <div className="build-log-item is-active">
                <span className="build-state">구축</span>
                <strong>브랜드·콘텐츠·정적 배포 구조를 다시 세웁니다.</strong>
                <span>진행 중</span>
              </div>
              <div className="build-log-item">
                <span className="build-state">공개</span>
                <strong>실제 작업과 판단을 차례로 엽니다.</strong>
                <span>다음</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="principles-section"
          id="principles"
          aria-labelledby="principles-title"
        >
          <div className="section-index" aria-hidden="true">
            03
          </div>
          <div className="section-heading">
            <p className="eyebrow">Principles</p>
            <h2 id="principles-title">만드는 방식에도 기준이 있습니다.</h2>
          </div>
          <div className="principle-grid">
            {principles.map((principle) => (
              <article className="principle" key={principle.number}>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" aria-labelledby="about-title">
          <div className="section-index" aria-hidden="true">
            04
          </div>
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2 id="about-title">현장의 감각을 제품의 구조로 옮깁니다.</h2>
          </div>
          <div className="about-copy">
            <p>
              자재 납품과 영업관리 현장에서 일정, 재고, 납기를 조율하고
              거래처를 직접 응대했습니다. 지금은 그 경험을 바탕으로 사람이
              다음 행동을 더 쉽게 선택하게 만드는 도구를 만듭니다.
            </p>
            <p>
              Python에서 시작해 Rust, Go, TypeScript까지 문제에 맞는 도구를
              선택합니다. 제품과 사람이 늘어나더라도 쓸모와 명료함을 먼저
              두는 기준은 유지합니다.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>WHAGO</strong>
          <p>쓸모 있는 제품과 도구를 명료하게 만듭니다.</p>
        </div>
        <div className="footer-meta">
          <a href="mailto:rad174951@gmail.com">Email</a>
          <a
            href="https://github.com/rad1092"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
            <span className="sr-only">(새 탭에서 열림)</span>
          </a>
          <span>© 2026</span>
          <a href="#top">맨 위로 ↑</a>
        </div>
      </footer>
    </>
  );
}
