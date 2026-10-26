"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "../../lib/catalog";
import { LANGUAGE_KEY, localePath, strings } from "../../lib/site";

function stripLocale(pathname: string) {
  if (pathname === "/ko") return "/";
  return pathname.startsWith("/ko/") ? pathname.slice(3) : pathname;
}

// Remember an explicit choice so the language detection in the page head follows it.
function remember(locale: Locale) {
  try {
    localStorage.setItem(LANGUAGE_KEY, locale);
  } catch {
    // Storage can be unavailable (private mode); the link still switches the page.
  }
}

const languages: { locale: Locale; label: string }[] = [
  { locale: "en", label: "EN" },
  { locale: "ko", label: "한국어" },
];

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const path = stripLocale(pathname);
  const text = strings[locale];
  const links = [
    { path: "/software", label: text.nav.software },
    { path: "/support", label: text.nav.support },
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
          <span aria-label={text.languageLabel} className="language-switch" role="group">
            {languages.map((language) => (
              <a
                aria-current={language.locale === locale ? "true" : undefined}
                href={localePath(language.locale, path)}
                hrefLang={language.locale}
                key={language.locale}
                lang={language.locale}
                onClick={() => remember(language.locale)}
              >
                {language.label}
              </a>
            ))}
          </span>
        </nav>
      </div>
    </header>
  );
}
