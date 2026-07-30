import type { Metadata } from "next";
import Link from "next/link";
import { products } from "../_data/products";

export const metadata: Metadata = {
  title: "하우스",
  description: "WHAGO의 제품 운영 및 배포 원칙입니다.",
  alternates: {
    canonical: "/house",
  },
};

export const dynamic = "force-static";

const principles = [
  {
    number: "01",
    title: "제품별 저장소",
    body: "코드, 이슈, 버전, 설치 산출물을 제품별로 관리합니다.",
  },
  {
    number: "02",
    title: "실행 형태 명시",
    body: "웹 데모, 설치 프로그램, CLI, 자동화를 같은 배포 형태로 표시하지 않습니다.",
  },
  {
    number: "03",
    title: "데이터 위치 공개",
    body: "브라우저, 로컬 파일, 앱 데이터, 외부 서비스 중 어디에 저장하는지 제품 페이지에 적습니다.",
  },
  {
    number: "04",
    title: "확장 가능한 카탈로그",
    body: "새 제품은 기존 홈페이지를 다시 짜지 않고 카탈로그와 릴리스 목록에 추가합니다.",
  },
] as const;

export default function HousePage() {
  return (
    <main id="main">
      <header className="page-intro page-shell">
        <p className="kicker">House</p>
        <h1>WHAGO</h1>
        <p>
          서울에서 독립적으로 소프트웨어를 만들고 공개합니다. 현재 세
          제품을 운영하며 새 제품을 계속 추가합니다.
        </p>
      </header>

      <section className="principles page-shell" aria-labelledby="principles-title">
        <div className="section-heading">
          <div>
            <p className="kicker">Operating rules</p>
            <h2 id="principles-title">운영 원칙</h2>
          </div>
        </div>
        <div className="principles__grid">
          {principles.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="house-products page-shell">
        <div>
          <p className="kicker">Current catalog</p>
          <h2>{products.length}개 제품</h2>
        </div>
        <ol>
          {products.map((product) => (
            <li key={product.slug}>
              <Link href={`/software/${product.slug}`}>
                <span>{product.index}</span>
                <strong>{product.name}</strong>
                <span>{product.status}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

