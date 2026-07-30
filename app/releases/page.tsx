import type { Metadata } from "next";
import Link from "next/link";
import { getProduct, releases } from "../_data/products";

export const metadata: Metadata = {
  title: "변경 기록",
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
        <h1>변경 기록</h1>
      </header>

      <section className="release-ledger page-shell" aria-label="제품 릴리스">
        {releases.map((release) => {
          const product = getProduct(release.productSlug);

          if (!product) return null;

          return (
            <article key={`${release.productSlug}-${release.version}`}>
              <div className="release-ledger__meta">
                <time dateTime={release.dateIso}>{release.date}</time>
                <strong>v{release.version}</strong>
              </div>
              <div className="release-ledger__main">
                <Link href={`/software/${product.slug}`}>{product.name}</Link>
                <h2>{release.title}</h2>
                <p>{release.summary}</p>
              </div>
              <ul>
                {release.changes.map((change) => (
                  <li key={change}>{change}</li>
                ))}
              </ul>
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
