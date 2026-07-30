export type ProductLink = {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
};

export type Product = {
  slug: "daymark" | "repolens" | "siteboard";
  index: string;
  name: string;
  category: string;
  summary: string;
  status: string;
  version: string;
  releaseDate: string;
  releaseDateIso: string;
  releaseTitle: string;
  releaseSummary: string;
  releaseChanges: readonly string[];
  source: string;
  productUrl: string;
  screenshot: string;
  screenshotAlt: string;
  facts: readonly {
    label: string;
    value: string;
  }[];
  capabilities: readonly string[];
  links: readonly ProductLink[];
};

export const products: readonly Product[] = [
  {
    slug: "daymark",
    index: "01",
    name: "Daymark",
    category: "Daily execution",
    summary:
      "오늘의 약속을 최대 세 개로 봉인하고, 중단된 일의 다음 시작점을 남깁니다.",
    status: "웹 데모 운영 · 설치판 개발",
    version: "2.2.0",
    releaseDate: "2026.07.29",
    releaseDateIso: "2026-07-29",
    releaseTitle: "완결된 하루",
    releaseSummary:
      "시작할 때 정한 약속 수를 유지하고, 남은 일에 날짜와 다음 행동을 기록합니다.",
    releaseChanges: [
      "시작할 때 고른 약속 수 고정",
      "미완료 항목의 날짜와 다음 행동",
      "되돌리기와 로컬 복구 스냅샷",
    ],
    source: "https://github.com/rad1092/daymark",
    productUrl: "https://daymark.whago.net/",
    screenshot: "/release-daymark-v2.2.0.jpg",
    screenshotAlt: "Daymark에서 오늘의 세 약속을 정하는 화면",
    facts: [
      { label: "현재 제공", value: "Web demo / PWA" },
      { label: "설치판", value: "macOS · Windows 개발 중" },
      { label: "모바일", value: "iOS · Android 개발 중" },
      { label: "현재 저장", value: "브라우저 로컬 데이터" },
    ],
    capabilities: [
      "하루 최대 세 약속",
      "시작 후 약속 보충 금지",
      "미완료 시 다음 행동과 다시 볼 날짜 기록",
      "최근 결과와 복구 스냅샷",
    ],
    links: [
      {
        label: "웹 데모",
        href: "https://daymark.whago.net/",
        external: true,
        primary: true,
      },
      {
        label: "소스",
        href: "https://github.com/rad1092/daymark",
        external: true,
      },
      {
        label: "v2.2.0 릴리스",
        href: "https://github.com/rad1092/daymark/releases/tag/v2.2.0",
        external: true,
      },
      {
        label: "문제 접수",
        href: "https://github.com/rad1092/daymark/issues",
        external: true,
      },
    ],
  },
  {
    slug: "repolens",
    index: "02",
    name: "RepoLens",
    category: "Repository maintenance",
    summary:
      "기존 부채와 이번 변경에서 생긴 새 유지보수 회귀를 분리하는 CLI와 GitHub Action입니다.",
    status: "CLI · GitHub Action 배포",
    version: "0.3.0",
    releaseDate: "2026.07.29",
    releaseDateIso: "2026-07-29",
    releaseTitle: "PR 회귀 게이트",
    releaseSummary:
      "기준선에 수용한 부채는 남겨 두고, 새 회귀만 파일과 줄 위치에 표시합니다.",
    releaseChanges: [
      "새 회귀만 파일과 줄 위치에 표시",
      "수용 사유와 만료일을 가진 기준선",
      "GitHub Job Summary와 SARIF 출력",
    ],
    source: "https://github.com/rad1092/repolens",
    productUrl: "https://repolens.whago.net/",
    screenshot: "/release-repolens-v0.3.0.jpg",
    screenshotAlt: "RepoLens가 새 유지보수 회귀를 표시한 HTML 보고서",
    facts: [
      { label: "실행", value: "CLI · GitHub Actions" },
      { label: "입력", value: "Node · GitHub 저장소" },
      { label: "출력", value: "Terminal · JSON · HTML · SARIF" },
      { label: "접근", value: "검사 대상 읽기 전용" },
    ],
    capabilities: [
      "GitHub Actions와 Node 저장소 설정 검사",
      "검토한 기존 부채를 기준선으로 고정",
      "새로 생기거나 악화된 결과만 실패 처리",
      "CI 주석과 독립 HTML 보고서 생성",
    ],
    links: [
      {
        label: "설치와 사용법",
        href: "https://repolens.whago.net/",
        external: true,
        primary: true,
      },
      {
        label: "소스",
        href: "https://github.com/rad1092/repolens",
        external: true,
      },
      {
        label: "v0.3.0 릴리스",
        href: "https://github.com/rad1092/repolens/releases/tag/v0.3.0",
        external: true,
      },
      {
        label: "문제 접수",
        href: "https://github.com/rad1092/repolens/issues",
        external: true,
      },
    ],
  },
  {
    slug: "siteboard",
    index: "03",
    name: "Siteboard",
    category: "Static site studio",
    summary:
      "한 장짜리 사업 사이트를 편집하고, 정적 파일 생성부터 배포 확인과 복구까지 관리합니다.",
    status: "로컬 Studio 운영 · 설치판 개발",
    version: "4.0.0",
    releaseDate: "2026.07.29",
    releaseDateIso: "2026-07-29",
    releaseTitle: "검증 가능한 배포",
    releaseSummary:
      "대상 Cloudflare 프로젝트와 작업 파일을 연결하고, 공개 주소의 실제 리비전을 확인합니다.",
    releaseChanges: [
      "Cloudflare 프로젝트 명시 연결",
      "리비전 마커 기반 배포 확인",
      "초안 스냅샷과 운영 버전 롤백 분리",
    ],
    source: "https://github.com/rad1092/siteboard",
    productUrl: "https://siteboard.whago.net/",
    screenshot: "/release-siteboard-v4.0.0.jpg",
    screenshotAlt: "Siteboard에서 사이트 내용과 미리보기를 함께 편집하는 화면",
    facts: [
      { label: "현재 제공", value: "Local Studio · Web editor" },
      { label: "설치판", value: "macOS · Windows 개발 중" },
      { label: "생성", value: "독립 정적 HTML · assets" },
      { label: "배포", value: "Cloudflare Pages" },
    ],
    capabilities: [
      "내용과 블록 순서 편집",
      "컴퓨터와 휴대전화 미리보기",
      "독립 정적 사이트 ZIP 생성",
      "Cloudflare 배포 검증과 이전 production 복구",
    ],
    links: [
      {
        label: "현재 제품",
        href: "https://siteboard.whago.net/",
        external: true,
        primary: true,
      },
      {
        label: "소스",
        href: "https://github.com/rad1092/siteboard",
        external: true,
      },
      {
        label: "v4.0.0 릴리스",
        href: "https://github.com/rad1092/siteboard/releases/tag/v4.0.0",
        external: true,
      },
      {
        label: "문제 접수",
        href: "https://github.com/rad1092/siteboard/issues",
        external: true,
      },
    ],
  },
] as const;

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
