import type { Metadata } from "next";
import type { Locale, Platform } from "./catalog";

export const SITE_URL = "https://whago.net";
// Switch to a whago.net address once Cloudflare Email Routing is set up.
export const CONTACT_EMAIL = "rad174951@gmail.com";
export const GITHUB_URL = "https://github.com/rad1092";
export const LANGUAGE_KEY = "whago-language";

// Runs in the page head before anything is drawn. A language the visitor picked
// before wins; otherwise a browser set to Korean goes from an English page to the
// same page in Korean. Everyone else stays where they are.
export const LANGUAGE_SCRIPT = `(function(){try{var chosen=localStorage.getItem("${LANGUAGE_KEY}"),path=location.pathname,onKo=path==="/ko"||path.indexOf("/ko/")===0,browser=(navigator.languages&&navigator.languages[0])||navigator.language||"",want=chosen||(/^ko(-|$)/i.test(browser)?"ko":""),rest=location.search+location.hash;if(want==="ko"&&!onKo)location.replace((path==="/"?"/ko":"/ko"+path)+rest);else if(want==="en"&&onKo)location.replace((path==="/ko"?"/":path.slice(3))+rest)}catch(e){}})();`;

export function localePath(locale: Locale, path: string) {
  if (locale === "en") return path;
  return path === "/" ? "/ko" : `/ko${path}`;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
  image?: { url: string; width: number; height: number };
}): Metadata {
  const url = localePath(locale, path);
  const fullTitle = title ? `${title} · WHAGO` : "WHAGO";
  const ogImage = image ?? { url: "/og.png", width: 1200, height: 630 };
  return {
    title: title ? { absolute: fullTitle } : { absolute: "WHAGO" },
    description,
    alternates: {
      canonical: url,
      languages: {
        en: localePath("en", path),
        ko: localePath("ko", path),
        "x-default": localePath("en", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: "WHAGO",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: locale === "ko" ? "en_US" : "ko_KR",
      url,
      title: fullTitle,
      description,
      images: [{ ...ogImage, alt: title ?? "WHAGO" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}

type Strings = {
  skip: string;
  nav: { software: string; support: string; about: string };
  navLabel: string;
  languageLabel: string;
  homeLabel: string;
  newTab: string;
  footer: { email: string; links: string };
  home: {
    title: string;
    description: string;
    developer: string;
    desktop: string;
    all: string;
  };
  groups: Record<"developer" | "desktop" | "lab", string>;
  labNote: string;
  details: string;
  software: { title: string; description: string; runsOn: string; version: string };
  product: {
    breadcrumb: string;
    download: string;
    downloadFor: (platform: string) => string;
    releasePage: string;
    otherDownloads: string;
    play: string;
    version: string;
    released: string;
    license: string;
    preview: string;
    whatItDoes: string;
    howItWorks: string;
    install: string;
    tryIt: string;
    limits: string;
    links: string;
    docs: string;
    source: string;
    issues: string;
    sampleOutput: string;
  };
  support: {
    title: string;
    description: string;
    intro: string;
    product: string;
    docs: string;
    report: string;
    issue: string;
    email: string;
  };
  platforms: Record<Platform, string>;
};

export const strings: Record<Locale, Strings> = {
  en: {
    skip: "Skip to content",
    nav: { software: "Software", support: "Support", about: "About" },
    navLabel: "Main",
    languageLabel: "Language",
    homeLabel: "WHAGO home",
    newTab: "(opens in a new tab)",
    footer: { email: "Email", links: "Contact" },
    home: {
      title: "WHAGO makes tools that let you compare and approve changes to files, documents and code.",
      description:
        "Desktop apps and command-line tools that let you compare a change before you approve it. FirstCall, Matcha, SerdeProof and 8 more.",
      developer: "Developer tools",
      desktop: "Desktop apps",
      all: "All software",
    },
    groups: { developer: "Developer tools", desktop: "Desktop apps", lab: "Lab" },
    labNote: "An early project. It isn't actively developed.",
    details: "Details",
    software: {
      title: "Software",
      description: "Every WHAGO app and command-line tool, with the systems it runs on.",
      runsOn: "Runs on",
      version: "Version",
    },
    product: {
      breadcrumb: "Software",
      download: "Download",
      downloadFor: (platform) => `Download for ${platform}`,
      releasePage: "All files on GitHub",
      otherDownloads: "Other downloads",
      play: "Play in your browser",
      version: "Version",
      released: "Released",
      license: "License",
      preview: "preview",
      whatItDoes: "What it does",
      howItWorks: "How it works",
      install: "Install",
      tryIt: "Try it with the example",
      limits: "Limitations",
      links: "Links",
      docs: "Documentation",
      source: "Source code",
      issues: "Report a problem",
      sampleOutput: "Sample output",
    },
    support: {
      title: "Support",
      description: "Documentation and problem reports for each WHAGO product.",
      intro: "For questions about any product, email",
      product: "Product",
      docs: "Documentation",
      report: "Report a problem",
      issue: "GitHub issue",
      email: "Email",
    },
    platforms: {
      "macos-arm64": "macOS (Apple Silicon)",
      "macos-x64": "macOS (Intel)",
      "windows-x64": "Windows",
      "windows-arm64": "Windows (Arm)",
      "linux-x64": "Linux",
      "linux-arm64": "Linux (Arm)",
      any: "Any system",
    },
  },
  ko: {
    skip: "본문으로 건너뛰기",
    nav: { software: "소프트웨어", support: "지원", about: "소개" },
    navLabel: "주요 메뉴",
    languageLabel: "언어",
    homeLabel: "WHAGO 홈",
    newTab: "(새 탭에서 열림)",
    footer: { email: "이메일", links: "연락" },
    home: {
      title: "WHAGO는 파일, 문서, 코드를 바꾸기 전에 비교하고 승인하게 해주는 도구를 만듭니다.",
      description: "바꾸기 전에 비교하고 승인하게 해주는 데스크톱 앱과 CLI. FirstCall, Matcha, SerdeProof 외 8개.",
      developer: "개발자 도구",
      desktop: "데스크톱 앱",
      all: "전체 보기",
    },
    groups: { developer: "개발자 도구", desktop: "데스크톱 앱", lab: "실험실" },
    labNote: "초기 프로젝트입니다. 지금은 개발하지 않습니다.",
    details: "자세히",
    software: {
      title: "소프트웨어",
      description: "WHAGO의 앱과 CLI, 실행 환경을 한 번에 봅니다.",
      runsOn: "실행",
      version: "버전",
    },
    product: {
      breadcrumb: "소프트웨어",
      download: "다운로드",
      downloadFor: (platform) => `${platform}용 다운로드`,
      releasePage: "GitHub에서 전체 파일 보기",
      otherDownloads: "다른 파일",
      play: "브라우저에서 플레이",
      version: "버전",
      released: "출시",
      license: "라이선스",
      preview: "프리뷰",
      whatItDoes: "하는 일",
      howItWorks: "사용 흐름",
      install: "설치",
      tryIt: "예제로 해보기",
      limits: "제한 사항",
      links: "링크",
      docs: "문서",
      source: "소스 코드",
      issues: "오류 신고",
      sampleOutput: "실행 예",
    },
    support: {
      title: "지원",
      description: "WHAGO 제품별 문서와 오류 신고 경로.",
      intro: "제품에 관한 질문은 이메일로 보내주세요:",
      product: "제품",
      docs: "문서",
      report: "오류 신고",
      issue: "GitHub 이슈",
      email: "이메일",
    },
    platforms: {
      "macos-arm64": "macOS (Apple Silicon)",
      "macos-x64": "macOS (Intel)",
      "windows-x64": "Windows",
      "windows-arm64": "Windows (Arm)",
      "linux-x64": "Linux",
      "linux-arm64": "Linux (Arm)",
      any: "모든 OS",
    },
  },
};
