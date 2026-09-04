import type { Metadata } from "next";
import { ProductCatalog } from "../_components/product-list";
import { products } from "../_data/products";

export const metadata: Metadata = {
  title: "소프트웨어",
  description: "FirstCall과 공개 CLI 도구의 실행 방식과 지원 범위를 확인합니다.",
  alternates: {
    canonical: "/software",
  },
};

export const dynamic = "force-static";

export default function SoftwarePage() {
  return (
    <main id="main">
      <header className="page-intro page-shell">
        <h1>소프트웨어</h1>
        <p>API를 AI 도구로 연결하는 FirstCall과, 좁은 개발 작업을 돕는 공개 CLI 도구입니다.</p>
      </header>

      <section className="catalog-section page-shell" aria-label="WHAGO 제품 비교">
        <ProductCatalog items={products} />
      </section>
    </main>
  );
}
