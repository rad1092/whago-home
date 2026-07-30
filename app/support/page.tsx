import type { Metadata } from "next";
import { products } from "../_data/products";

export const metadata: Metadata = {
  title: "지원",
  description: "WHAGO 제품의 사용법과 오류 신고 경로입니다.",
  alternates: {
    canonical: "/support",
  },
};

export const dynamic = "force-static";

export default function SupportPage() {
  return (
    <main id="main">
      <header className="page-intro page-shell">
        <h1>지원</h1>
        <p>제품별 사용법과 오류 신고 경로입니다.</p>
      </header>

      <section className="support-list page-shell" aria-label="제품별 지원">
        {products.map((product) => (
          <article key={product.slug}>
            <div>
              <h2>{product.name}</h2>
              <p>{product.typeLabel}</p>
            </div>
            <p>{product.purpose}</p>
            <nav aria-label={`${product.name} 지원 링크`}>
              <a
                href={product.guide.href}
                rel="noreferrer"
                target="_blank"
              >
                {product.guide.label} ↗
                <span className="sr-only">(새 탭에서 열림)</span>
              </a>
              <a
                href={`${product.source}/issues`}
                rel="noreferrer"
                target="_blank"
              >
                오류 신고 ↗
                <span className="sr-only">(새 탭에서 열림)</span>
              </a>
            </nav>
          </article>
        ))}
      </section>
    </main>
  );
}
