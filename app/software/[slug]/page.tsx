import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductMark } from "../../_components/product-mark";
import {
  formatReleaseDate,
  getLatestRelease,
  getProduct,
  products,
} from "../../_data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
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
    description: product.purpose,
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
        <figure className="product-shot">
          <img
            src={product.media.src}
            alt={product.media.alt}
            width={product.media.width}
            height={product.media.height}
          />
        </figure>

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
