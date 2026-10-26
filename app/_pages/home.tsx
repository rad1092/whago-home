import Link from "next/link";
import type { Locale } from "../../lib/catalog";
import { getProduct, productsIn, repoUrl } from "../../lib/catalog";
import { localePath, pageMetadata, strings } from "../../lib/site";
import { DownloadBox } from "../_components/download-box";
import { ExternalLink } from "../_components/external-link";
import { ProductCard } from "../_components/product-card";

export function homeMetadata(locale: Locale) {
  return pageMetadata({ locale, path: "/", description: strings[locale].home.description });
}

export function HomePage({ locale }: { locale: Locale }) {
  const text = strings[locale];
  const firstcall = getProduct("firstcall")!;
  const copy = firstcall[locale];
  const media = firstcall.media!;

  return (
    <main id="main">
      <header className="home-intro page-shell">
        <h1>{text.home.title}</h1>
      </header>

      <section aria-labelledby="firstcall-title" className="featured page-shell">
        <div className="featured__copy">
          <p className="product-card__type">{copy.type}</p>
          <h2 id="firstcall-title">FirstCall</h2>
          <p className="featured__summary">{copy.summary}</p>
          <p>{copy.description}</p>
          <DownloadBox locale={locale} product={firstcall} />
          <p className="featured__more">
            <Link href={localePath(locale, "/software/firstcall")}>{text.details}</Link>
            <ExternalLink href={repoUrl(firstcall)} locale={locale}>
              {text.product.source}
            </ExternalLink>
          </p>
        </div>
        <figure className="featured__media">
          <img alt={media.alt[locale]} height={media.height} src={media.src} width={media.width} />
        </figure>
      </section>

      {(["developer", "desktop"] as const).map((group) => (
        <section aria-labelledby={`${group}-title`} className="shelf page-shell" key={group}>
          <header className="shelf__head">
            <h2 id={`${group}-title`}>{text.groups[group]}</h2>
            <Link href={localePath(locale, "/software")}>{text.home.all}</Link>
          </header>
          <div className="card-grid">
            {productsIn(group).map((product) => (
              <ProductCard key={product.slug} locale={locale} product={product} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
