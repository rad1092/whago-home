import type { Product } from "../_data/products";

export function ProductMark({
  product,
  priority = false,
  size = "regular",
}: {
  product: Product;
  priority?: boolean;
  size?: "regular" | "large";
}) {
  if (product.mark) {
    return (
      <img
        alt=""
        className={`product-mark product-mark--${size}`}
        height={512}
        loading={priority ? "eager" : "lazy"}
        src={product.mark}
        width={512}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`product-mark product-mark--repolens product-mark--${size}`}
    >
      <span>&gt;_</span>
    </span>
  );
}
