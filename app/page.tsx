const externalLabel = <span className="sr-only">(새 탭에서 열림)</span>;

const products = [
  {
    id: "daymark",
    index: "01",
    name: "Daymark",
    eyebrow: "오늘의 실행 계획",
    description:
      "할 일을 빠르게 모으고, 오늘 끝낼 세 가지와 시간 블록을 정합니다. 기록과 백업은 이 브라우저에 남습니다.",
    launchUrl: "/daymark/",
    sourceUrl: "https://github.com/rad1092/daymark",
    action: "플래너 열기",
    className: "product-daymark",
    preview: (
      <div className="daymark-preview" aria-hidden="true">
        <div className="preview-bar">
          <span>화요일 · 7월 28일</span>
          <b>3 / 3</b>
        </div>
        <p>오늘의 핵심</p>
        <ol>
          <li>
            <span>01</span>
            <strong>주간 계획 확정</strong>
            <small>09:30–10:10</small>
          </li>
          <li>
            <span>02</span>
            <strong>배포 전 점검</strong>
            <small>13:00–14:20</small>
          </li>
          <li>
            <span>03</span>
            <strong>고객 메모 정리</strong>
            <small>16:30–17:00</small>
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: "repolens",
    index: "02",
    name: "RepoLens",
    eyebrow: "저장소 유지관리",
    description:
      "로컬 또는 GitHub 저장소를 읽기 전용으로 검사합니다. 상태 점수와 바로 처리할 조치를 터미널·JSON·HTML로 남깁니다.",
    launchUrl: "/repolens/",
    sourceUrl: "https://github.com/rad1092/repolens",
    action: "리포트 보기",
    className: "product-repolens",
    preview: (
      <div className="repolens-preview" aria-hidden="true">
        <div className="terminal-line">
          <span>$</span> repolens .
        </div>
        <div className="score-row">
          <strong>100</strong>
          <div>
            <span>Repository health</span>
            <b>Grade A</b>
          </div>
        </div>
        <ul>
          <li>
            <span className="check">✓</span> CI workflow
            <small>detected</small>
          </li>
          <li>
            <span className="check">✓</span> Lockfile
            <small>tracked</small>
          </li>
          <li>
            <span className="check">✓</span> Tracked secrets
            <small>none found</small>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "siteboard",
    index: "03",
    name: "Siteboard",
    eyebrow: "홈페이지 관리",
    description:
      "페이지 구성, 문구, 링크, 색상과 검색 정보를 한 화면에서 편집합니다. 결과는 JSON 또는 독립 실행 HTML로 내보냅니다.",
    launchUrl: "/siteboard/",
    sourceUrl: "https://github.com/rad1092/siteboard",
    action: "편집기 열기",
    className: "product-siteboard",
    preview: (
      <div className="siteboard-preview" aria-hidden="true">
        <aside>
          <b>SECTIONS</b>
          <span className="active">01 Hero</span>
          <span>02 Services</span>
          <span>03 Contact</span>
          <button type="button" tabIndex={-1}>
            + Add section
          </button>
        </aside>
        <div className="site-canvas">
          <div className="canvas-nav">
            <i />
            <i />
            <i />
          </div>
          <p>Operations, without the clutter.</p>
          <div className="canvas-button">Get started</div>
          <div className="canvas-grid">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    ),
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
        <a className="wordmark" href="#top" aria-label="WHAGO 홈">
          WHAGO<span aria-hidden="true">•</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#tools">도구</a>
          <a href="#system">운영 방식</a>
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
          <div className="hero-copy">
            <p className="kicker">WHAGO OPERATIONS TOOLKIT</p>
            <h1 id="hero-title">
              계획하고,
              <br />
              점검하고,
              <br />
              바로 고칩니다.
            </h1>
            <p className="hero-description">
              일정을 정리하고 저장소 상태를 확인하고 홈페이지 내용을
              관리하는 세 가지 도구입니다.
            </p>
            <a className="primary-action" href="#tools">
              도구 살펴보기 <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="system-map" aria-label="WHAGO 도구 구성">
            <div className="system-map-head">
              <span>현재 제공 중</span>
              <strong>
                <i aria-hidden="true" /> 3 tools
              </strong>
            </div>
            {products.map((product) => (
              <a key={product.id} href={`#${product.id}`}>
                <span>{product.index}</span>
                <strong>{product.name}</strong>
                <small>{product.eyebrow}</small>
                <b aria-hidden="true">↘</b>
              </a>
            ))}
          </div>
        </section>

        <section className="tool-index" id="tools" aria-labelledby="tools-title">
          <header className="section-heading">
            <p>TOOLS / 01–03</p>
            <h2 id="tools-title">필요할 때 바로 여는 도구</h2>
            <p>
              Daymark와 Siteboard는 브라우저에 저장하고, RepoLens는 저장소를
              읽기 전용으로 검사합니다.
            </p>
          </header>

          <div className="product-list">
            {products.map((product) => (
              <article
                className={`product ${product.className}`}
                id={product.id}
                key={product.id}
              >
                <header className="product-copy">
                  <div>
                    <span>{product.index}</span>
                    <p>{product.eyebrow}</p>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-actions">
                    <a href={product.launchUrl}>
                      {product.action} <span aria-hidden="true">→</span>
                    </a>
                    <a
                      href={product.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      소스 ↗{externalLabel}
                    </a>
                  </div>
                </header>
                <div className="product-preview">{product.preview}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="operating-system" id="system" aria-labelledby="system-title">
          <header className="section-heading">
            <p>SYSTEM / HOW IT FITS</p>
            <h2 id="system-title">세 도구, 하나의 흐름</h2>
          </header>
          <ol>
            <li>
              <span>01</span>
              <strong>Daymark에서 오늘 할 일을 정합니다.</strong>
              <p>수집한 할 일 중 세 가지를 고르고 실제 시간에 배치합니다.</p>
            </li>
            <li>
              <span>02</span>
              <strong>RepoLens로 코드 상태를 확인합니다.</strong>
              <p>읽기 전용 검사 결과를 보고 우선순위가 높은 항목부터 처리합니다.</p>
            </li>
            <li>
              <span>03</span>
              <strong>Siteboard에서 내용을 관리합니다.</strong>
              <p>문구와 구성을 수정하고 검증한 뒤 배포 가능한 파일로 내보냅니다.</p>
            </li>
          </ol>
        </section>

        <section className="repo-section" aria-labelledby="repo-title">
          <div>
            <p>OPEN SOURCE</p>
            <h2 id="repo-title">코드와 변경 내역을 공개합니다.</h2>
          </div>
          <a
            href="https://github.com/rad1092"
            target="_blank"
            rel="noreferrer"
          >
            github.com/rad1092 <span aria-hidden="true">↗</span>
            {externalLabel}
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#top">
          WHAGO<span aria-hidden="true">•</span>
        </a>
        <p>Productivity · Maintenance · Publishing</p>
        <span>© 2026</span>
      </footer>
    </>
  );
}
