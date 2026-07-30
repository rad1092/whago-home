import Link from "next/link";
import { ProductIndex } from "./_components/product-list";
import {
  formatReleaseDate,
  getProduct,
  products,
  releases,
} from "./_data/products";

export const dynamic = "force-static";

export default function Home() {
  return (
    <main id="main">
      <section className="software-index page-shell" aria-labelledby="products-title">
        <header className="index-title">
          <h1 id="products-title">제품</h1>
          <Link href="/software">제품 비교 →</Link>
        </header>
        <div className="product-index__head" aria-hidden="true">
          <span>제품</span>
          <span>용도</span>
          <span>제공 형태</span>
          <span>버전</span>
          <span>화면</span>
          <span>바로가기</span>
        </div>
        <ProductIndex items={products} />
      </section>

      <section className="release-desk page-shell" aria-labelledby="recent-updates">
        <header>
          <h2 id="recent-updates">최근 업데이트</h2>
          <Link href="/releases">전체 기록 →</Link>
        </header>
        <ol>
          {releases.map((release) => {
            const product = getProduct(release.productSlug);

            if (!product) return null;

            return (
              <li key={`${release.productSlug}-${release.version}`}>
                <Link href={`/software/${product.slug}`}>
                  <span>{product.name}</span>
                  <strong>v{release.version}</strong>
                  <time dateTime={release.publishedAt}>
                    {formatReleaseDate(release.publishedAt)}
                  </time>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
