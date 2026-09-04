import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductMark } from "../../_components/product-mark";
import {
  formatReleaseDate,
  getLatestRelease,
  getProduct,
  allProducts,
  isRetired,
} from "../../_data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: isRetired(product.slug) ? `${product.name} 개발 종료. 기존 자료 내려받기와 구버전 이용 안내.` : product.purpose,
    alternates: {
      canonical: `/software/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  if (isRetired(product.slug)) {
    return (
      <main id="main">
        <header className="page-intro page-shell retired-hero">
          <span className="status-label">개발 종료 · 2026.09.05</span>
          <h1>{product.name}</h1>
          <p>{product.slug === "daymark" ? "Daymark의 독립 제품 개발을 종료했습니다. 기존 할 일과 기록을 내려받거나 구버전을 열 수 있습니다." : "Siteboard의 독립 제품 개발을 종료했습니다. 기존 작업 파일을 내려받거나 구버전에서 편집·내보내기를 계속할 수 있습니다."}</p>
          <div className="action-row"><a className="solid-link" href={`https://${product.slug}.whago.net/`}>기존 자료와 구버전 열기 →</a><Link href="/archive">종료 제품 안내</Link></div>
          <div className="notice-panel"><p>자료는 사용하던 기기와 브라우저에 있습니다. 같은 환경에서 위 주소를 열어주세요. 서버에서 개인 자료를 가져오거나 자동으로 지우지 않습니다.</p></div>
          <p>예전에 whago.net에서 사용했다면 <a href={`/${product.slug}/`}>이 주소에 남은 자료 확인</a>을 이용하세요.</p>
          <p>설치판의 로컬 파일은 설치판에서 백업하세요. <a href={product.source}>소스와 이전 릴리스</a>도 유지합니다.</p>
        </header>
      </main>
    );
  }

  const release = getLatestRelease(product.slug);

  return (
    <main id="main" className={`product-page product-page--${product.slug}`}>
      <header className="product-hero page-shell">
        <nav className="breadcrumbs" aria-label="현재 위치">
          <Link href="/software">제품</Link>
          <span aria-hidden="true">/</span>
          <span>{product.name}</span>
        </nav>
        <div className="product-hero__identity">
          <ProductMark product={product} priority size="large" />
          <div>
            <p>{product.typeLabel}</p>
            <h1>{product.name}</h1>
          </div>
        </div>
        <p className="product-hero__purpose">{product.purpose}</p>
        <a
          className="primary-text-link"
          href={product.primaryAction.href}
          rel="noreferrer"
          target="_blank"
        >
          {product.primaryAction.label} <span aria-hidden="true">↗</span>
          <span className="sr-only">(새 탭에서 열림)</span>
        </a>
      </header>

      <section className="product-overview page-shell" aria-label="제품 화면과 사양">
        {product.slug === "firstcall" ? (
          <div className="flow-example" aria-label="실제 검증한 MCP 호출 예제">
            <div className="flow-example__header"><span>GET → MCP</span><span>공개 API로 검증한 예제</span></div>
            <div className="flow-step"><span className="step-label">API 요청</span><code>api.github.com/repos/&#123;owner&#125;/&#123;repository&#125;</code></div>
            <div className="flow-step"><span className="step-label">도구 호출</span><pre>{'{\n  "name": "get_github_repository",\n  "arguments": {\n    "owner": "octocat",\n    "repository": "Hello-World"\n  }\n}'}</pre></div>
            <div className="flow-step"><span className="step-label">반환된 JSON 중 일부</span><pre>{'{\n  "status": 200,\n  "data": {\n    "full_name": "octocat/Hello-World"\n  }\n}'}</pre></div>
          </div>
        ) : (
          <figure className="product-shot">
            <img src={product.media.src} alt={product.media.alt} width={product.media.width} height={product.media.height} />
          </figure>
        )}

        <div className="spec-panel">
          <h2>현재 제공</h2>
          <dl className="spec-table">
            {release ? (
              <div>
                <dt>버전</dt>
                <dd>
                  v{release.version} · {formatReleaseDate(release.publishedAt)}
                </dd>
              </div>
            ) : null}
            {product.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="product-section page-shell" aria-labelledby="workflow-title">
        <header>
          <h2 id="workflow-title">사용 흐름</h2>
        </header>
        <ol className="workflow-list">
          {product.workflow.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="product-section page-shell" aria-labelledby="setup-title">
        <header>
          <h2 id="setup-title">{product.setup.title}</h2>
        </header>
        <div className="setup-copy">
          <p>{product.setup.body}</p>
          {product.setup.commands ? (
            <pre>
              <code>{product.setup.commands.join("\n")}</code>
            </pre>
          ) : null}
        </div>
      </section>

      <section className="product-resources page-shell" aria-labelledby="resources-title">
        <h2 id="resources-title">링크</h2>
        <nav aria-label={`${product.name} 관련 링크`}>
          <a
            href={product.guide.href}
            rel="noreferrer"
            target="_blank"
          >
            {product.guide.label} ↗
            <span className="sr-only">(새 탭에서 열림)</span>
          </a>
          <a href={product.source} rel="noreferrer" target="_blank">
            소스 ↗<span className="sr-only">(새 탭에서 열림)</span>
          </a>
          <a
            href={`${product.source}/issues`}
            rel="noreferrer"
            target="_blank"
          >
            오류 신고 ↗
            <span className="sr-only">(새 탭에서 열림)</span>
          </a>
          {release ? (
            <a
              href={`${product.source}/releases/tag/v${release.version}`}
              rel="noreferrer"
              target="_blank"
            >
              v{release.version} 릴리스 ↗
              <span className="sr-only">(새 탭에서 열림)</span>
            </a>
          ) : null}
        </nav>
      </section>
    </main>
  );
}
