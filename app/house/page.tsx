import type { Metadata } from "next";
import Link from "next/link";
import { products } from "../_data/products";

export const metadata: Metadata = {
  title: "소개",
  description: "WHAGO가 만드는 소프트웨어와 개발 기록을 소개합니다.",
  alternates: {
    canonical: "/house",
  },
};

export const dynamic = "force-static";

export default function HousePage() {
  return (
    <main id="main">
      <header className="page-intro page-shell">
        <h1>소개</h1>
      </header>

      <section className="house-profile page-shell" aria-labelledby="house-name">
        <div className="house-profile__lead">
          <h2 id="house-name">WHAGO</h2>
          <p>
            서울에서 소프트웨어를 개발합니다. 제품별 소스와 이슈는
            GitHub에서 공개합니다.
          </p>
        </div>
        <dl>
          <div>
            <dt>제품</dt>
            <dd>
              {products.map((product, index) => (
                <span key={product.slug}>
                  {index > 0 ? " · " : ""}
                  <Link href={`/software/${product.slug}`}>
                    {product.name}
                  </Link>
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt>기반</dt>
            <dd>서울</dd>
          </div>
          <div>
            <dt>개발 기록</dt>
            <dd>
              <a
                href="https://github.com/rad1092"
                rel="noreferrer"
                target="_blank"
              >
                github.com/rad1092 ↗
                <span className="sr-only">(새 탭에서 열림)</span>
              </a>
            </dd>
          </div>
          <div>
            <dt>문의</dt>
            <dd>
              <Link href="/support">제품별 지원 링크 보기 →</Link>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
