import type { Locale } from "../../lib/catalog";
import { products, repoUrl } from "../../lib/catalog";
import { CONTACT_EMAIL, pageMetadata, strings } from "../../lib/site";
import { ExternalLink } from "../_components/external-link";

export function supportMetadata(locale: Locale) {
  const text = strings[locale].support;
  return pageMetadata({ locale, path: "/support", title: text.title, description: text.description });
}

export function SupportPage({ locale }: { locale: Locale }) {
  const text = strings[locale].support;
  return (
    <main id="main">
      <header className="page-intro page-shell">
        <h1>{text.title}</h1>
        <p>
          {text.intro} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </header>
      <div className="page-shell table-wrap">
        <table className="support-table">
          <thead>
            <tr>
              <th scope="col">{text.product}</th>
              <th scope="col">{text.docs}</th>
              <th scope="col">{text.report}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug}>
                <th scope="row">{product.name}</th>
                <td>
                  <ExternalLink href={product[locale].docs} locale={locale}>
                    {text.docs}
                  </ExternalLink>
                </td>
                <td>
                  <ExternalLink href={`${repoUrl(product)}/issues/new`} locale={locale}>
                    {text.issue}
                  </ExternalLink>
                  {product.email ? (
                    <>
                      {locale === "ko" ? " 또는 " : " or "}
                      <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(product.name)}`}>{text.email}</a>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
