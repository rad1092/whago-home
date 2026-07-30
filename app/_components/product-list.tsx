import Link from "next/link";
import type { Product } from "../_data/products";

export function ProductList({
  items,
  headingLevel = "h2",
}: {
  items: readonly Product[];
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <div className="product-index">
      {items.map((product) => (
        <Link
          className={`product-index__item product-index__item--${product.slug}`}
          href={`/software/${product.slug}`}
          key={product.slug}
        >
          <span className="product-index__number">{product.index}</span>
          <div className="product-index__name">
            <Heading>{product.name}</Heading>
            <span>{product.category}</span>
          </div>
          <p>{product.summary}</p>
          <span className="product-index__status">{product.status}</span>
          <span className="product-index__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}

