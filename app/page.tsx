import Image from "next/image";
import Link from "next/link";
import AsciiPlayground from "./components/ascii-playground";

export const dynamic = "force-static";

const newTabLabel = <span className="sr-only">(새 탭에서 열림)</span>;

const asciiPreview = `┌───────────┐
│   ASCII   │
├─────┬─────┤
│ edit│ pre │
└─────┴─────┘`;

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 바로가기
      </a>

      <header className="topbar" id="top">
        <a className="topbar-name" href="#top">
          김홍대
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#projects">작업</a>
          <a href="#about">소개</a>
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
        <section className="intro" aria-labelledby="intro-title">
          <div className="intro-copy">
            <p>김홍대 / 소프트웨어 개발자</p>
            <h1 id="intro-title">WHAGO</h1>
            <p>윈도우 앱, GitHub CLI, 브라우저 편집기를 만들었습니다.</p>
          </div>

          <div
            className="project-collage"
            id="projects"
            aria-label="프로젝트 미리보기"
          >
            <a className="preview-card preview-firstcall" href="#firstcall">
              <span>
                FirstCall <small>Windows</small>
              </span>
              <Image
                src="/firstcall-crop.png"
                alt="FirstCall에서 cURL 요청을 파싱해 후보 요청으로 만든 화면"
                width={900}
                height={430}
                priority
                sizes="(max-width: 760px) 100vw, 48vw"
              />
            </a>

            <a className="preview-card preview-ascii" href="#ascii-editor">
              <span>
                ASCII Diagram Editor <small>Web</small>
              </span>
              <div aria-hidden="true">
                <pre>{asciiPreview}</pre>
                <b>&lt;pre&gt;</b>
              </div>
            </a>

            <a className="preview-card preview-risk" href="#dep-risk">
              <span>
                gh-dep-risk <small>GitHub CLI</small>
              </span>
              <Image
                src="/dep-risk-still.png"
                alt="gh-dep-risk가 pull request 의존성 변경을 분석한 실제 출력"
                width={968}
                height={612}
                priority
                sizes="(max-width: 760px) 100vw, 34vw"
              />
            </a>
          </div>
        </section>

        <section
          className="project-scene firstcall-scene"
          id="firstcall"
          aria-labelledby="firstcall-title"
        >
          <div className="scene-copy">
            <p>Windows · Rust · v0.2.1</p>
            <h2 id="firstcall-title">FirstCall</h2>
            <p>
              API 요청을 로컬에서 검증하고 레시피와 실행 가능한 MCP 도구
              패키지로 내보냅니다.
            </p>
            <div className="scene-links">
              <Link href="/work/firstcall">
                자세히 보기 <span aria-hidden="true">→</span>
              </Link>
              <a
                href="https://github.com/rad1092/firstcall-local-api-workbench/releases/tag/v0.2.1"
                target="_blank"
                rel="noreferrer"
              >
                v0.2.1 <span aria-hidden="true">↗</span>
                {newTabLabel}
              </a>
            </div>
          </div>

          <figure className="scene-media firstcall-media">
            <Image
              src="/firstcall-crop.png"
              alt="FirstCall에서 cURL 요청을 파싱해 후보 요청으로 만든 화면"
              width={900}
              height={430}
              sizes="(max-width: 800px) 100vw, 62vw"
            />
            <figcaption>
              실제 v0.2.1 Windows GUI / cURL 파싱과 후보 요청 검토
              <a href="/firstcall-gui.gif" target="_blank" rel="noreferrer">
                전체 데모 재생 <span aria-hidden="true">↗</span>
                {newTabLabel}
              </a>
            </figcaption>
          </figure>
        </section>

        <section
          className="project-scene ascii-scene"
          id="ascii-editor"
          aria-labelledby="ascii-title"
        >
          <div className="scene-copy">
            <p>Browser · TypeScript · Prototype</p>
            <h2 id="ascii-title">
              ASCII Diagram
              <br />
              Editor
            </h2>
            <p>
              200×80 문자 그리드에서 다이어그램을 편집하고 결과를 실제
              &lt;pre&gt; 요소로 출력합니다.
            </p>
            <div className="scene-links">
              <a
                href="https://github.com/rad1092/ascii-diagram-editor"
                target="_blank"
                rel="noreferrer"
              >
                소스 보기 <span aria-hidden="true">↗</span>
                {newTabLabel}
              </a>
            </div>
          </div>

          <AsciiPlayground />
        </section>

        <section
          className="project-scene risk-scene"
          id="dep-risk"
          aria-labelledby="risk-title"
        >
          <div className="scene-copy">
            <p>GitHub CLI · Go · v0.2.1</p>
            <h2 id="risk-title">gh-dep-risk</h2>
            <p>PR의 의존성 변경을 터미널에서 요약합니다.</p>
            <div className="scene-links">
              <a
                href="https://github.com/rad1092/gh-dependency-risk"
                target="_blank"
                rel="noreferrer"
              >
                소스 보기 <span aria-hidden="true">↗</span>
                {newTabLabel}
              </a>
            </div>
          </div>

          <figure className="scene-media risk-media">
            <Image
              src="/dep-risk-still.png"
              alt="gh-dep-risk가 pull request 10번의 의존성 변경을 분석한 출력"
              width={968}
              height={612}
              sizes="(max-width: 800px) 100vw, 62vw"
            />
            <figcaption>
              실제 smoke fixture 실행 / Bun lockfile fallback 분석
              <a
                href="/gh-dep-risk-demo.gif"
                target="_blank"
                rel="noreferrer"
              >
                전체 데모 재생 <span aria-hidden="true">↗</span>
                {newTabLabel}
              </a>
            </figcaption>
          </figure>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div>
            <p>소개</p>
            <h2 id="about-title">김홍대</h2>
          </div>
          <div className="about-text">
            <p>
              자재 납품과 영업관리 현장에서 일정·재고·납기를 조율했습니다.
            </p>
            <p>현재 FirstCall과 개발 도구를 만들고 있습니다.</p>
          </div>
        </section>

        <section className="contact-section" aria-labelledby="contact-title">
          <p id="contact-title">연락</p>
          <a href="mailto:rad174951@gmail.com">
            rad174951
            <wbr />
            @gmail.com <span aria-hidden="true">↗</span>
          </a>
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
