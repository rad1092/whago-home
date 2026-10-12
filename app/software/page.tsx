import type { Metadata } from "next";
import { ProductCatalog } from "../_components/product-list";
import { products } from "../_data/products";

export const metadata: Metadata = {
  title: "소프트웨어",
  description: "문서·파일·작업 계획과 개발 검토를 돕는 WHAGO 도구의 실행 방식과 지원 범위를 확인합니다.",
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
        <p>API 연결, PDF 검토, 파일 점검, 작업 계획, 개발 테스트와 홈브루 디버깅을 위한 도구입니다. 각 제품의 대상과 실행 방식, 설치 경로를 비교하세요.</p>
      </header>

      <section className="catalog-section page-shell" aria-label="WHAGO 제품 비교">
        <ProductCatalog items={products} />
      </section>
    </main>
  );
}
