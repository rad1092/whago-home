import type { Metadata } from "next";
import Link from "next/link";
import { products } from "../_data/products";

export const metadata: Metadata = {
  title: "소개",
  description:
    "울산에서 웹, 데스크톱과 CLI 소프트웨어를 직접 만들고 운영하는 독립 소프트웨어 하우스 WHAGO입니다.",
  alternates: {
    canonical: "/house",
  },
};

export const dynamic = "force-static";

const contactEmail = "rad174951@gmail.com";

export default function HousePage() {
  return (
    <main id="main">
      <header className="house-hero page-shell">
        <div className="house-hero__eyebrow">
          <p>WHAGO · INDEPENDENT SOFTWARE HOUSE</p>
          <p>ULSAN, KR</p>
        </div>
        <div className="house-hero__body">
          <h1>울산에서 소프트웨어를 만들고 운영합니다.</h1>
          <div className="house-hero__copy">
            <p>
              웹, 데스크톱과 CLI 도구를 직접 설계하고 배포합니다. 현재{" "}
              {products.length}개 제품을 공개하고 있으며, 새 제품은 준비되는
              대로 같은 카탈로그에 추가합니다.
            </p>
            <nav className="house-hero__actions" aria-label="WHAGO 주요 링크">
              <Link href="/software">
                <span>제품 보기</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a href={`mailto:${contactEmail}`}>
                <span>이메일 보내기</span>
                <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section className="house-facts" aria-label="WHAGO 한눈에 보기">
        <dl className="house-facts__inner page-shell">
          <div>
            <dt>기반</dt>
            <dd>울산, 대한민국</dd>
          </div>
          <div>
            <dt>공개 제품</dt>
            <dd>
              <strong>{products.length}</strong>
              <span> products</span>
            </dd>
          </div>
          <div>
            <dt>제공 형태</dt>
            <dd>데스크톱 · 웹 · CLI</dd>
          </div>
          <div>
            <dt>공개 범위</dt>
            <dd>소스 · 릴리스 · 이슈</dd>
          </div>
        </dl>
      </section>

      <section
        className="house-directory page-shell"
        aria-labelledby="house-products-title"
      >
        <header className="house-section-heading">
          <div>
            <p>PRODUCTS</p>
            <h2 id="house-products-title">현재 제품</h2>
          </div>
          <p>
            각 제품은 용도와 실행 형태를 분리해 운영합니다. 새 제품도
            준비되는 대로 이 목록에 추가합니다.
          </p>
        </header>

        <div className="house-directory__head" aria-hidden="true">
          <span>번호</span>
          <span>제품</span>
          <span>용도</span>
          <span>제공 형태</span>
          <span>열기</span>
        </div>
        <ol className="house-directory__list">
          {products.map((product, index) => (
            <li key={product.slug}>
              <Link href={`/software/${product.slug}`}>
                <span className="house-directory__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="house-directory__identity">
                  <strong>{product.name}</strong>
                  <span>{product.typeLabel}</span>
                </span>
                <span className="house-directory__purpose">
                  {product.purpose}
                </span>
                <span className="house-directory__offering">
                  {product.offering}
                </span>
                <span className="house-directory__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="house-directory__footer">
          <Link href="/software">제품 비교 →</Link>
        </div>
      </section>

      <section
        className="house-contact page-shell"
        aria-labelledby="house-contact-title"
      >
        <header>
          <p>CONTACT</p>
          <h2 id="house-contact-title">연락</h2>
        </header>
        <div className="house-contact__body">
          <p>
            제품별 사용법과 오류 신고 경로는 지원 페이지에 정리해
            두었습니다. 그 밖의 문의는 이메일로 보내주세요.
          </p>
          <a className="house-contact__email" href={`mailto:${contactEmail}`}>
            <span>{contactEmail}</span>
            <span>이메일 보내기 ↗</span>
          </a>
          <nav aria-label="WHAGO 공개와 지원">
            <Link href="/support">지원 →</Link>
            <a
              href="https://github.com/rad1092"
              rel="noreferrer"
              target="_blank"
            >
              GitHub ↗<span className="sr-only">(새 탭에서 열림)</span>
            </a>
          </nav>
        </div>
      </section>
    </main>
  );
}
