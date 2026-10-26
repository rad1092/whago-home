import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale, Product } from "../../lib/catalog";
import { getProduct, latestRelease, products, repoUrl, withVersion } from "../../lib/catalog";
import { CONTACT_EMAIL, localePath, pageMetadata, strings } from "../../lib/site";
import { DownloadBox } from "../_components/download-box";
import { ExternalLink } from "../_components/external-link";
import { ProductIcon } from "../_components/product-icon";

export function productParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function productMetadata(locale: Locale, slug: string) {
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    locale,
    path: `/software/${slug}`,
    title: product.name,
    description: product[locale].summary,
    image: { url: `/og/${slug}.png`, width: 1200, height: 630 },
  });
}

function terminalSample(product: Product) {
  if (!product.terminal) return null;
  return fs.readFileSync(path.join(process.cwd(), "content", "terminal", `${product.terminal}.txt`), "utf8").trimEnd();
}

export function ProductPage({ locale, slug }: { locale: Locale; slug: string }) {
  const product = getProduct(slug);
  if (!product) notFound();

  const text = strings[locale];
  const copy = product[locale];
  const release = latestRelease(product.slug);
  const version = release?.version ?? "";
  const sample = terminalSample(product);

  return (
    <main className="product-page" id="main">
      <header className="product-hero page-shell">
        <nav aria-label={text.product.breadcrumb} className="breadcrumbs">
          <Link href={localePath(locale, "/software")}>{text.product.breadcrumb}</Link>
        </nav>
        <div className="product-hero__name">
          <ProductIcon size={40} slug={product.slug} />
          <div>
            <p className="product-card__type">{copy.type}</p>
            <h1>{product.name}</h1>
          </div>
        </div>
        <p className="product-hero__summary">{copy.summary}</p>
        {product.group === "lab" ? <p className="lab-badge">{text.labNote}</p> : null}
      </header>

      {product.media ? (
        <figure className="product-media page-shell">
          <img
            alt={product.media.alt[locale]}
            height={product.media.height}
            src={product.media.src}
            width={product.media.width}
          />
        </figure>
      ) : sample ? (
        <figure className="product-media page-shell">
          <pre className="terminal" tabIndex={0}>
            <code>{sample}</code>
          </pre>
          <figcaption>{text.product.sampleOutput}</figcaption>
        </figure>
      ) : null}

      <section aria-label={text.product.download} className="product-get page-shell">
        <DownloadBox locale={locale} product={product} />
        <dl className="spec-table">
          {copy.specs.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          <div>
            <dt>{text.product.license}</dt>
            <dd>{product.license}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="about-title" className="product-section page-shell">
        <h2 id="about-title">{text.product.whatItDoes}</h2>
        <p className="product-section__lead">{copy.description}</p>
      </section>

      <section aria-labelledby="steps-title" className="product-section page-shell">
        <h2 id="steps-title">{text.product.howItWorks}</h2>
        <ol className="steps">
          {copy.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="install" className="product-section page-shell">
        <h2 id="install">{text.product.install}</h2>
        <ol className="steps steps--compact">
          {copy.install.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        {copy.commands ? (
          <pre className="terminal terminal--commands" tabIndex={0}>
            <code>{copy.commands.map((command) => withVersion(command, version)).join("\n")}</code>
          </pre>
        ) : null}
      </section>

      {copy.example ? (
        <section aria-labelledby="example-title" className="product-section page-shell">
          <h2 id="example-title">{text.product.tryIt}</h2>
          <p>{copy.example.text}</p>
          <ExternalLink href={copy.example.href} locale={locale}>
            {copy.example.label}
          </ExternalLink>
        </section>
      ) : null}

      <section className="product-section page-shell">
        <details className="limits">
          <summary>
            <h2>{text.product.limits}</h2>
          </summary>
          <ul>
            {copy.limits.map((limit) => (
              <li key={limit}>{limit}</li>
            ))}
          </ul>
        </details>
      </section>

      <section aria-labelledby="links-title" className="product-section page-shell">
        <h2 id="links-title">{text.product.links}</h2>
        <ul className="link-list">
          <li>
            <ExternalLink href={copy.docs} locale={locale}>
              {text.product.docs}
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={repoUrl(product)} locale={locale}>
              {text.product.source}
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={`${repoUrl(product)}/issues/new`} locale={locale}>
              {text.product.issues}
            </ExternalLink>
            {product.email ? (
              <>
                {" "}
                <span className="muted">{locale === "ko" ? "또는" : "or"}</span>{" "}
                <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(product.name)}`}>{CONTACT_EMAIL}</a>
              </>
            ) : null}
          </li>
        </ul>
      </section>
    </main>
  );
}
