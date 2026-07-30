import type { Metadata } from "next";
import { ProductCatalog } from "../_components/product-list";
import { products } from "../_data/products";

export const metadata: Metadata = {
  title: "제품",
  description: "WHAGO 제품의 용도, 실행 방식과 데이터 위치를 비교합니다.",
  alternates: {
    canonical: "/software",
  },
};

export const dynamic = "force-static";

export default function SoftwarePage() {
  return (
    <main id="main">
      <header className="page-intro page-shell">
        <h1>제품</h1>
        <p>용도, 실행 방식과 데이터 위치를 한곳에서 확인합니다.</p>
      </header>

      <section className="catalog-section page-shell" aria-label="WHAGO 제품 비교">
        <ProductCatalog items={products} />
      </section>
    </main>
  );
}
