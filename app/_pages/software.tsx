import Link from "next/link";
import type { Locale, Product } from "../../lib/catalog";
import { latestRelease, products } from "../../lib/catalog";
import { localePath, pageMetadata, strings } from "../../lib/site";
import { ProductIcon } from "../_components/product-icon";

export function softwareMetadata(locale: Locale) {
  const text = strings[locale].software;
  return pageMetadata({ locale, path: "/software", title: text.title, description: text.description });
}

function CatalogRow({ product, locale }: { product: Product; locale: Locale }) {
  const text = strings[locale];
  const copy = product[locale];
  const release = latestRelease(product.slug);
  return (
    <article className="catalog-row">
      <div className="catalog-row__name">
        <ProductIcon slug={product.slug} />
        <div>
          <h3>
            <Link href={localePath(locale, `/software/${product.slug}`)}>{product.name}</Link>
          </h3>
          <p>{copy.type}</p>
        </div>
      </div>
      <p className="catalog-row__summary">{copy.summary}</p>
      <dl className="catalog-row__facts">
        <div>
          <dt>{text.software.runsOn}</dt>
          <dd>{copy.specs[0][1]}</dd>
        </div>
        {release?.version ? (
          <div>
            <dt>{text.software.version}</dt>
            <dd>
              {release.version}
              {release.prerelease ? ` ${text.product.preview}` : ""}
            </dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}

export function SoftwarePage({ locale }: { locale: Locale }) {
  const text = strings[locale];
  const sections = [
    {
      id: "developer",
      title: text.groups.developer,
      items: products.filter((p) => p.group === "featured" || p.group === "developer"),
    },
    { id: "desktop", title: text.groups.desktop, items: products.filter((p) => p.group === "desktop") },
    { id: "lab", title: text.groups.lab, items: products.filter((p) => p.group === "lab") },
  ];

  return (
    <main id="main">
      <header className="page-intro page-shell">
        <h1>{text.software.title}</h1>
      </header>
      {sections.map((section) => (
        <section aria-labelledby={`${section.id}-title`} className="catalog page-shell" key={section.id}>
          <h2 id={`${section.id}-title`}>{section.title}</h2>
          {section.id === "lab" ? <p className="catalog__note">{text.labNote}</p> : null}
          {section.items.map((product) => (
            <CatalogRow key={product.slug} locale={locale} product={product} />
          ))}
        </section>
      ))}
    </main>
  );
}
