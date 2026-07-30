import type { Metadata } from "next";
import Link from "next/link";
import {
  formatReleaseDate,
  getProduct,
  releases,
} from "../_data/products";

export const metadata: Metadata = {
  title: "업데이트",
  description: "WHAGO 소프트웨어의 버전과 변경 내용을 확인합니다.",
  alternates: {
    canonical: "/releases",
  },
};

export const dynamic = "force-static";

export default function ReleasesPage() {
  return (
    <main id="main">
      <header className="page-intro page-shell">
        <h1>업데이트</h1>
      </header>

      <section className="release-ledger page-shell" aria-label="제품 업데이트">
        <div className="release-ledger__head" aria-hidden="true">
          <span>날짜</span>
          <span>제품</span>
          <span>변경 내용</span>
          <span>릴리스</span>
        </div>
        {releases.map((release) => {
          const product = getProduct(release.productSlug);

          if (!product) return null;

          return (
            <article key={`${release.productSlug}-${release.version}`}>
              <time dateTime={release.publishedAt}>
                {formatReleaseDate(release.publishedAt)}
              </time>
              <div>
                <Link href={`/software/${product.slug}`}>{product.name}</Link>
                <span>v{release.version}</span>
              </div>
              <p>{release.summary}</p>
              <a
                href={`${product.source}/releases/tag/v${release.version}`}
                rel="noreferrer"
                target="_blank"
              >
                GitHub ↗<span className="sr-only">(새 탭에서 열림)</span>
              </a>
            </article>
          );
        })}
      </section>
    </main>
  );
}
