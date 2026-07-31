# WHAGO

[whago.net](https://whago.net)은 WHAGO의 제품, 업데이트와 지원
경로를 제공하는 홈페이지입니다. 홈에서는 각 제품을 바로 열거나
설치할 수 있고, 아래 경로에서 상세 정보를 분리해 제공합니다.

- `/software`: 용도, 실행 방식과 데이터 위치 비교
- `/software/[slug]`: 실제 화면, 사용 흐름, 설치와 데이터
- `/releases`: 제품별 버전과 변경 내용
- `/support`: 사용법과 Issues
- `/house`: WHAGO 소개

제품 정보는 `app/_data/products.ts` 한곳에서 관리합니다. 새 제품은
저장소와 릴리스 경로를 준비한 뒤 이 카탈로그에 추가합니다.

## 현재 제품

- [Daymark](https://daymark.whago.net/) — 오늘 끝낼 일을 세 개까지
  정하고, 남은 일에는 다음 행동과 날짜를 남기는 웹 앱입니다.
- [RepoLens](https://repolens.whago.net/) — 새로 생기거나 악화된
  저장소 유지보수 문제만 표시하는 CLI와 GitHub Action입니다.
- [Siteboard](https://siteboard.whago.net/) — 홈페이지를 편집해
  정적 파일로 내보내고 Cloudflare Pages에 배포합니다.
- [FirstCall](https://github.com/rad1092/firstcall-local-api-workbench/releases/latest)
  — API 요청을 로컬에서 검증해 실행 가능한 MCP 도구 패키지로 만듭니다.
- [gh-dep-risk](https://github.com/rad1092/gh-dependency-risk) — Pull request의
  의존성 변경 위험을 GitHub CLI에서 요약합니다.

코드, 이슈, 버전과 설치 산출물은 제품별 저장소에서 관리합니다.

## 로컬 실행

Node.js 22.13.0 이상이 필요합니다.

```bash
npm ci
npm run dev
```

## 검증

```bash
npm test
npm run lint
npm run build:static
```

- `npm test`는 Sites용 Worker에서 홈, 제품 상세, 업데이트, 지원과
  소개 페이지를 렌더링하고 보안 헤더와 배포 경계를 확인합니다.
- `npm run build:static`은 Lightsail의 Nginx가 제공할 정적 파일을
  `out/`에 만듭니다.

## 배포 경계

- `whago.net`: 이 저장소의 제품 홈페이지
- `daymark.whago.net`: `rad1092/daymark`
- `repolens.whago.net`: `rad1092/repolens`
- `siteboard.whago.net`: `rad1092/siteboard`

홈페이지와 독립 웹 주소를 가진 세 제품은 각각 별도 릴리스 경로로
배포합니다. FirstCall과 gh-dep-risk는 각 GitHub 저장소의 릴리스와 설치
경로를 사용합니다. 기존
`whago.net/daymark/`와 `whago.net/siteboard/`에는 브라우저 저장 자료를
내려받아 새 주소로 옮기는 이전 화면을 유지합니다.

첫 설치에서는 독립 웹 주소를 가진 세 제품을 먼저 빌드해 release 경로에
적재한 뒤 인증서와 Nginx를 전환합니다. 배포 스크립트는 root가 아닌
일반 배포 계정으로 실행합니다.

```bash
./ops/deploy-product-on-lightsail.sh daymark <git-ref> --bootstrap
./ops/deploy-product-on-lightsail.sh repolens <git-ref> --bootstrap
./ops/deploy-product-on-lightsail.sh siteboard <git-ref> --bootstrap
./ops/bootstrap-products-on-lightsail.sh
./ops/deploy-on-lightsail.sh <release-id>
```

이후 제품별 업데이트는 해당 제품 스크립트만 실행합니다. 공개 DNS까지
확인할 때는 제품 스크립트에 `--verify-public`을 붙이고, 홈페이지는
`WHAGO_VERIFY_PUBLIC_DNS=1`로 실행합니다.
