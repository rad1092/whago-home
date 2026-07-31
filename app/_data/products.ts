export type ProductLink = {
  label: string;
  href: string;
};

export type Product = {
  slug: string;
  name: string;
  typeLabel: string;
  purpose: string;
  offering: string;
  runtime: string;
  dataLocation: string;
  source: string;
  mark?: string;
  glyph?: string;
  media: {
    src: string;
    width: number;
    height: number;
    alt: string;
    objectPosition: string;
  };
  facts: readonly {
    label: string;
    value: string;
  }[];
  workflow: readonly string[];
  setup: {
    title: string;
    body: string;
    commands?: readonly string[];
  };
  primaryAction: ProductLink;
  guide: ProductLink;
};

export type Release = {
  productSlug: Product["slug"];
  version: string;
  publishedAt: string;
  summary: string;
};

export const products: readonly Product[] = [
  {
    slug: "daymark",
    name: "Daymark",
    typeLabel: "하루 계획",
    purpose:
      "오늘 끝낼 일을 세 개까지 정하고, 남은 일은 다음 행동과 날짜로 넘깁니다.",
    offering: "웹 앱 · 설치 가능 · 브라우저에 저장",
    runtime: "웹 앱 · PWA",
    dataLocation: "현재 브라우저",
    source: "https://github.com/rad1092/daymark",
    mark: "/product-daymark-icon.png",
    media: {
      src: "/release-daymark-v2.2.0.jpg",
      width: 885,
      height: 649,
      alt: "Daymark에서 오늘 끝낼 세 가지 일을 정하는 화면",
      objectPosition: "top center",
    },
    facts: [
      { label: "실행", value: "브라우저 · 홈 화면 설치" },
      { label: "데이터", value: "현재 브라우저에 저장" },
      { label: "백업", value: "JSON 내보내기 · 가져오기" },
    ],
    workflow: [
      "수집함에서 오늘 끝낼 일을 최대 세 개 고릅니다.",
      "시작한 뒤에는 새 약속을 보충하지 않습니다.",
      "끝내지 못한 일에는 다음 행동과 다시 볼 날짜를 남깁니다.",
    ],
    setup: {
      title: "사용과 데이터",
      body:
        "브라우저에서 바로 사용하거나 홈 화면에 설치할 수 있습니다. 데이터는 현재 브라우저에 저장되며 JSON으로 내보내고 가져올 수 있습니다.",
    },
    primaryAction: {
      label: "Daymark 열기",
      href: "https://daymark.whago.net/",
    },
    guide: {
      label: "사용법",
      href: "https://daymark.whago.net/",
    },
  },
  {
    slug: "repolens",
    name: "RepoLens",
    typeLabel: "저장소 검사",
    purpose:
      "Pull request에서 새로 생기거나 악화된 저장소 유지보수 문제만 표시합니다.",
    offering: "CLI · GitHub Actions · Node.js 20.11+",
    runtime: "터미널 · GitHub Actions",
    dataLocation: "저장소 읽기 · 보고서 파일",
    source: "https://github.com/rad1092/repolens",
    media: {
      src: "/release-repolens-v0.3.0.jpg",
      width: 885,
      height: 708,
      alt: "RepoLens가 새 유지보수 회귀를 파일과 줄 위치에 표시한 보고서",
      objectPosition: "top center",
    },
    facts: [
      { label: "실행", value: "CLI · GitHub Actions" },
      { label: "입력", value: "Node · GitHub 저장소" },
      { label: "출력", value: "Terminal · HTML · SARIF" },
      { label: "접근", value: "검사 대상 읽기 전용" },
    ],
    workflow: [
      "현재 저장소의 문제를 기준선으로 기록합니다.",
      "각 Pull request에서 저장소를 읽기 전용으로 검사합니다.",
      "새 문제만 터미널, Job Summary와 SARIF로 출력합니다.",
    ],
    setup: {
      title: "설치",
      body:
        "프로젝트 스크립트를 실행하지 않고 저장소 구성을 검사합니다. 보안, 코드 품질, 의존성 도구를 대신하지 않습니다.",
      commands: [
        "npm install --global https://github.com/rad1092/repolens/releases/download/v0.3.0/rad1092-repolens-0.3.0.tgz",
      ],
    },
    primaryAction: {
      label: "설치 방법",
      href: "https://repolens.whago.net/",
    },
    guide: {
      label: "설치와 명령어",
      href: "https://repolens.whago.net/",
    },
  },
  {
    slug: "siteboard",
    name: "Siteboard",
    typeLabel: "사이트 제작",
    purpose:
      "홈페이지를 편집해 정적 파일로 내보내고 Cloudflare Pages에 배포합니다.",
    offering: "웹 편집기 · Local Studio · Node.js 22+",
    runtime: "웹 편집기 · Local Studio",
    dataLocation: "브라우저 · 로컬 작업 파일",
    source: "https://github.com/rad1092/siteboard",
    mark: "/product-siteboard-icon.png",
    media: {
      src: "/release-siteboard-v4.0.0.jpg",
      width: 971,
      height: 712,
      alt: "Siteboard에서 사이트 내용과 컴퓨터·휴대전화 미리보기를 함께 편집하는 화면",
      objectPosition: "top center",
    },
    facts: [
      { label: "실행", value: "웹 편집기 · Local Studio" },
      { label: "생성", value: "정적 HTML · assets · ZIP" },
      { label: "배포", value: "Cloudflare Pages" },
      { label: "인증", value: "Local Studio에서만 처리" },
    ],
    workflow: [
      "내용과 블록 순서를 편집하고 컴퓨터·휴대전화 화면을 확인합니다.",
      "정적 사이트 ZIP을 만들거나 Cloudflare Pages에 배포합니다.",
      "공개 주소의 리비전을 확인하고 이전 production으로 복구합니다.",
    ],
    setup: {
      title: "Studio 설치",
      body:
        "문서는 브라우저에 저장하고 JSON으로 백업할 수 있습니다. Cloudflare 인증 정보는 로컬 Studio에서만 다룹니다.",
      commands: [
        "npm install --global https://github.com/rad1092/siteboard/releases/download/v4.0.0/siteboard-4.0.0.tgz",
        "npx wrangler login",
        "siteboard studio",
      ],
    },
    primaryAction: {
      label: "웹 편집기 열기",
      href: "https://siteboard.whago.net/",
    },
    guide: {
      label: "Studio 설치",
      href: "https://github.com/rad1092/siteboard/releases/tag/v4.0.0",
    },
  },
  {
    slug: "firstcall",
    name: "FirstCall",
    typeLabel: "API 도구 제작",
    purpose:
      "API 요청을 로컬에서 검증하고 비밀값을 분리해 실행 가능한 MCP 도구 패키지로 만듭니다.",
    offering: "데스크톱 GUI · CLI · macOS/Windows/Linux",
    runtime: "데스크톱 · 터미널",
    dataLocation: "로컬 SQLite · 로컬 패키지",
    source: "https://github.com/rad1092/firstcall-local-api-workbench",
    glyph: "FC",
    media: {
      src: "/firstcall-gui-still.png",
      width: 1100,
      height: 760,
      alt: "FirstCall 데스크톱 GUI에서 curl 요청을 분석해 API 후보와 인증 입력을 구성하는 화면",
      objectPosition: "top center",
    },
    facts: [
      { label: "실행", value: "데스크톱 GUI · 자동화 CLI" },
      { label: "플랫폼", value: "macOS · Windows · Linux" },
      { label: "저장", value: "로컬 SQLite · 클라우드 백엔드 없음" },
      { label: "출력", value: "비밀값을 분리한 MCP 도구 패키지" },
    ],
    workflow: [
      "curl, OpenAPI, Postman, HAR 등의 요청 소스를 가져와 후보를 만듭니다.",
      "비밀값은 로컬 런타임에서 제공하고 대상 API에 요청해 동작을 검증합니다.",
      "검증 결과를 recipe, 정책과 실행 가능한 MCP 서버가 든 패키지로 내보냅니다.",
    ],
    setup: {
      title: "다운로드와 실행",
      body:
        "운영체제용 릴리스 압축 파일을 내려받아 풉니다. GUI와 CLI가 함께 들어 있으며, 저장과 패키징은 로컬에서 처리하고 검증할 때만 선택한 API로 직접 요청합니다.",
      commands: [
        "firstcall --screen new --sample curl",
        "firstcall-cli version",
        "firstcall-cli --help",
      ],
    },
    primaryAction: {
      label: "다운로드",
      href: "https://github.com/rad1092/firstcall-local-api-workbench/releases/latest",
    },
    guide: {
      label: "사용 흐름",
      href: "https://github.com/rad1092/firstcall-local-api-workbench/blob/main/docs/cli-lifecycle.md",
    },
  },
  {
    slug: "gh-dep-risk",
    name: "gh-dep-risk",
    typeLabel: "의존성 검토",
    purpose:
      "Pull request의 의존성 변경을 분석해 검토자가 확인할 위험 점수와 근거를 요약합니다.",
    offering: "GitHub CLI 확장 · Go · 사전 컴파일 바이너리",
    runtime: "GitHub CLI · 로컬 터미널",
    dataLocation: "GitHub API · 로컬 보고서",
    source: "https://github.com/rad1092/gh-dependency-risk",
    glyph: "DR",
    media: {
      src: "/dep-risk-still.png",
      width: 968,
      height: 612,
      alt: "gh-dep-risk가 Pull request의 의존성 위험을 분석하는 터미널 데모",
      objectPosition: "top center",
    },
    facts: [
      { label: "실행", value: "GitHub CLI · 로컬 터미널" },
      { label: "분석", value: "Dependency Review API 우선 · 정적 fallback" },
      { label: "입력", value: "Pull request · manifest · lockfile" },
      { label: "출력", value: "Human · JSON · Markdown" },
      { label: "접근", value: "기존 gh 인증 · comment는 선택 사항" },
    ],
    workflow: [
      "PR 번호, URL 또는 현재 branch를 지정해 gh dep-risk를 실행합니다.",
      "Dependency Review API를 먼저 확인하고 필요하면 지원 파일을 정적으로 비교합니다.",
      "위험 점수와 근거를 출력하고 필요할 때 bundle, comment 또는 실패 기준으로 사용합니다.",
    ],
    setup: {
      title: "GitHub CLI 확장 설치",
      body:
        "기존 gh 인증을 재사용하며 별도 서버, GitHub App이나 데이터베이스를 운영하지 않습니다. --comment를 지정할 때만 PR timeline comment를 작성합니다.",
      commands: [
        "gh auth login",
        "gh extension install rad1092/gh-dep-risk",
        "gh dep-risk pr 123",
      ],
    },
    primaryAction: {
      label: "설치 방법",
      href: "https://github.com/rad1092/gh-dependency-risk#install",
    },
    guide: {
      label: "지원 범위",
      href: "https://github.com/rad1092/gh-dependency-risk/blob/main/docs/support-matrix.md",
    },
  },
] as const;

export const releases: readonly Release[] = [
  {
    productSlug: "daymark",
    version: "2.2.0",
    publishedAt: "2026-07-29",
    summary:
      "시작 후 약속 수를 고정했습니다. 미완료 일에는 다음 행동과 다시 볼 날짜를 남길 수 있습니다.",
  },
  {
    productSlug: "repolens",
    version: "0.3.0",
    publishedAt: "2026-07-29",
    summary:
      "기준선과 비교해 새 회귀를 파일·줄 위치에 표시하고 Job Summary와 SARIF로 출력합니다.",
  },
  {
    productSlug: "siteboard",
    version: "4.0.0",
    publishedAt: "2026-07-29",
    summary:
      "Cloudflare 프로젝트 연결, 공개 리비전 확인, 이전 production 복구를 추가했습니다.",
  },
  {
    productSlug: "firstcall",
    version: "0.2.1",
    publishedAt: "2026-06-10",
    summary:
      "검증 가능한 데스크톱 GUI 실행 경로를 추가하고, 배포 바이너리로 만든 CLI·MCP 데모를 갱신했습니다.",
  },
  {
    productSlug: "gh-dep-risk",
    version: "0.2.1",
    publishedAt: "2026-06-10",
    summary:
      "설치 경로를 정리하고 실제 Pull request 기반 smoke 검증과 크로스 플랫폼 릴리스 흐름을 강화했습니다.",
  },
] as const;

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getLatestRelease(slug: Product["slug"]) {
  return releases.find((release) => release.productSlug === slug);
}

export function formatReleaseDate(publishedAt: string) {
  return publishedAt.replaceAll("-", ".");
}
