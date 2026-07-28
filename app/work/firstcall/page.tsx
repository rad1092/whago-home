import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "FirstCall",
  description:
    "API 요청을 로컬에서 검증하고 레시피와 MCP 도구 패키지로 내보내는 Rust 데스크톱 워크벤치 FirstCall.",
  alternates: {
    canonical: "/work/firstcall",
  },
  openGraph: {
    url: "/work/firstcall",
    title: "FirstCall · WHAGO",
    description:
      "API 요청을 로컬에서 검증하고 레시피와 MCP 도구 패키지로 내보내는 Rust 데스크톱 워크벤치.",
  },
};

const packageFiles = [
  "recipe.yaml",
  "verified.lock.json",
  "policy.json",
  "skill.md",
  "package.manifest.json",
  "mcp-server/",
] as const;

const safeguards = [
  {
    number: "01",
    text: "비밀값은 환경변수로 참조합니다. SQLite, 패키지 파일, CLI 보고서, 로그와 데모 자산에는 비밀값을 기록하지 않습니다.",
  },
  {
    number: "02",
    text: "가져온 스크립트, 테스트, 훅, 캡처와 환경 파일은 자동으로 실행하지 않습니다.",
  },
  {
    number: "03",
    text: "변경 HTTP 요청은 --allow-mutating을 명시해야 합니다.",
  },
  {
    number: "04",
    text: "가져온 패키지는 로컬 재검증 전까지 다시 내보낼 수 없습니다.",
  },
] as const;

const releaseChecks = [
  "Windows · Linux · macOS CI 통과",
  "Windows 릴리스 압축 파일 SHA256 대조",
  "firstcall.exe / firstcall-cli.exe 버전 확인",
  "GitHub GET /user 요청 HTTP 200 확인",
  "패키지 생성과 ready 검사 확인",
  "생성된 MCP 서버 설치·빌드 확인",
  "stdio 도구 호출 확인",
  "격리된 SQLite 저장소에서 GUI 실행 확인",
] as const;

const newTabLabel = <span className="sr-only">(새 탭에서 열림)</span>;

export default function FirstCallPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 바로가기
      </a>

      <header className="masthead" id="top">
        <Link className="wordmark" href="/" aria-label="WHAGO 홈">
          WHAGO
        </Link>
        <p className="masthead-count">WORK 01 / FIRSTCALL</p>
        <nav className="masthead-links" aria-label="페이지 이동">
          <Link href="/">
            작업 <span aria-hidden="true">↙</span>
          </Link>
          <a
            href="https://github.com/rad1092/firstcall-local-api-workbench"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
            {newTabLabel}
          </a>
        </nav>
      </header>

      <main id="main" className="case-main">
        <header className="case-intro">
          <p className="project-kicker">
            <span className="signal" aria-hidden="true" />
            WORK 01 · FIRSTCALL · v0.2.1
          </p>
          <h1>FirstCall</h1>
          <p>
            API 요청 소스를 로컬에서 파싱·검증하고, 비밀값을 환경변수
            참조로 분리한 뒤 레시피와 실행 가능한 MCP 도구 패키지로
            내보내는 Rust 데스크톱 워크벤치입니다.
          </p>
          <ul className="case-tags" aria-label="FirstCall 구성">
            <li>DESKTOP GUI</li>
            <li>CLI</li>
            <li>RUST</li>
          </ul>
          <div className="feature-actions">
            <a
              className="button button-solid"
              href="https://github.com/rad1092/firstcall-local-api-workbench#readme"
              target="_blank"
              rel="noreferrer"
            >
              README 읽기 <span aria-hidden="true">↗</span>
              {newTabLabel}
            </a>
            <a
              className="button button-line"
              href="https://github.com/rad1092/firstcall-local-api-workbench/releases/tag/v0.2.1"
              target="_blank"
              rel="noreferrer"
            >
              릴리스 보기 <span aria-hidden="true">↗</span>
              {newTabLabel}
            </a>
          </div>
        </header>

        <figure className="case-figure">
          <div className="figure-label">
            <span>DESKTOP GUI</span>
            <span>WINDOWS / v0.2.1</span>
          </div>
          <div className="screen-frame">
            <Image
              src="/firstcall-gui-still.png"
              alt="FirstCall 데스크톱 GUI에서 샘플 cURL 요청을 파싱하고 레시피로 저장하는 화면"
              width={1100}
              height={760}
              priority
              sizes="(max-width: 900px) 100vw, 88vw"
            />
          </div>
          <figcaption>
            <span>샘플 cURL 파싱과 레시피 저장</span>
            <span>FirstCall v0.2.1 Windows 릴리스에서 캡처</span>
            <a href="/firstcall-gui.gif" target="_blank" rel="noreferrer">
              GUI 데모 재생 <span aria-hidden="true">↗</span>
              {newTabLabel}
            </a>
          </figcaption>
        </figure>

        <section className="case-section surfaces" aria-labelledby="surfaces-title">
          <header>
            <p className="section-code">01 / SURFACES</p>
            <h2 id="surfaces-title">두 가지 실행면</h2>
          </header>
          <div className="surface-grid">
            <article>
              <p>DESKTOP GUI</p>
              <h3>화면에서 검토하고 실행</h3>
              <p>
                요청 소스 가져오기, 파서 결과 검토, 환경값 입력, 로컬 실행,
                레시피 저장을 화면에서 처리합니다.
              </p>
            </article>
            <article>
              <p>AUTOMATION CLI</p>
              <h3>스크립트에서 검증하고 출력</h3>
              <p>
                검증, 패키지 생성, 검사, 가져오기와 보고서 출력을
                에이전트·CI·스크립트에서 실행합니다.
              </p>
            </article>
          </div>
        </section>

        <section className="case-section package" aria-labelledby="package-title">
          <header>
            <p className="section-code">02 / PACKAGE OUTPUT</p>
            <h2 id="package-title">패키지 구성</h2>
          </header>
          <div className="package-layout">
            <ul aria-label="FirstCall 패키지 파일">
              {packageFiles.map((file, index) => (
                <li key={file}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <code>{file}</code>
                </li>
              ))}
            </ul>
            <p>
              각 패키지에는 TypeScript MCP 서버가 포함됩니다. 설치와 빌드,
              도구 목록 조회와 호출을 별도로 검증합니다.
            </p>
          </div>
        </section>

        <section className="case-section safety" aria-labelledby="safety-title">
          <header>
            <p className="section-code">03 / SAFETY BOUNDARIES</p>
            <h2 id="safety-title">실행 경계</h2>
          </header>
          <ol>
            {safeguards.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="release-check" aria-labelledby="release-title">
          <header>
            <p>RELEASE CHECK</p>
            <h2 id="release-title">v0.2.1 릴리스 당시 검증</h2>
            <span>2026.06.10</span>
          </header>
          <ul>
            {releaseChecks.map((check, index) => (
              <li key={check}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{check}</p>
                <i aria-hidden="true">PASS</i>
              </li>
            ))}
          </ul>
          <p className="release-note">
            위 항목은 v0.2.1 릴리스 시점의 검증 결과입니다.
          </p>
        </section>

        <nav className="case-end" aria-label="FirstCall 관련 링크">
          <a
            href="https://github.com/rad1092/firstcall-local-api-workbench/releases/tag/v0.2.1"
            target="_blank"
            rel="noreferrer"
          >
            <span>01</span>
            v0.2.1 릴리스 보기
            <i aria-hidden="true">↗</i>
            {newTabLabel}
          </a>
          <a
            href="https://github.com/rad1092/firstcall-local-api-workbench"
            target="_blank"
            rel="noreferrer"
          >
            <span>02</span>
            GitHub에서 소스 보기
            <i aria-hidden="true">↗</i>
            {newTabLabel}
          </a>
          <Link href="/">
            <span>03</span>
            작업 인덱스로 돌아가기
            <i aria-hidden="true">←</i>
          </Link>
        </nav>
      </main>

      <footer className="site-footer">
        <strong>WHAGO</strong>
        <span>© 2026</span>
        <a href="#top">맨 위로 ↑</a>
      </footer>
    </>
  );
}
