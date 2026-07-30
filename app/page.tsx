import Link from "next/link";
import { ProductList } from "./_components/product-list";
import { products } from "./_data/products";

export const dynamic = "force-static";

export default function Home() {
  return (
    <main id="main">
      <section className="home-intro page-shell">
        <p className="kicker">Independent software house · Seoul</p>
        <h1>WHAGO는 소프트웨어를 만들고 배포합니다.</h1>
        <p className="home-intro__summary">
          Daymark, RepoLens, Siteboard를 각각 독립된 제품으로 운영합니다.
          새 제품도 같은 카탈로그와 릴리스 체계에 추가합니다.
        </p>
        <div className="button-row">
          <Link className="button button--primary" href="/software">
            소프트웨어 보기
          </Link>
          <Link className="button" href="/releases">
            릴리스 보기
          </Link>
        </div>
      </section>

      <section className="section page-shell" aria-labelledby="current-software">
        <div className="section-heading">
          <div>
            <p className="kicker">Software</p>
            <h2 id="current-software">현재 제품</h2>
          </div>
          <Link className="text-link" href="/software">
            전체 카탈로그 →
          </Link>
        </div>
        <ProductList items={products} />
      </section>

      <section className="home-release page-shell" aria-labelledby="latest-release">
        <div>
          <p className="kicker">Latest release</p>
          <h2 id="latest-release">2026.07.29</h2>
        </div>
        <div className="home-release__list">
          {products.map((product) => (
            <Link href={`/software/${product.slug}`} key={product.slug}>
              <span>{product.name}</span>
              <strong>v{product.version}</strong>
              <span>{product.releaseTitle}</span>
            </Link>
          ))}
        </div>
        <Link className="text-link" href="/releases">
          변경 내용 전체 보기 →
        </Link>
      </section>

      <section className="house-summary page-shell">
        <p className="kicker">House</p>
        <div>
          <h2>제품마다 실행 방식과 배포 경계를 분리합니다.</h2>
          <p>
            웹 데모, 설치 프로그램, CLI, GitHub Action을 같은 것으로
            부르지 않습니다. 현재 제공되는 형태와 개발 중인 형태를 제품별로
            표시합니다.
          </p>
          <Link className="text-link" href="/house">
            운영 방식 보기 →
          </Link>
        </div>
      </section>
    </main>
  );
}
