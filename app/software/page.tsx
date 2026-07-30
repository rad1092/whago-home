import type { Metadata } from "next";
import { ProductCatalog } from "../_components/product-list";
import { products } from "../_data/products";

export const metadata: Metadata = {
  title: "제품",
  description: "WHAGO가 만들고 배포하는 소프트웨어 제품 목록입니다.",
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
      </header>

      <section
        className="catalog-section page-shell"
        aria-label="WHAGO 제품 비교"
      >
        <ProductCatalog items={products} />
      </section>
    </main>
  );
}
