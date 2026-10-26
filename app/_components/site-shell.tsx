import type { Locale } from "../../lib/catalog";
import { strings } from "../../lib/site";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <body>
      <a className="skip-link" href="#main">
        {strings[locale].skip}
      </a>
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} />
    </body>
  );
}
