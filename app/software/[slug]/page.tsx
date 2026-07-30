import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductLinks } from "../../_components/product-links";
import {
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
    description: product.summary,
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
          <Link href="/software">소프트웨어</Link>
          <span aria-hidden="true">/</span>
          <span>{product.name}</span>
        </nav>
        <p className="product-hero__category">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="product-hero__summary">{product.summary}</p>
        <ProductLinks links={product.links} />
      </header>

      <section className="product-overview page-shell">
        <figure className="product-shot">
          <img
            src={product.screenshot}
            alt={product.screenshotAlt}
            width={885}
            height={649}
          />
          <figcaption>
            <span>제품 화면</span>
            <strong>{release ? `v${release.version}` : "현재 버전"}</strong>
          </figcaption>
        </figure>

        <dl className="fact-list">
          {release ? (
            <div>
              <dt>현재 버전</dt>
              <dd>
                v{release.version} · {release.date}
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
      </section>

      <section className="product-details page-shell">
        <div>
          <h2>주요 기능</h2>
        </div>
        <ol>
          {product.capabilities.map((capability, index) => (
            <li key={capability}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {capability}
            </li>
          ))}
        </ol>
      </section>

      <section className="product-more page-shell" aria-labelledby="product-more">
        <h2 id="product-more">더 보기</h2>
        <nav aria-label={`${product.name} 추가 링크`}>
          <Link href="/releases">변경 기록 →</Link>
          <a
            href={`${product.source}/issues`}
            rel="noreferrer"
            target="_blank"
          >
            오류 신고 ↗
            <span className="sr-only">(새 탭에서 열림)</span>
          </a>
        </nav>
      </section>
    </main>
  );
}
