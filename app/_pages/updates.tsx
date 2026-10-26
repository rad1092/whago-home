import Link from "next/link";
import type { Locale } from "../../lib/catalog";
import { formatDate, getProduct, productName, releasePageUrl, releases } from "../../lib/catalog";
import { localePath, pageMetadata, strings } from "../../lib/site";
import { ExternalLink } from "../_components/external-link";

export function updatesMetadata(locale: Locale) {
  const text = strings[locale].updates;
  return pageMetadata({ locale, path: "/releases", title: text.title, description: text.description });
}

export function UpdatesPage({ locale }: { locale: Locale }) {
  const text = strings[locale];
  return (
    <main id="main">
      <header className="page-intro page-shell">
        <h1>{text.updates.title}</h1>
      </header>
      <ol className="ledger page-shell">
        {releases.map((release) => {
          const product = getProduct(release.product);
          const name = productName(release.product);
          return (
            <li key={`${release.product}-${release.version ?? release.date}`}>
              <time dateTime={release.date}>{formatDate(release.date, locale)}</time>
              <p className="ledger__product">
                {product ? <Link href={localePath(locale, `/software/${product.slug}`)}>{name}</Link> : name}
                <span>
                  {release.version
                    ? `${release.version}${release.prerelease ? ` ${text.product.preview}` : ""}`
                    : text.updates.ended}
                </span>
              </p>
              <p className="ledger__note">{release[locale]}</p>
              <p className="ledger__link">
                {product && release.version ? (
                  <ExternalLink href={releasePageUrl(product, release.version)} locale={locale}>
                    {text.updates.notes}
                  </ExternalLink>
                ) : (
                  <Link href={localePath(locale, "/archive")}>{text.updates.archive}</Link>
                )}
              </p>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
