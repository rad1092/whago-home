import Link from "next/link";
import type { Locale, Product } from "../../lib/catalog";
import { localePath, strings } from "../../lib/site";
import { ProductIcon } from "./product-icon";

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const copy = product[locale];
  const runsOn = copy.specs[0][1].split(", ");
  return (
    <article className="product-card">
      <div className="product-card__head">
        <ProductIcon slug={product.slug} />
        <p className="product-card__type">{copy.type}</p>
      </div>
      <h3>{product.name}</h3>
      <p>{copy.summary}</p>
      <ul aria-label={copy.specs[0][0]} className="chips">
        {runsOn.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link
        aria-label={`${product.name}: ${strings[locale].details}`}
        className="product-card__link"
        href={localePath(locale, `/software/${product.slug}`)}
      >
        {strings[locale].details}
      </Link>
    </article>
  );
}
