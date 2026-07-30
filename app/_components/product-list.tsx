import Link from "next/link";
import {
  getLatestRelease,
  type Product,
} from "../_data/products";

export function ProductShowcase({ items }: { items: readonly Product[] }) {
  return (
    <div className="product-showcase">
      {items.map((product) => (
        <article
          className={`product-card product-card--${product.slug}`}
          key={product.slug}
        >
          <Link href={`/software/${product.slug}`}>
            <div className="product-card__image">
              <img
                alt=""
                height={649}
                loading={product.index === "01" ? "eager" : "lazy"}
                src={product.screenshot}
                width={885}
              />
            </div>
            <div className="product-card__body">
              <div className="product-card__heading">
                <div>
                  <span>{product.category}</span>
                  <h2>{product.name}</h2>
                </div>
                <span aria-hidden="true">↗</span>
              </div>
              <p>{product.summary}</p>
              <span className="product-card__status">{product.status}</span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

export function ProductCatalog({ items }: { items: readonly Product[] }) {
  return (
    <div className="product-catalog">
      {items.map((product) => {
        const release = getLatestRelease(product.slug);

        return (
          <article
            className={`catalog-item catalog-item--${product.slug}`}
            key={product.slug}
          >
            <header>
              <span>{product.index}</span>
              <div>
                <p>{product.category}</p>
                <h2>
                  <Link href={`/software/${product.slug}`}>
                    {product.name}
                  </Link>
                </h2>
              </div>
            </header>
            <p className="catalog-item__summary">{product.summary}</p>
            <dl>
              <div>
                <dt>실행</dt>
                <dd>{product.runtime}</dd>
              </div>
              <div>
                <dt>데이터</dt>
                <dd>{product.dataLocation}</dd>
              </div>
              <div>
                <dt>버전</dt>
                <dd>{release ? `v${release.version}` : "—"}</dd>
              </div>
            </dl>
            <Link
              className="catalog-item__link"
              href={`/software/${product.slug}`}
            >
              제품 보기 <span aria-hidden="true">→</span>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
