import type { Locale } from "../../lib/catalog";
import { strings } from "../../lib/site";

export function ExternalLink({
  href,
  locale,
  children,
  className,
}: {
  href: string;
  locale: Locale;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} rel="noreferrer" target="_blank">
      {children}
      <svg aria-hidden="true" className="external-icon" viewBox="0 0 12 12" width="11" height="11">
        <path d="M4.5 2.5h5v5M9.5 2.5 3 9" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span className="sr-only">{strings[locale].newTab}</span>
    </a>
  );
}
