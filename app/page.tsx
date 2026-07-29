const externalLabel = <span className="sr-only">(새 탭에서 열림)</span>;

const products = [
  {
    id: "daymark",
    number: "01",
    kind: "LOCAL DAILY PLANNER",
    name: "Daymark",
    headline: "오늘의 약속을 최대 세 개 고르고, 시작할 때 정한 수로 하루를 운영합니다.",
    description:
      "지금 할 일 하나와 이어질 약속에 집중합니다. 남은 일은 날짜와 다음 행동을 적어 다시 만날 시점을 정합니다.",
    url: "https://daymark.whago.net/",
    source: "https://github.com/rad1092/daymark",
    action: "웹 앱 열기",
    version: "2.2.0",
    latest: {
      date: "2026.07.29",
      title: "완결된 하루",
      summary:
        "최대 세 가지 약속을 실행하고, 남은 일에는 다시 볼 날짜와 시작 지점을 남깁니다.",
      changes: [
        "시작할 때 고른 약속 수 고정",
        "미완료 항목의 날짜와 다음 행동",
        "되돌리기와 로컬 복구 스냅샷",
      ],
    },
    facts: [
      ["RUNS IN", "Browser / PWA"],
      ["STORES", "Local device"],
      ["EXPORTS", "JSON backup"],
    ],
    captureAlt:
      "Daymark에서 오늘 할 일 세 개의 순서를 정하고 시작하는 실제 화면",
  },
  {
    id: "repolens",
    number: "02",
    kind: "REPOSITORY REGRESSION GATE",
    name: "RepoLens",
    headline: "기존 부채는 기준선에 두고, PR에서 새로 생긴 회귀를 막습니다.",
    description:
      "Node·GitHub 저장소의 운영 설정을 읽기 전용으로 검사합니다. 새 회귀에는 파일과 줄, 수정 방법을 남기고 CI 결과와 SARIF를 함께 만듭니다.",
    url: "https://repolens.whago.net/",
    source: "https://github.com/rad1092/repolens",
    action: "설치와 사용법",
    version: "0.3.0",
    latest: {
      date: "2026.07.29",
      title: "PR 회귀 게이트",
      summary:
        "기준선에 수용한 부채와 이번 변경에서 새로 생긴 회귀를 분리합니다.",
      changes: [
        "새 회귀만 파일과 줄 위치에 표시",
        "수용 사유와 만료일을 가진 기준선",
        "GitHub Job Summary와 SARIF 출력",
      ],
    },
    facts: [
      ["RUNS IN", "CLI / GitHub Actions"],
      ["READS", "Node + GitHub repos"],
      ["EXPORTS", "SARIF / JSON / HTML"],
    ],
    captureAlt:
      "RepoLens가 저장소의 새 유지보수 회귀와 파일 위치를 표시한 실제 HTML 보고서",
  },
  {
    id: "siteboard",
    number: "03",
    kind: "STATIC SITE STUDIO",
    name: "Siteboard",
    headline: "한 장짜리 사업 홈페이지를 만들고 배포한 파일까지 확인합니다.",
    description:
      "로컬 작업 파일에 내용과 배포 대상을 함께 보관합니다. Cloudflare에 올린 뒤 실제 주소의 리비전을 확인하고 이전 정상 버전으로 되돌립니다.",
    url: "https://siteboard.whago.net/",
    source: "https://github.com/rad1092/siteboard",
    action: "제품과 설치",
    version: "4.0.0",
    latest: {
      date: "2026.07.29",
      title: "검증 가능한 배포",
      summary:
        "대상 프로젝트와 작업 파일을 함께 보관하고 배포한 리비전을 실제 주소에서 확인합니다.",
      changes: [
        "Cloudflare 프로젝트 명시 연결",
        "리비전 마커 기반 배포 확인",
        "초안 스냅샷과 운영 버전 롤백 분리",
      ],
    },
    facts: [
      ["RUNS IN", "Local Studio"],
      ["BUILDS", "Static HTML"],
      ["DEPLOYS", "Cloudflare Pages"],
    ],
    captureAlt:
      "Siteboard에서 사업 홈페이지 내용과 미리보기를 함께 편집하는 실제 화면",
  },
] as const;

export const dynamic = "force-static";

function releaseUrl(source: string, version: string) {
  return `${source}/releases/tag/v${version}`;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 바로가기
      </a>

      <header className="site-header" id="top">
        <a className="wordmark" href="#top" aria-label="WHAGO 홈">
          WHAGO<span>/03</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#releases">릴리스</a>
          <a href="#products">제품</a>
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
          <div className="hero-index">
            <span>INDEPENDENT SOFTWARE</span>
            <span>SEOUL / KR</span>
            <span>EST. 2026</span>
          </div>
          <div className="hero-title-block">
            <p>PRODUCT HOUSE / 01—03</p>
            <h1 id="hero-title">WHAGO</h1>
          </div>
          <div className="hero-statement">
            <p>
              Daymark, RepoLens, Siteboard를 만들고 각 제품의 코드와 릴리스를
              운영합니다.
            </p>
            <a href="#releases">
              최근 릴리스 <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-marquee" aria-label="WHAGO 제품">
            {products.map((product) => (
              <a href={`#${product.id}`} key={product.id}>
                <span>{product.number}</span>
                <strong>{product.name}</strong>
                <small>{product.kind}</small>
              </a>
            ))}
          </div>
        </section>

        <section
          className="release-desk"
          id="releases"
          aria-labelledby="releases-title"
        >
          <header className="release-heading">
            <div>
              <p className="eyebrow">RELEASE DESK / LATEST</p>
              <h2 id="releases-title">최근 릴리스</h2>
            </div>
            <p>
              버전, 변경 내용, 소스를 한곳에서 확인할 수 있습니다.
            </p>
          </header>

          <div className="release-list">
            {products.map((product) => (
              <article
                className={`release-row release-${product.id}`}
                key={product.id}
              >
                <div className="release-meta">
                  <time dateTime="2026-07-29">{product.latest.date}</time>
                  <span>{`v${product.version}`}</span>
                </div>
                <div className="release-copy">
                  <p>{product.name}</p>
                  <h3>{product.latest.title}</h3>
                  <p>{product.latest.summary}</p>
                </div>
                <details>
                  <summary>변경 3개</summary>
                  <ul>
                    {product.latest.changes.map((change) => (
                      <li key={change}>{change}</li>
                    ))}
                  </ul>
                </details>
                <a
                  href={releaseUrl(product.source, product.version)}
                  target="_blank"
                  rel="noreferrer"
                >
                  릴리스 노트 ↗{externalLabel}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="products" id="products" aria-labelledby="products-title">
          <header className="products-heading">
            <p className="eyebrow">PRODUCTS / CURRENT</p>
            <h2 id="products-title">각자의 주소에서 작동하는 세 제품</h2>
          </header>

          <div className="product-list">
            {products.map((product) => (
              <article className={`product product-${product.id}`} id={product.id} key={product.id}>
                <header className="product-header">
                  <div>
                    <span>{product.number}</span>
                    <p>{product.kind}</p>
                  </div>
                  <strong>{`v${product.version}`}</strong>
                </header>

                <div className="product-body">
                  <div className="product-copy">
                    <h3>{product.name}</h3>
                    <h4>{product.headline}</h4>
                    <p>{product.description}</p>
                    <dl>
                      {product.facts.map(([term, value]) => (
                        <div key={term}>
                          <dt>{term}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="product-actions">
                      <a
                        className="product-primary"
                        href={product.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {product.action} ↗{externalLabel}
                      </a>
                      <a href={product.source} target="_blank" rel="noreferrer">
                        소스
                        <span aria-hidden="true"> ↗</span>
                        {externalLabel}
                      </a>
                      <a
                        href={releaseUrl(product.source, product.version)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        릴리스
                        <span aria-hidden="true"> ↗</span>
                        {externalLabel}
                      </a>
                    </div>
                  </div>
                  <div className="product-preview">
                    <figure className="release-capture">
                      <img
                        src={`/release-${product.id}-v${product.version}.jpg`}
                        alt={product.captureAlt}
                        width={885}
                        height={649}
                        loading="lazy"
                        decoding="async"
                      />
                      <figcaption>
                        <span>RELEASE CAPTURE</span>
                        <strong>v{product.version}</strong>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="operating-notes" aria-labelledby="notes-title">
          <header>
            <p className="eyebrow">PRODUCT NOTES</p>
            <h2 id="notes-title">배포 전 확인할 정보</h2>
          </header>
          <div>
            <article>
              <span>01 / DATA</span>
              <h3>저장 위치</h3>
              <p>
                Daymark는 브라우저, Siteboard는 로컬 작업 파일에 저장합니다.
                RepoLens는 저장소를 읽기 전용으로 검사합니다.
              </p>
            </article>
            <article>
              <span>02 / RELEASE</span>
              <h3>변경 기록</h3>
              <p>
                제품별 버전과 설치 파일, 변경 내역은 각 GitHub Release에
                남깁니다.
              </p>
            </article>
            <article>
              <span>03 / SUPPORT</span>
              <h3>문제 접수</h3>
              <p>
                재현 절차와 사용 환경을 제품 저장소의 Issues에 남길 수
                있습니다.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#top">
          WHAGO<span>/03</span>
        </a>
        <p>DAYMARK / REPOLENS / SITEBOARD</p>
        <p>© 2026 WHAGO · SEOUL</p>
      </footer>
    </>
  );
}
