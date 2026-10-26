import productData from "../content/products.json";
import releaseData from "../content/releases.json";

export type Locale = "en" | "ko";
export const locales: readonly Locale[] = ["en", "ko"];

export type Group = "featured" | "developer" | "desktop" | "lab";

export type Platform =
  "macos-arm64" | "macos-x64" | "windows-x64" | "windows-arm64" | "linux-x64" | "linux-arm64" | "any";

export type ProductCopy = {
  type: string;
  summary: string;
  description: string;
  specs: [string, string][];
  steps: string[];
  install: string[];
  commands?: string[];
  example?: { text: string; label: string; href: string };
  limits: string[];
  docs: string;
};

export type Product = {
  slug: string;
  name: string;
  group: Group;
  repo: string;
  license: string;
  email?: boolean;
  play?: string;
  terminal?: string;
  media?: {
    src: string;
    // A still image for share cards when src is animated.
    poster?: string;
    width: number;
    height: number;
    alt: Record<Locale, string>;
  };
  downloads?: Partial<Record<Platform, string>>;
  en: ProductCopy;
  ko: ProductCopy;
};

export type Release = {
  product: string;
  version: string | null;
  date: string;
  prerelease?: boolean;
  retired?: boolean;
  en: string;
  ko: string;
};

const groups: readonly Group[] = ["featured", "developer", "desktop", "lab"];
const platforms: readonly Platform[] = [
  "macos-arm64",
  "macos-x64",
  "windows-x64",
  "windows-arm64",
  "linux-x64",
  "linux-arm64",
  "any",
];
const retiredSlugs = ["daymark", "siteboard"];

function fail(message: string): never {
  throw new Error(`content/: ${message}`);
}

function isText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function checkTextList(where: string, value: unknown, min = 1) {
  if (!Array.isArray(value) || value.length < min || !value.every(isText)) {
    fail(`${where} must be a list of at least ${min} non-empty strings`);
  }
}

function checkCopy(where: string, copy: ProductCopy) {
  for (const key of ["type", "summary", "description", "docs"] as const) {
    if (!isText(copy?.[key])) fail(`${where}.${key} is missing`);
  }
  if (copy.summary.length > 90) fail(`${where}.summary is longer than 90 characters`);
  if (!Array.isArray(copy.specs) || copy.specs.length === 0) fail(`${where}.specs is empty`);
  for (const row of copy.specs) {
    if (!Array.isArray(row) || row.length !== 2 || !row.every(isText)) {
      fail(`${where}.specs rows must be [label, value]`);
    }
  }
  checkTextList(`${where}.steps`, copy.steps, 3);
  checkTextList(`${where}.install`, copy.install, 1);
  checkTextList(`${where}.limits`, copy.limits, 1);
  if (copy.commands) checkTextList(`${where}.commands`, copy.commands);
  if (copy.example && !(isText(copy.example.text) && isText(copy.example.label) && isText(copy.example.href))) {
    fail(`${where}.example needs text, label and href`);
  }
}

function validateProducts(input: unknown): Product[] {
  if (!Array.isArray(input)) fail("products.json must be a list");
  const seen = new Set<string>();
  for (const product of input as Product[]) {
    const where = `products.json ${product?.slug ?? "?"}`;
    if (!/^[a-z0-9-]+$/.test(product.slug ?? "")) fail(`${where}: slug must be lowercase letters, digits and dashes`);
    if (seen.has(product.slug)) fail(`${where}: duplicate slug`);
    seen.add(product.slug);
    if (!isText(product.name) || !isText(product.license)) fail(`${where}: name and license are required`);
    if (!groups.includes(product.group)) fail(`${where}: unknown group ${product.group}`);
    if (!/^rad1092\/[A-Za-z0-9._-]+$/.test(product.repo ?? "")) fail(`${where}: repo must be rad1092/<name>`);
    for (const key of Object.keys(product.downloads ?? {})) {
      if (!platforms.includes(key as Platform)) fail(`${where}: unknown download platform ${key}`);
    }
    if (product.media) {
      const { src, width, height, alt } = product.media;
      if (!src.startsWith("/") || !(width > 0) || !(height > 0) || !isText(alt?.en) || !isText(alt?.ko)) {
        fail(`${where}: media needs src, width, height and alt in both languages`);
      }
    }
    checkCopy(`${where}.en`, product.en);
    checkCopy(`${where}.ko`, product.ko);
    if (product.en.steps.length !== product.ko.steps.length) fail(`${where}: steps differ between languages`);
  }
  return input as Product[];
}

function validateReleases(input: unknown, known: Set<string>): Release[] {
  if (!Array.isArray(input)) fail("releases.json must be a list");
  for (const release of input as Release[]) {
    const where = `releases.json ${release?.product} ${release?.version ?? "retired"}`;
    if (!known.has(release.product) && !retiredSlugs.includes(release.product)) fail(`${where}: unknown product`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(release.date ?? "")) fail(`${where}: date must be YYYY-MM-DD`);
    if (release.retired) {
      if (release.version !== null) fail(`${where}: a retirement entry has no version`);
    } else if (!/^\d+\.\d+\.\d+$/.test(release.version ?? "")) {
      fail(`${where}: version must look like 1.2.3`);
    }
    if (!isText(release.en) || !isText(release.ko)) fail(`${where}: notes are required in both languages`);
  }
  return input as Release[];
}

function compareVersions(a: string, b: string) {
  const left = a.split(".").map(Number);
  const right = b.split(".").map(Number);
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return 0;
}

export const products: readonly Product[] = validateProducts(productData);
const productSlugs = new Set(products.map((product) => product.slug));

// Newest first, independent of the order in the JSON file.
export const releases: readonly Release[] = validateReleases(releaseData, productSlugs)
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date) || compareVersions(b.version ?? "0.0.0", a.version ?? "0.0.0"));

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function productsIn(group: Group) {
  return products.filter((product) => product.group === group);
}

export function latestRelease(slug: string) {
  return releases
    .filter((release) => release.product === slug && release.version)
    .sort((a, b) => compareVersions(b.version!, a.version!))[0];
}

export function productName(slug: string) {
  return getProduct(slug)?.name ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

export function repoUrl(product: Product) {
  return `https://github.com/${product.repo}`;
}

export function releasePageUrl(product: Product, version: string) {
  return `${repoUrl(product)}/releases/tag/v${version}`;
}

export function withVersion(text: string, version: string) {
  return text.replaceAll("{version}", version);
}

export function downloadLinks(product: Product) {
  const release = latestRelease(product.slug);
  if (!release?.version || !product.downloads) return [];
  return Object.entries(product.downloads).map(([platform, file]) => ({
    platform: platform as Platform,
    file: withVersion(file!, release.version!),
    href: `${repoUrl(product)}/releases/download/v${release.version}/${withVersion(file!, release.version!)}`,
  }));
}

// The newest release date, used for "last updated" labels and the sitemap.
export const lastUpdated = releases[0].date;

export function formatDate(date: string, locale: Locale) {
  const [year, month, day] = date.split("-").map(Number);
  if (locale === "ko") return `${year}. ${month}. ${day}.`;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
