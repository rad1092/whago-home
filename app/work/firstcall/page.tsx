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
  "비밀값은 환경변수로 참조하며 패키지 파일과 로그에 기록하지 않습니다.",
  "가져온 스크립트, 테스트, 훅과 환경 파일을 자동으로 실행하지 않습니다.",
  "변경 HTTP 요청은 --allow-mutating을 명시해야 합니다.",
  "가져온 패키지는 로컬 재검증 전까지 다시 내보낼 수 없습니다.",
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

      <header className="topbar" id="top">
        <Link className="topbar-name" href="/">
          김홍대
        </Link>
        <nav aria-label="페이지 이동">
          <Link href="/">작업</Link>
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

      <main id="main" className="case-page">
        <section className="case-hero" aria-labelledby="case-title">
          <div>
            <p>Rust desktop workbench / v0.2.1</p>
            <h1 id="case-title">FirstCall</h1>
            <p>
              API 요청 소스를 로컬에서 파싱·검증하고, 비밀값을 환경변수
              참조로 분리한 뒤 레시피와 실행 가능한 MCP 도구 패키지로
              내보냅니다.
            </p>
            <div className="case-actions">
              <a
                href="https://github.com/rad1092/firstcall-local-api-workbench#readme"
                target="_blank"
                rel="noreferrer"
              >
                README <span aria-hidden="true">↗</span>
                {newTabLabel}
              </a>
              <a
                href="https://github.com/rad1092/firstcall-local-api-workbench/releases/tag/v0.2.1"
                target="_blank"
                rel="noreferrer"
              >
                v0.2.1 릴리스 <span aria-hidden="true">↗</span>
                {newTabLabel}
              </a>
            </div>
          </div>
          <figure>
            <Image
              src="/firstcall-crop.png"
              alt="FirstCall에서 cURL 요청을 파싱해 후보 요청으로 만든 화면"
              width={900}
              height={430}
              priority
              sizes="(max-width: 800px) 100vw, 58vw"
            />
            <figcaption>
              v0.2.1 Windows GUI
              <a href="/firstcall-gui.gif" target="_blank" rel="noreferrer">
                전체 데모 재생 <span aria-hidden="true">↗</span>
                {newTabLabel}
              </a>
            </figcaption>
          </figure>
        </section>

        <section className="case-block case-surfaces" aria-labelledby="surface-title">
          <header>
            <p>두 실행 방식</p>
            <h2 id="surface-title">화면과 명령줄</h2>
          </header>
          <div>
            <article>
              <span>Desktop GUI</span>
              <h3>가져오고 검토한 뒤 실행합니다.</h3>
              <p>
                요청 소스, 파서 결과, 환경값, 로컬 실행과 레시피 저장을
                화면에서 처리합니다.
              </p>
            </article>
            <article>
              <span>Automation CLI</span>
              <h3>검증과 패키징을 자동화합니다.</h3>
              <p>
                검사, 가져오기와 보고서 출력을 에이전트·CI·스크립트에서
                실행합니다.
              </p>
            </article>
          </div>
        </section>

        <section className="case-block case-output" aria-labelledby="output-title">
          <header>
            <p>패키지</p>
            <h2 id="output-title">내보내는 것</h2>
          </header>
          <div>
            <ul>
              {packageFiles.map((file) => (
                <li key={file}>
                  <code>{file}</code>
                </li>
              ))}
            </ul>
            <p>
              각 패키지에는 TypeScript MCP 서버가 포함됩니다. 설치·빌드와
              도구 목록 조회·호출을 별도로 검증합니다.
            </p>
          </div>
        </section>

        <section className="case-block case-safety" aria-labelledby="safety-title">
          <header>
            <p>Safety boundaries</p>
            <h2 id="safety-title">자동으로 하지 않는 것</h2>
          </header>
          <ol>
            {safeguards.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="release-section">
          <details>
            <summary>
              <span>v0.2.1 릴리스 당시 검증</span>
              <span>8개 항목 보기</span>
            </summary>
            <ul>
              {releaseChecks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
            <p>위 항목은 2026년 6월 10일 릴리스 시점의 결과입니다.</p>
          </details>
        </section>

        <nav className="case-navigation" aria-label="FirstCall 관련 링크">
          <Link href="/">
            <span aria-hidden="true">←</span> WHAGO로 돌아가기
          </Link>
          <a
            href="https://github.com/rad1092/firstcall-local-api-workbench"
            target="_blank"
            rel="noreferrer"
          >
            소스 보기 <span aria-hidden="true">↗</span>
            {newTabLabel}
          </a>
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
