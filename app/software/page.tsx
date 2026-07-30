import type { Metadata } from "next";
import { ProductList } from "../_components/product-list";
import { products } from "../_data/products";

export const metadata: Metadata = {
  title: "소프트웨어",
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
        <p className="kicker">Software</p>
        <h1>소프트웨어</h1>
        <p>
          각 제품의 실행 방식, 저장 위치, 현재 배포 형태를 구분해
          표시합니다.
        </p>
      </header>

      <section className="section page-shell" aria-label="WHAGO 소프트웨어 목록">
        <ProductList items={products} />
      </section>

      <section className="catalog-note page-shell">
        <span>다음 제품</span>
        <p>
          카탈로그는 세 제품으로 고정되어 있지 않습니다. 새 제품은 독립
          저장소와 릴리스 경로가 준비된 뒤 이 목록에 추가합니다.
        </p>
      </section>
    </main>
  );
}

