import type { Metadata } from "next";
import { products } from "../_data/products";

export const metadata: Metadata = {
  title: "지원",
  description: "WHAGO 제품의 문서, 문제 접수, 소스 저장소를 찾습니다.",
  alternates: {
    canonical: "/support",
  },
};

export const dynamic = "force-static";

export default function SupportPage() {
  return (
    <main id="main">
      <header className="page-intro page-shell">
        <p className="kicker">Support</p>
        <h1>지원</h1>
        <p>
          제품 사용법은 제품 페이지에서 확인하고, 재현 가능한 문제는 해당
          저장소의 Issues에 남길 수 있습니다.
        </p>
      </header>

      <section className="support-list page-shell" aria-label="제품별 지원">
        {products.map((product) => (
          <article key={product.slug}>
            <div>
              <span>{product.index}</span>
              <h2>{product.name}</h2>
              <p>{product.status}</p>
            </div>
            <nav aria-label={`${product.name} 지원 링크`}>
              <a href={product.productUrl} rel="noreferrer" target="_blank">
                제품과 문서 ↗
                <span className="sr-only">(새 탭에서 열림)</span>
              </a>
              <a
                href={`${product.source}/issues`}
                rel="noreferrer"
                target="_blank"
              >
                문제 접수 ↗
                <span className="sr-only">(새 탭에서 열림)</span>
              </a>
              <a href={product.source} rel="noreferrer" target="_blank">
                소스 ↗<span className="sr-only">(새 탭에서 열림)</span>
              </a>
              <a
                href={`${product.source}/releases`}
                rel="noreferrer"
                target="_blank"
              >
                모든 릴리스 ↗
                <span className="sr-only">(새 탭에서 열림)</span>
              </a>
            </nav>
          </article>
        ))}
      </section>
    </main>
  );
}

