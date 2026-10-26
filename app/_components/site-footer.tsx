import type { Locale } from "../../lib/catalog";
import { CONTACT_EMAIL, GITHUB_URL, strings } from "../../lib/site";
import { ExternalLink } from "./external-link";

export function SiteFooter({ locale }: { locale: Locale }) {
  const text = strings[locale];
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>© 2026 WHAGO</p>
        <nav aria-label={text.footer.links}>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <ExternalLink href={GITHUB_URL} locale={locale}>
            GitHub
          </ExternalLink>
        </nav>
      </div>
    </footer>
  );
}
