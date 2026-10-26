import type { Locale, Product } from "../../lib/catalog";
import { downloadLinks, formatDate, latestRelease, releasePageUrl } from "../../lib/catalog";
import { strings } from "../../lib/site";
import { DownloadButton } from "./download-button";
import { ExternalLink } from "./external-link";

export function DownloadBox({ product, locale }: { product: Product; locale: Locale }) {
  const text = strings[locale];
  const release = latestRelease(product.slug);
  const links = downloadLinks(product);
  const platformNames = links.filter((link) => link.platform !== "any").map((link) => text.platforms[link.platform]);
  const releaseUrl = release?.version ? releasePageUrl(product, release.version) : undefined;
  const single = links.length === 1 ? links[0] : undefined;

  let primary: { href: string; label: string; external: boolean };
  if (product.play) {
    primary = { href: product.play, label: text.product.play, external: true };
  } else if (!links.length || product.slug === "repolens") {
    primary = { href: "#install", label: text.product.install, external: false };
  } else if (single) {
    primary = { href: single.href, label: text.product.download, external: false };
  } else {
    primary = { href: releaseUrl ?? "#install", label: text.product.download, external: false };
  }
  const osAware = !product.play && primary.href !== "#install" && links.some((link) => link.platform !== "any");

  return (
    <div className="download-box">
      {osAware ? (
        <DownloadButton
          href={primary.href}
          label={primary.label}
          options={links.map((link) => ({
            platform: link.platform,
            href: link.href,
            label: text.product.downloadFor(text.platforms[link.platform]),
          }))}
          unavailable={locale === "ko" ? "이 OS용 파일은 아직 없습니다." : "There is no build for your system yet."}
        />
      ) : (
        <a className="button" href={primary.href}>
          {primary.label}
        </a>
      )}
      {platformNames.length ? <p className="download-box__platforms">{platformNames.join(", ")}</p> : null}
      {release?.version ? (
        <p className="download-box__meta">
          v{release.version}
          {release.prerelease ? ` ${text.product.preview}` : ""}, {formatDate(release.date, locale)}
        </p>
      ) : null}
      {links.length > 1 || (product.play && links.length) ? (
        <details className="download-box__more">
          <summary>{text.product.otherDownloads}</summary>
          <ul>
            {links.map((link) => (
              <li key={link.platform}>
                <a href={link.href}>{link.file}</a>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
      {releaseUrl ? (
        <ExternalLink className="download-box__all" href={releaseUrl} locale={locale}>
          {text.product.releasePage}
        </ExternalLink>
      ) : null}
    </div>
  );
}
