import Link from "next/link";
import {
  getLatestRelease,
  type Product,
} from "../_data/products";
import { ProductMark } from "./product-mark";

function ExternalMark() {
  return (
    <>
      <span aria-hidden="true">↗</span>
      <span className="sr-only">(새 탭에서 열림)</span>
    </>
  );
}

export function ProductIndex({ items }: { items: readonly Product[] }) {
  return (
    <ol className="product-index">
      {items.map((product, index) => {
        const release = getLatestRelease(product.slug);

        return (
          <li className={`product-row product-row--${product.slug}`} key={product.slug}>
            <div className="product-row__identity">
              <ProductMark product={product} priority={index === 0} />
              <div>
                <p>{product.typeLabel}</p>
                <h2>
                  <Link href={`/software/${product.slug}`}>{product.name}</Link>
                </h2>
              </div>
            </div>
            <p className="product-row__purpose">{product.purpose}</p>
            <p className="product-row__offering">{product.offering}</p>
            <p className="product-row__version">
              {release ? `v${release.version}` : "—"}
            </p>
            <Link
              className="product-row__media"
              href={`/software/${product.slug}`}
              aria-label={`${product.name} 제품 정보`}
            >
              <img
                alt=""
                height={product.media.height}
                loading={index === 0 ? "eager" : "lazy"}
                src={product.media.src}
                style={{ objectPosition: product.media.objectPosition }}
                width={product.media.width}
              />
            </Link>
            <div className="product-row__actions">
              <a
                href={product.primaryAction.href}
                rel="noreferrer"
                target="_blank"
              >
                {product.primaryAction.label} <ExternalMark />
              </a>
              <Link href={`/software/${product.slug}`}>제품 정보 →</Link>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function ProductCatalog({ items }: { items: readonly Product[] }) {
  return (
    <div className="product-catalog">
      <div className="product-catalog__head" aria-hidden="true">
        <span>제품</span>
        <span>용도</span>
        <span>제공 형태</span>
        <span>데이터</span>
        <span>바로가기</span>
      </div>
      {items.map((product) => (
        <article className="catalog-row" key={product.slug}>
          <div className="catalog-row__name">
            <h2>
              <Link href={`/software/${product.slug}`}>{product.name}</Link>
            </h2>
            <span>{product.typeLabel}</span>
          </div>
          <p>{product.purpose}</p>
          <p>{product.runtime}</p>
          <p>{product.dataLocation}</p>
          <nav aria-label={`${product.name} 바로가기`}>
            <a
              href={product.primaryAction.href}
              rel="noreferrer"
              target="_blank"
            >
              {product.primaryAction.label} <ExternalMark />
            </a>
            <Link href={`/software/${product.slug}`}>제품 정보 →</Link>
          </nav>
        </article>
      ))}
    </div>
  );
}
