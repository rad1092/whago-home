import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductLinks } from "../../_components/product-links";
import { getProduct, products } from "../../_data/products";

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

  return (
    <main id="main" className={`product-page product-page--${product.slug}`}>
      <header className="product-hero page-shell">
        <nav className="breadcrumbs" aria-label="현재 위치">
          <Link href="/software">소프트웨어</Link>
          <span aria-hidden="true">/</span>
          <span>{product.name}</span>
        </nav>
        <p className="kicker">{product.category}</p>
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
            <span>현재 릴리스 화면</span>
            <strong>v{product.version}</strong>
          </figcaption>
        </figure>

        <dl className="fact-list">
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
          <p className="kicker">Functions</p>
          <h2>하는 일</h2>
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

      <section className="product-release page-shell">
        <div>
          <p className="kicker">Current release</p>
          <h2>v{product.version}</h2>
          <time dateTime={product.releaseDateIso}>{product.releaseDate}</time>
        </div>
        <div>
          <h3>{product.releaseTitle}</h3>
          <p>{product.releaseSummary}</p>
          <ul>
            {product.releaseChanges.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
          <a
            href={`${product.source}/releases/tag/v${product.version}`}
            rel="noreferrer"
            target="_blank"
          >
            GitHub 릴리스 보기 ↗
            <span className="sr-only">(새 탭에서 열림)</span>
          </a>
        </div>
      </section>
    </main>
  );
}
