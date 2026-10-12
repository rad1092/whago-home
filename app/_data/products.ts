import { recentTools } from "./recent-tools";

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
  audience?: string;
  boundary?: string;
  media?: {
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
  demo?: ProductLink;
  result?: string;
};

export type Release = {
  productSlug: Product["slug"];
  version: string;
  publishedAt: string;
  summary: string;
  prerelease?: boolean;
};

export const allProducts: readonly Product[] = [
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
  "slug": "firstcall",
  "name": "FirstCall",
  "typeLabel": "API → 로컬 MCP 도구",
  "glyph": "FC",
  "purpose": "API를 AI 클라이언트에 연결하려는 개발자가 curl·OpenAPI 요청을 실제로 검증하고, 용도와 입력을 설명한 로컬 MCP 도구로 내보냅니다.",
  "offering": "macOS Apple Silicon 앱 · CLI · 네이티브 MCP",
  "runtime": "macOS Apple Silicon · 데스크톱/터미널",
  "dataLocation": "로컬 SQLite·패키지 · 선택한 API 직접 호출",
  "source": "https://github.com/rad1092/firstcall-local-api-workbench",
  "facts": [
    {
      "label": "배포판",
      "value": "v0.3.1 · macOS Apple Silicon"
    },
    {
      "label": "실행",
      "value": "앱·CLI 포함 · npm 설치 불필요"
    },
    {
      "label": "입력",
      "value": "curl · OpenAPI · 선택 query/header 생략 가능"
    },
    {
      "label": "연결",
      "value": "검증한 요청 → 네이티브 MCP 패키지"
    },
    {
      "label": "범위",
      "value": "Apple 공증 없음 · Intel/Windows/Linux 0.3.1 바이너리 없음"
    }
  ],
  "workflow": [
    "Create a tool에서 curl·OpenAPI 요청을 가져오거나 공개 GitHub API 예제를 선택합니다.",
    "입력을 채워 Send and verify로 실제 요청을 보냅니다. 선택 query/header는 빈 채로 두면 요청에서 생략됩니다.",
    "도구 이름·용도·입력 설명을 정해 Export MCP package를 실행하고 연결 설정을 AI 클라이언트에 추가합니다. 인증 환경 변수는 클라이언트에도 별도로 제공합니다."
  ],
  "setup": {
    "title": "다운로드와 실행",
    "body": "v0.3.1 ZIP을 풀고 FirstCall.app을 Applications로 옮긴 뒤 실행하세요. Apple Silicon macOS용 앱과 companion CLI가 포함되어 있으며 ad-hoc 서명만 있고 Apple 공증은 없습니다. 요청 검증과 MCP 호출은 선택한 API에 실제로 연결합니다. 기본 GET·HEAD 외 쓰기는 내보내기 시 명시적으로 허용해야 합니다. 앱 또는 패키지를 옮겼다면 새 CLI 위치에서 connect --package로 연결 설정을 다시 생성하세요.",
    "commands": [
      "/path/to/firstcall-cli connect --package /absolute/path/to/moved-tool"
    ]
  },
  "primaryAction": {
    "label": "v0.3.1 Apple Silicon 다운로드",
    "href": "https://github.com/rad1092/firstcall-local-api-workbench/releases/download/v0.3.1/firstcall-v0.3.1-aarch64-apple-darwin.zip"
  },
  "guide": {
    "label": "설치와 첫 도구 만들기",
    "href": "https://github.com/rad1092/firstcall-local-api-workbench#make-your-first-tool"
  },
  "demo": {
    "label": "CLI·MCP 사용 흐름",
    "href": "https://github.com/rad1092/firstcall-local-api-workbench/blob/main/docs/cli-lifecycle.md"
  },
  "result": "Try an example로 공개 GitHub 저장소 조회를 검증하고 실제 JSON을 반환하는 MCP 도구를 만들 수 있습니다. v0.3.1은 빈 선택 query/header를 생략하며, 옮긴 패키지에서 connect로 설정을 갱신한 뒤 다시 호출할 수 있습니다. 검증 당시의 응답은 향후 모든 API 호출의 성공을 보장하지 않습니다."
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
      src: "/gh-dep-risk-demo.gif",
      width: 1040,
      height: 720,
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
        "기존 gh 인증을 사용합니다. 위험 점수는 검토를 돕는 휴리스틱이며 취약점 검사 결과가 아닙니다. PR 댓글은 --comment 또는 설정 파일의 comment 옵션으로 활성화합니다.",
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
  ...recentTools,
] as const;

export const retiredSlugs = ["daymark", "siteboard"] as const;

export const products: readonly Product[] = [
  ...["firstcall", "repolens", "gh-dep-risk"].map(
    (slug) => allProducts.find((product) => product.slug === slug)!,
  ),
  ...recentTools,
];

export function isRetired(slug: string) {
  return retiredSlugs.some((retired) => retired === slug);
}

export const releases: readonly Release[] = [
{
  "productSlug": "firstcall",
  "version": "0.3.1",
  "publishedAt": "2026-10-12",
  "prerelease": false,
  "summary": "선택 query/header를 비워도 검증·MCP 호출에서 생략합니다. 이동한 패키지의 연결 설정은 connect로 갱신합니다."
},
{
  "productSlug": "matcha",
  "version": "0.1.1",
  "publishedAt": "2026-10-12",
  "prerelease": false,
  "summary": "잘못된 MCP 요청을 머신·슬롯·중단점 보존 상태로 거부하고 재현 가능한 홈브루 디버깅 실습을 제공합니다."
},
{
  "productSlug": "annotrail",
  "version": "0.1.3",
  "publishedAt": "2026-10-12",
  "prerelease": true,
  "summary": "PDF 주석 이전 preview. docs·예제를 현재 소스에서 묶으며 합성 old/new PDF의 검토·이전 실습을 제공합니다."
},
{
  "productSlug": "lifecase",
  "version": "0.1.3",
  "publishedAt": "2026-10-12",
  "prerelease": false,
  "summary": "fixture와 검증 CLI를 함께 배포합니다. 보고서 경로를 실행 전에 예약하고 기존 파일·별칭 충돌을 거부합니다."
},
{
  "productSlug": "serdeproof",
  "version": "0.1.1",
  "publishedAt": "2026-10-12",
  "prerelease": false,
  "summary": "프로세스 소유권 확인과 입력 파일 덮어쓰기 방지를 보강했습니다. --fail-on-untested로 미검증 입력을 CI 실패로 처리할 수 있습니다."
},
{
  "productSlug": "conflictbench",
  "version": "0.1.0",
  "publishedAt": "2026-10-08",
  "prerelease": false,
  "summary": "Syncthing 충돌을 비교하고 선택한 결과를 외부 백업·복구 기록과 함께 적용하는 로컬 데스크톱 앱입니다."
},
{
  "productSlug": "shopshift",
  "version": "0.1.0",
  "publishedAt": "2026-10-08",
  "prerelease": false,
  "summary": "ERP CSV/XLSX 복사본으로 작업을 배치하고 재입력 시 시작 시각·잠금을 유지하는 단일 계획자용 앱입니다."
},
{
  "productSlug": "paperstager",
  "version": "0.1.1",
  "publishedAt": "2026-10-08",
  "prerelease": true,
  "summary": "PDF 경계·이름을 검토·승인해 새 PDF와 manifest로 내보내는 사전 공개 데스크톱 앱입니다."
},
{
  "productSlug": "treeport",
  "version": "0.1.3",
  "publishedAt": "2026-10-08",
  "prerelease": false,
  "summary": "목적지 루트의 길이 예산과 부모 경로까지 포함해 이름 트리의 충돌을 읽기 전용으로 검사합니다."
},
  {
    productSlug: "firstcall",
    version: "0.3.0",
    publishedAt: "2026-09-05",
    summary: "앱에서 API 검증부터 도구 설명·입력 형식 지정, MCP 연결 설정 내보내기까지 완료합니다. 별도 빌드 없이 실행하는 네이티브 런타임과 실제 JSON 응답 반환을 추가했습니다.",
  },
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
  return allProducts.find((product) => product.slug === slug);
}

export function getLatestRelease(slug: Product["slug"]) {
  return releases.find((release) => release.productSlug === slug);
}

export function formatReleaseDate(publishedAt: string) {
  return publishedAt.replaceAll("-", ".");
}
