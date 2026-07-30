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
        <h1>지원</h1>
        <p>사용법과 오류 신고 링크입니다.</p>
      </header>

      <section className="support-list page-shell" aria-label="제품별 지원">
        {products.map((product) => {
          const primaryLink = product.links.find((link) => link.primary);

          return (
            <article key={product.slug}>
              <div>
                <span>{product.index}</span>
                <h2>{product.name}</h2>
              </div>
              <nav aria-label={`${product.name} 지원 링크`}>
                {primaryLink ? (
                  <a
                    href={primaryLink.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {primaryLink.label} ↗
                    <span className="sr-only">(새 탭에서 열림)</span>
                  </a>
                ) : null}
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
          );
        })}
      </section>
    </main>
  );
}
