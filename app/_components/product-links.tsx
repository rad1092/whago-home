import type { ProductLink } from "../_data/products";

const externalLabel = <span className="sr-only">(새 탭에서 열림)</span>;

export function ProductLinks({ links }: { links: readonly ProductLink[] }) {
  return (
    <div className="button-row">
      {links.map((link) => (
        <a
          className={link.primary ? "button button--primary" : "button"}
          href={link.href}
          key={link.href}
          rel={link.external ? "noreferrer" : undefined}
          target={link.external ? "_blank" : undefined}
        >
          {link.label}
          {link.external ? (
            <>
              <span aria-hidden="true"> ↗</span>
              {externalLabel}
            </>
          ) : null}
        </a>
      ))}
    </div>
  );
}

