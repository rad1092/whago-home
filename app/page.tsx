import Link from "next/link";
import { ProductShowcase } from "./_components/product-list";
import {
  featuredProducts,
  getProduct,
  releases,
} from "./_data/products";

export const dynamic = "force-static";

export default function Home() {
  return (
    <main id="main">
      <header className="home-heading page-shell">
        <h1>소프트웨어</h1>
        <p>
          오늘 할 일, 저장소 검사, 한 페이지 사이트 제작을 위한
          도구입니다.
        </p>
      </header>

      <section
        className="home-products page-shell"
        aria-label="WHAGO 주요 제품"
      >
        <ProductShowcase items={featuredProducts} />
        <div className="home-products__footer">
          <Link href="/software">모든 제품 보기 →</Link>
        </div>
      </section>

      <section
        className="home-updates page-shell"
        aria-labelledby="recent-updates"
      >
        <div className="compact-heading">
          <h2 id="recent-updates">최근 업데이트</h2>
          <Link href="/releases">변경 기록 보기 →</Link>
        </div>
        <ol>
          {releases.slice(0, 3).map((release) => {
            const product = getProduct(release.productSlug);

            if (!product) return null;

            return (
              <li key={`${release.productSlug}-${release.version}`}>
                <Link href={`/software/${product.slug}`}>
                  <span>{product.name}</span>
                  <strong>v{release.version}</strong>
                  <time dateTime={release.dateIso}>{release.date}</time>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
