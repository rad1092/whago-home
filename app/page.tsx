const externalLabel = <span className="sr-only">(새 탭에서 열림)</span>;

const products = [
  {
    id: "daymark",
    number: "01",
    kind: "DAILY PLANNER",
    name: "Daymark",
    headline: "오늘 할 일을 정하고, 남은 일은 다시 결정합니다.",
    description:
      "수집한 일 가운데 오늘 끝낼 약속을 세 개까지 고릅니다. 완료·내일·나중·막힘을 직접 결정하고 하루를 닫습니다.",
    url: "https://daymark.whago.net/",
    source: "https://github.com/rad1092/daymark",
    action: "Daymark 열기",
    className: "product-daymark",
    facts: ["오늘의 약속 3개", "최근 7일 기록", "로컬 저장과 백업"],
  },
  {
    id: "repolens",
    number: "02",
    kind: "REPOSITORY MAINTENANCE",
    name: "RepoLens",
    headline: "저장소에서 새로 생긴 유지보수 문제를 가려냅니다.",
    description:
      "로컬 경로와 GitHub 저장소를 읽어 근거가 있는 점검 결과를 만듭니다. 검토한 기준선을 저장하고 다음 변경부터 회귀만 차단합니다.",
    url: "https://repolens.whago.net/",
    source: "https://github.com/rad1092/repolens",
    action: "설치와 사용법",
    className: "product-repolens",
    facts: ["CLI와 GitHub Action", "JSON·HTML·Markdown", "기준선 비교"],
  },
  {
    id: "siteboard",
    number: "03",
    kind: "WEBSITE OPERATIONS",
    name: "Siteboard",
    headline: "홈페이지를 만들고, 배포한 버전까지 관리합니다.",
    description:
      "내용과 화면을 편집해 정적 홈페이지를 만들고 Cloudflare에 배포합니다. 실제 주소를 확인하고 이전 배포로 되돌릴 수 있습니다.",
    url: "https://siteboard.whago.net/",
    source: "https://github.com/rad1092/siteboard",
    action: "Siteboard 열기",
    className: "product-siteboard",
    facts: ["편집과 반응형 미리보기", "Cloudflare 배포", "배포 확인과 롤백"],
  },
] as const;

export const dynamic = "force-static";

function DaymarkPreview() {
  return (
    <div className="daymark-window" aria-hidden="true">
      <div className="window-bar">
        <span>7월 29일</span>
        <b>오늘 2 / 3</b>
      </div>
      <ol>
        <li className="done">
          <span>01</span>
          <strong>출시 문구 검토</strong>
          <i>완료</i>
        </li>
        <li className="active">
          <span>02</span>
          <strong>모바일 화면 확인</strong>
          <i>진행 중</i>
        </li>
        <li>
          <span>03</span>
          <strong>배포 기록 정리</strong>
          <i>다음</i>
        </li>
      </ol>
      <p>하루 정리에서 남은 일을 직접 결정합니다.</p>
    </div>
  );
}

function RepoLensPreview() {
  return (
    <div className="repolens-window" aria-hidden="true">
      <div className="terminal-top">
        <span />
        <span />
        <span />
        <b>repolens compare</b>
      </div>
      <div className="terminal-content">
        <p>
          <i>$</i> repolens compare . --baseline accepted.json --fail-on new-warning
        </p>
        <div className="scan-result">
          <span>NEW</span>
          <strong>2 warnings</strong>
        </div>
        <ul>
          <li>
            <b>action-pinning</b>
            <span>.github/workflows/release.yml</span>
          </li>
          <li>
            <b>dependency-updates</b>
            <span>.github/dependabot.yml</span>
          </li>
        </ul>
        <small>Policy new-warning · exit 1</small>
      </div>
    </div>
  );
}

function SiteboardPreview() {
  return (
    <div className="siteboard-window" aria-hidden="true">
      <aside>
        <b>SITEBOARD</b>
        <span className="selected">내용</span>
        <span>구성</span>
        <span>스타일</span>
        <span>배포</span>
      </aside>
      <div className="siteboard-canvas">
        <div className="canvas-head">
          <span>mori studio</span>
          <i>컴퓨터</i>
        </div>
        <div className="canvas-copy">
          <small>BRAND &amp; WEB</small>
          <strong>작은 브랜드의<br />첫 홈페이지</strong>
          <span>프로젝트 보기</span>
        </div>
        <div className="deploy-strip">
          <span>운영 중</span>
          <b>리비전 84f0c28b</b>
          <i>7월 29일</i>
        </div>
      </div>
    </div>
  );
}

const previews = {
  daymark: <DaymarkPreview />,
  repolens: <RepoLensPreview />,
  siteboard: <SiteboardPreview />,
} as const;

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 바로가기
      </a>

      <header className="site-header" id="top">
        <a className="wordmark" href="#top" aria-label="WHAGO 홈">
          WHAGO<span aria-hidden="true">/</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#products">제품</a>
          <a href="#principles">운영 기준</a>
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
            <p className="eyebrow">SOFTWARE PRODUCTS</p>
            <h1 id="hero-title">WHAGO</h1>
            <p className="hero-description">
              Daymark <span aria-hidden="true">/</span> RepoLens{" "}
              <span aria-hidden="true">/</span> Siteboard
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#products">
                제품 보기 <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button button-quiet"
                href="https://github.com/rad1092"
                target="_blank"
                rel="noreferrer"
              >
                코드와 릴리스 ↗{externalLabel}
              </a>
            </div>
          </div>

          <aside className="product-switchboard" aria-label="WHAGO 제품">
            <div className="switchboard-heading">
              <span>PRODUCTS</span>
              <b>03</b>
            </div>
            {products.map((product) => (
              <a href={`#${product.id}`} key={product.id}>
                <span>{product.number}</span>
                <strong>{product.name}</strong>
                <small>{product.kind}</small>
                <b aria-hidden="true">↘</b>
              </a>
            ))}
          </aside>
        </section>

        <section className="products" id="products" aria-labelledby="products-title">
          <header className="section-heading">
            <p className="eyebrow">PRODUCTS / 01—03</p>
            <h2 id="products-title">세 가지 제품</h2>
            <p>
              Daymark는 웹 앱, RepoLens는 CLI와 GitHub Action,
              Siteboard는 로컬 스튜디오로 제공합니다.
            </p>
          </header>

          <div className="product-list">
            {products.map((product) => (
              <article
                className={`product ${product.className}`}
                id={product.id}
                key={product.id}
              >
                <div className="product-copy">
                  <p className="product-label">
                    <span>{product.number}</span>
                    {product.kind}
                  </p>
                  <h3>{product.name}</h3>
                  <h4>{product.headline}</h4>
                  <p className="product-description">{product.description}</p>
                  <ul>
                    {product.facts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                  <div className="product-actions">
                    <a
                      className="product-launch"
                      href={product.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {product.action} ↗{externalLabel}
                    </a>
                    <a
                      href={product.source}
                      target="_blank"
                      rel="noreferrer"
                    >
                      소스 보기 ↗{externalLabel}
                    </a>
                  </div>
                </div>
                <div className="product-preview">{previews[product.id]}</div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="principles"
          id="principles"
          aria-labelledby="principles-title"
        >
          <header>
            <p className="eyebrow">OPERATING PRINCIPLES</p>
            <h2 id="principles-title">제품을 운영하는 기준</h2>
          </header>
          <div className="principle-grid">
            <article>
              <span>01</span>
              <h3>데이터 이동</h3>
              <p>
                Daymark와 Siteboard는 백업 파일을 만들고 다시 불러올 수
                있습니다.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>검증된 릴리스</h3>
              <p>
                테스트와 빌드를 통과한 버전을 저장소 릴리스와 배포 기록으로
                남깁니다.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>안전한 업데이트</h3>
              <p>
                제품별 릴리스를 따로 배포해 필요한 변경만 빠르게
                반영합니다.
              </p>
            </article>
          </div>
        </section>

        <section className="open-source" aria-labelledby="source-title">
          <div>
            <p className="eyebrow">SOURCE &amp; RELEASES</p>
            <h2 id="source-title">코드와 변경 내역을 공개합니다.</h2>
          </div>
          <a
            className="button button-light"
            href="https://github.com/rad1092"
            target="_blank"
            rel="noreferrer"
          >
            GitHub에서 보기 ↗{externalLabel}
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#top">
          WHAGO<span aria-hidden="true">/</span>
        </a>
        <p>Daymark / RepoLens / Siteboard</p>
        <p>© 2026 WHAGO</p>
      </footer>
    </>
  );
}
