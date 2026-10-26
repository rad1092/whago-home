"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "../../lib/catalog";
import { localePath, strings } from "../../lib/site";

function stripLocale(pathname: string) {
  if (pathname === "/ko") return "/";
  return pathname.startsWith("/ko/") ? pathname.slice(3) : pathname;
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const path = stripLocale(pathname);
  const text = strings[locale];
  const other: Locale = locale === "en" ? "ko" : "en";
  const links = [
    { path: "/software", label: text.nav.software },
    { path: "/releases", label: text.nav.updates },
    { path: "/support", label: text.nav.support },
    { path: "/house", label: text.nav.about },
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link aria-label={text.homeLabel} className="wordmark" href={localePath(locale, "/")}>
          WHAGO
        </Link>
        <nav aria-label={text.navLabel}>
          {links.map((link) => {
            const current = path === link.path || (link.path === "/software" && path.startsWith("/software/"));
            return (
              <Link aria-current={current ? "page" : undefined} href={localePath(locale, link.path)} key={link.path}>
                {link.label}
              </Link>
            );
          })}
          <Link
            aria-label={text.switchLabel}
            className="language-link"
            href={localePath(other, path)}
            hrefLang={other}
            lang={other}
          >
            {text.switchTo}
          </Link>
        </nav>
      </div>
    </header>
  );
}
