import type { Locale } from "../../lib/catalog";
import { pageMetadata } from "../../lib/site";
import { ExternalLink } from "../_components/external-link";

const copy = {
  en: {
    title: "Download Daymark and Siteboard data",
    description: "Daymark and Siteboard are no longer developed. Here is how to download your data.",
    intro:
      "Daymark and Siteboard were discontinued on September 5, 2026. Your data is still in the browser you used. Open the old address in that browser to download it.",
    products: [
      {
        slug: "daymark",
        name: "Daymark",
        text: "Download your tasks, notes and daily log. The old version still opens.",
      },
      {
        slug: "siteboard",
        name: "Siteboard",
        text: "Download your projects. The old version can still edit and export a site.",
      },
    ],
    open: "Open",
    source: "Source and releases",
    missingTitle: "Can't find your data?",
    missing: [
      "Browser data shows up only in the same browser, on the same device, at the same address.",
      "If you used them at whago.net, open whago.net/daymark/ or whago.net/siteboard/. If you used www.whago.net, use that address instead.",
      "The installed apps keep their files separately. Use the backup menu in the app.",
    ],
  },
  ko: {
    title: "Daymark, Siteboard 자료 내려받기",
    description: "Daymark와 Siteboard는 개발을 종료했습니다. 자료를 내려받는 방법입니다.",
    intro:
      "Daymark와 Siteboard는 2026년 9월 5일에 개발을 종료했습니다. 자료는 쓰던 브라우저에 그대로 있습니다. 그 브라우저에서 예전 주소를 열어 내려받으세요.",
    products: [
      { slug: "daymark", name: "Daymark", text: "할 일, 메모, 하루 기록을 내려받습니다. 예전 버전도 계속 열립니다." },
      {
        slug: "siteboard",
        name: "Siteboard",
        text: "프로젝트를 내려받습니다. 예전 버전에서 사이트를 편집하고 내보낼 수 있습니다.",
      },
    ],
    open: "열기",
    source: "소스와 릴리스",
    missingTitle: "자료가 안 보이면",
    missing: [
      "브라우저 자료는 같은 기기, 같은 브라우저, 같은 주소에서만 보입니다.",
      "whago.net에서 썼다면 whago.net/daymark/나 whago.net/siteboard/를 여세요. www.whago.net에서 썼다면 그 주소로 여세요.",
      "설치한 앱의 파일은 따로 있습니다. 앱의 백업 메뉴를 쓰세요.",
    ],
  },
} as const;

export function archiveMetadata(locale: Locale) {
  return pageMetadata({ locale, path: "/archive", title: copy[locale].title, description: copy[locale].description });
}

export function ArchivePage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <main id="main">
      <header className="page-intro page-shell">
        <h1>{text.title}</h1>
        <p>{text.intro}</p>
      </header>
      <section className="archive-grid page-shell">
        {text.products.map((product) => (
          <article className="archive-card" key={product.slug}>
            <h2>{product.name}</h2>
            <p>{product.text}</p>
            <ul className="link-list">
              <li>
                <a href={`https://${product.slug}.whago.net/`}>
                  {text.open} {product.slug}.whago.net
                </a>
              </li>
              <li>
                <ExternalLink href={`https://github.com/rad1092/${product.slug}`} locale={locale}>
                  {text.source}
                </ExternalLink>
              </li>
            </ul>
          </article>
        ))}
      </section>
      <section aria-labelledby="missing-title" className="prose page-shell">
        <h2 id="missing-title">{text.missingTitle}</h2>
        {text.missing.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
    </main>
  );
}
