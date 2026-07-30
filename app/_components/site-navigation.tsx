"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/software", label: "제품" },
  { href: "/releases", label: "업데이트" },
  { href: "/support", label: "지원" },
  { href: "/house", label: "소개" },
] as const;

export function SiteNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="주요 메뉴">
      {links.map((link) => {
        const isCurrent =
          pathname === link.href ||
          (link.href === "/software" && pathname.startsWith("/software/"));

        return (
          <Link
            aria-current={isCurrent ? "page" : undefined}
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
