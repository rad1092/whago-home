// One-color line icons on a 24px grid. They inherit the text color.
const paths: Record<string, React.ReactNode> = {
  firstcall: (
    <>
      <path d="M4 7h7" />
      <path d="M4 12h5" />
      <path d="M4 17h7" />
      <path d="M13 12h5" />
      <path d="m16 9 3 3-3 3" />
      <rect x="2" y="4" width="11" height="16" rx="2" />
    </>
  ),
  matcha: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <rect x="8" y="5" width="8" height="6" rx="1" />
      <path d="M8 16h3M9.5 14.5v3" />
      <circle cx="15" cy="15" r="0.9" />
      <circle cx="16.5" cy="17.5" r="0.9" />
    </>
  ),
  serdeproof: (
    <>
      <path d="M8 4c-2 0-2 1.5-2 3v2c0 1.5-1 3-2 3 1 0 2 1.5 2 3v2c0 1.5 0 3 2 3" />
      <path d="M16 4c2 0 2 1.5 2 3v2c0 1.5 1 3 2 3-1 0-2 1.5-2 3v2c0 1.5 0 3-2 3" />
      <path d="m9.5 12 2 2 3.5-4" />
    </>
  ),
  "gh-dep-risk": (
    <>
      <path d="m12 2 8 4.5v9L12 20l-8-4.5v-9z" />
      <path d="M12 7v5" />
      <circle cx="12" cy="15.5" r="0.9" />
    </>
  ),
  repolens: (
    <>
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <path d="M6 7v10" />
      <circle cx="15" cy="10" r="4" />
      <path d="m18 13 3.5 3.5" />
    </>
  ),
  treeport: (
    <>
      <path d="M4 4v14h4" />
      <path d="M4 9h4" />
      <rect x="9" y="6" width="11" height="5" rx="1" />
      <rect x="9" y="15" width="11" height="5" rx="1" />
    </>
  ),
  annotrail: (
    <>
      <path d="M6 2h9l4 4v16H6z" />
      <path d="M15 2v4h4" />
      <path d="M9 11h7" />
      <path d="M9 15h7" strokeWidth="3.4" opacity="0.35" />
      <path d="M9 19h4" />
    </>
  ),
  conflictbench: (
    <>
      <rect x="3" y="4" width="10" height="13" rx="1.5" />
      <rect x="11" y="7" width="10" height="13" rx="1.5" />
      <path d="M14 11h4M14 14h4M14 17h2" />
    </>
  ),
  paperstager: (
    <>
      <path d="M5 3h10v18H5z" />
      <path d="M8 7h4M8 10h4" />
      <path d="M2 12h3M15 12h7" strokeDasharray="2 1.6" />
      <path d="M8 15h4M8 18h3" />
    </>
  ),
  shopshift: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M6 12.5h6M9 16h8" strokeWidth="2.6" />
    </>
  ),
  lifecase: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m6 9 3 3-3 3" />
      <path d="M12 15h6" />
    </>
  ),
};

export function ProductIcon({ slug, size = 28 }: { slug: string; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      className="product-icon"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[slug]}
    </svg>
  );
}
