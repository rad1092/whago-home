const externalLabel = <span className="sr-only">(새 탭에서 열림)</span>;

const publicTools = [
  {
    index: "01",
    name: "Daymark",
    description:
      "오늘의 약속 세 개를 정하고, 전날 남은 일을 다시 결정하는 로컬 플래너.",
    launchUrl: "https://rad1092.github.io/daymark/",
    sourceUrl: "https://github.com/rad1092/daymark",
    action: "Daymark 열기",
  },
  {
    index: "02",
    name: "RepoLens",
    description:
      "저장소를 읽고 새 유지관리 위험을 터미널·JSON·HTML로 정리하는 CLI와 GitHub Action.",
    launchUrl: "https://rad1092.github.io/repolens/",
    sourceUrl: "https://github.com/rad1092/repolens",
    action: "사용법 보기",
  },
  {
    index: "03",
    name: "Siteboard",
    description:
      "상호·서비스·작업·연락 정보를 받아 배포할 홈페이지 파일을 만드는 브라우저 제작기.",
    launchUrl: "https://rad1092.github.io/siteboard/",
    sourceUrl: "https://github.com/rad1092/siteboard",
    action: "Siteboard 열기",
  },
] as const;

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 바로가기
      </a>

      <header className="site-header" id="top">
        <a className="identity" href="#top" aria-label="김홍대 홈페이지">
          <strong>김홍대</strong>
          <span>SOFTWARE DEVELOPMENT</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#work">작업</a>
          <a href="#about">소개</a>
          <a href="#tools">공개 도구</a>
          <a
            href="https://github.com/rad1092"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗{externalLabel}
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-intro">
            <p className="overline">KIM HONGDAE / SOFTWARE</p>
            <h1 id="hero-title">
              반복 업무를
              <br />
              웹 서비스와
              <br />
              도구로 구현합니다.
            </h1>
            <p className="hero-description">
              웹 서비스, 데스크톱 앱, CLI를 만듭니다. 요구사항과 사용
              경로를 정리하고, 테스트와 배포까지 직접 확인합니다.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#work">
                주요 작업 보기 <span aria-hidden="true">↓</span>
              </a>
              <a
                className="text-link"
                href="https://github.com/rad1092"
                target="_blank"
                rel="noreferrer"
              >
                GitHub에서 코드 보기 ↗{externalLabel}
              </a>
            </div>
          </div>

          <div className="hero-proof" aria-label="대표 작업 세 가지">
            <div className="proof-heading">
              <span>RELEASED WORK</span>
              <strong>SELECTED / 03</strong>
            </div>
            <ol className="proof-work">
              <li>
                <span>01</span>
                <a href="#firstcall">
                  <small>DESKTOP + CLI</small>
                  <strong>FirstCall</strong>
                  <p>API 요청 → 검증된 skill·MCP 패키지</p>
                </a>
              </li>
              <li>
                <span>02</span>
                <a href="#dependency-risk">
                  <small>GITHUB CLI</small>
                  <strong>gh-dep-risk</strong>
                  <p>Pull request → 의존성 위험 요약</p>
                </a>
              </li>
              <li>
                <span>03</span>
                <a href="#localfit">
                  <small>FULL-STACK WEB</small>
                  <strong>LocalFit Lab</strong>
                  <p>상권 후보 → 비교 리포트·현장 확인</p>
                </a>
              </li>
            </ol>
          </div>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <header className="section-intro">
            <p className="overline">SELECTED WORK / 2026</p>
            <h2 id="work-title">입력과 결과가 분명한 작업</h2>
            <p>
              실제 사용 경로, 배포 파일, 검증 방법을 함께 만든 프로젝트를
              골랐습니다.
            </p>
          </header>

          <article className="project project-firstcall" id="firstcall">
            <div className="project-copy">
              <p className="project-number">01 / DESKTOP + CLI</p>
              <h3>FirstCall</h3>
              <p className="project-summary">
                API 요청 소스를 검증하고, 비밀값을 분리한 뒤 에이전트가
                호출할 수 있는 도구 패키지로 내보내는 로컬 워크벤치입니다.
              </p>
              <dl className="project-facts">
                <div>
                  <dt>입력</dt>
                  <dd>API 요청과 recipe JSON</dd>
                </div>
                <div>
                  <dt>결과</dt>
                  <dd>검증 기록, skill, 실행 가능한 MCP 서버</dd>
                </div>
                <div>
                  <dt>배포</dt>
                  <dd>Rust 데스크톱 앱과 CLI · v0.2.1</dd>
                </div>
              </dl>
              <div className="project-links">
                <a
                  href="https://github.com/rad1092/firstcall-local-api-workbench/releases/latest"
                  target="_blank"
                  rel="noreferrer"
                >
                  최신 릴리스 보기 ↗{externalLabel}
                </a>
                <a
                  href="https://github.com/rad1092/firstcall-local-api-workbench"
                  target="_blank"
                  rel="noreferrer"
                >
                  소스와 문서 보기 ↗{externalLabel}
                </a>
              </div>
            </div>
            <div className="project-visual firstcall-artifact" aria-hidden="true">
              <div className="artifact-titlebar">
                <span>FIRSTCALL / PACKAGE INSPECTOR</span>
                <i>VERIFIED</i>
              </div>
              <div className="artifact-grid">
                <div className="artifact-rail">
                  <b>INPUT</b>
                  <span className="active">request</span>
                  <span>auth</span>
                  <span>checks</span>
                  <span>export</span>
                </div>
                <div className="artifact-main">
                  <p>PACKAGE MANIFEST</p>
                  <strong>agent-ready-api-tool</strong>
                  <div className="manifest-row">
                    <span>recipe</span>
                    <b>verified</b>
                  </div>
                  <div className="manifest-row">
                    <span>secret policy</span>
                    <b>environment</b>
                  </div>
                  <div className="manifest-row">
                    <span>runtime tool</span>
                    <b>callable</b>
                  </div>
                  <div className="hash-line" />
                  <small>manifest hashes checked</small>
                </div>
              </div>
            </div>
          </article>

          <article className="project project-risk" id="dependency-risk">
            <div className="project-copy">
              <p className="project-number">02 / GITHUB CLI</p>
              <h3>gh-dep-risk</h3>
              <p className="project-summary">
                Pull request의 의존성 변경을 읽어 검토자가 바로 판단할 수 있는
                위험 요약으로 만드는 GitHub CLI 확장입니다.
              </p>
              <dl className="project-facts">
                <div>
                  <dt>입력</dt>
                  <dd>PR 번호 또는 GitHub URL</dd>
                </div>
                <div>
                  <dt>결과</dt>
                  <dd>터미널, JSON, PR용 Markdown 요약</dd>
                </div>
                <div>
                  <dt>배포</dt>
                  <dd>Go 단일 실행 파일 · v0.2.1</dd>
                </div>
              </dl>
              <div className="project-links">
                <a
                  href="https://github.com/rad1092/gh-dependency-risk/releases/latest"
                  target="_blank"
                  rel="noreferrer"
                >
                  설치 파일 보기 ↗{externalLabel}
                </a>
                <a
                  href="https://github.com/rad1092/gh-dependency-risk"
                  target="_blank"
                  rel="noreferrer"
                >
                  동작 범위 보기 ↗{externalLabel}
                </a>
              </div>
            </div>
            <div className="project-visual risk-artifact" aria-hidden="true">
              <div className="terminal-head">
                <span />
                <span />
                <span />
                <b>gh dep-risk</b>
              </div>
              <div className="terminal-body">
                <p>
                  <i>$</i> gh dep-risk pr 123
                </p>
                <div className="risk-path">
                  <span>Pull request</span>
                  <b>→</b>
                  <span>Dependency Review</span>
                  <b>→</b>
                  <span>Reviewer summary</span>
                </div>
                <ul>
                  <li>
                    <span>HUMAN</span>
                    terminal review
                  </li>
                  <li>
                    <span>JSON</span>
                    automation input
                  </li>
                  <li>
                    <span>MARKDOWN</span>
                    pull request comment
                  </li>
                </ul>
                <small>npm · pnpm · Yarn · Python · Go · Bun</small>
              </div>
            </div>
          </article>

          <article className="project project-localfit" id="localfit">
            <div className="project-copy">
              <p className="project-number">03 / FULL-STACK WEB</p>
              <h3>LocalFit Lab</h3>
              <p className="project-summary">
                서울 상권 후보를 찾고 업종별 수요·경쟁·비용을 비교해 근거
                리포트와 현장 확인 항목으로 이어 주는 분석 워크스페이스입니다.
              </p>
              <dl className="project-facts">
                <div>
                  <dt>입력</dt>
                  <dd>상권, 업종, 공공·지도 데이터</dd>
                </div>
                <div>
                  <dt>결과</dt>
                  <dd>비교 화면, 근거 리포트, 현장 체크리스트</dd>
                </div>
                <div>
                  <dt>구성</dt>
                  <dd>Next.js, FastAPI, Kakao Maps</dd>
                </div>
              </dl>
              <div className="project-links">
                <a
                  href="https://github.com/rad1092/localfit-lab"
                  target="_blank"
                  rel="noreferrer"
                >
                  프로젝트 구조 보기 ↗{externalLabel}
                </a>
              </div>
            </div>
            <div className="project-visual localfit-artifact" aria-hidden="true">
              <div className="map-panel">
                <span className="map-road road-a" />
                <span className="map-road road-b" />
                <span className="map-road road-c" />
                <i className="map-pin pin-a" />
                <i className="map-pin pin-b" />
                <i className="map-pin pin-c" />
                <div className="map-label">SEOUL / AREA SEARCH</div>
              </div>
              <div className="analysis-panel">
                <p>후보 검토 흐름</p>
                <ol>
                  <li>
                    <span>01</span> 상권 선택
                  </li>
                  <li>
                    <span>02</span> 수요·경쟁·비용 비교
                  </li>
                  <li>
                    <span>03</span> 근거 리포트
                  </li>
                  <li>
                    <span>04</span> 현장 확인
                  </li>
                </ol>
              </div>
            </div>
          </article>
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <div className="about-heading">
            <p className="overline">ABOUT / APPROACH</p>
            <h2 id="about-title">현장에서 시작한 개발</h2>
          </div>
          <div className="about-body">
            <p className="about-lead">
              자재 납품과 영업관리에서 반복 입력과 누락 확인을 직접
              다뤘습니다. 지금은 그 업무 흐름을 화면과 자동화로 정리합니다.
            </p>
            <ol className="approach-list">
              <li>
                <span>01</span>
                <div>
                  <strong>업무 흐름을 먼저 적습니다.</strong>
                  <p>누가 무엇을 넣고, 다음 사람이 어떤 결과를 쓰는지 정합니다.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>작동 경계를 코드에 남깁니다.</strong>
                  <p>데이터, 권한, 실패 처리와 지원 범위를 문서와 테스트로 확인합니다.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>실행 가능한 형태로 전달합니다.</strong>
                  <p>설치 경로, 릴리스 파일, 배포와 복구 절차까지 함께 만듭니다.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="tools" id="tools" aria-labelledby="tools-title">
          <header className="section-intro compact">
            <p className="overline">PUBLIC TOOLS</p>
            <h2 id="tools-title">각자 바로 쓸 수 있는 공개 도구</h2>
            <p>각 도구는 독립된 저장소와 배포 주소에서 작동합니다.</p>
          </header>
          <div className="tool-list">
            {publicTools.map((tool) => (
              <article className="tool-row" key={tool.name}>
                <span className="tool-index">{tool.index}</span>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <div>
                  <a href={tool.launchUrl} target="_blank" rel="noreferrer">
                    {tool.action} ↗{externalLabel}
                  </a>
                  <a href={tool.sourceUrl} target="_blank" rel="noreferrer">
                    소스 ↗{externalLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" aria-labelledby="contact-title">
          <p className="overline">CODE / RELEASES / NOTES</p>
          <h2 id="contact-title">코드와 릴리스는 GitHub에 공개합니다.</h2>
          <p>
            공개 코드, 릴리스 파일, 설치 방법과 변경 기록을 한곳에서 확인할
            수 있습니다.
          </p>
          <a
            className="primary-link"
            href="https://github.com/rad1092"
            target="_blank"
            rel="noreferrer"
          >
            rad1092 GitHub 프로필 <span aria-hidden="true">↗</span>
            {externalLabel}
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="identity" href="#top">
          <strong>김홍대</strong>
          <span>WHAGO.NET</span>
        </a>
        <p>Software tools, web services, and operations.</p>
        <span>© 2026 KIM HONGDAE</span>
      </footer>
    </>
  );
}
