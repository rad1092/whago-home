import type { Metadata } from "next";
import Link from "next/link";
import { products } from "../_data/products";

export const metadata: Metadata = {
  title: "릴리스",
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
        <p className="kicker">Releases</p>
        <h1>릴리스</h1>
        <p>제품별 현재 버전과 실제 변경 내용을 기록합니다.</p>
      </header>

      <section className="release-ledger page-shell" aria-label="제품 릴리스">
        {products.map((product) => (
          <article key={product.slug}>
            <div className="release-ledger__meta">
              <time dateTime={product.releaseDateIso}>
                {product.releaseDate}
              </time>
              <strong>v{product.version}</strong>
            </div>
            <div>
              <Link href={`/software/${product.slug}`}>{product.name}</Link>
              <h2>{product.releaseTitle}</h2>
              <p>{product.releaseSummary}</p>
            </div>
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
              GitHub ↗<span className="sr-only">(새 탭에서 열림)</span>
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}

