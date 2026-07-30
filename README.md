# WHAGO

[whago.net](https://whago.net)은 WHAGO의 소프트웨어 카탈로그, 릴리스,
지원 경로와 운영 원칙을 나누어 제공하는 홈페이지입니다. 제품 수가
늘어나도 한 페이지를 계속 늘이지 않도록 다음 경로를 독립적으로
관리합니다.

- `/software`: 전체 제품 카탈로그
- `/software/[slug]`: 실행 형태, 데이터 위치, 기능과 현재 릴리스
- `/releases`: 제품별 버전과 변경 기록
- `/support`: 문서, Issues, 소스와 전체 릴리스
- `/house`: WHAGO의 제품 운영 원칙

제품 정보는 `app/_data/products.ts` 한곳에서 관리합니다. 새 제품은
저장소와 릴리스 경로를 준비한 뒤 이 카탈로그에 추가합니다.

## 현재 제품

- [Daymark](https://daymark.whago.net/) — 웹 데모를 운영하며 macOS,
  Windows, iOS, Android 설치판을 개발합니다.
- [RepoLens](https://repolens.whago.net/) — 저장소 점검, 기준선 비교,
  GitHub Action 자동화를 제공하는 CLI입니다.
- [Siteboard](https://siteboard.whago.net/) — 현재 로컬 Studio를
  제공하며 macOS와 Windows 설치판을 개발합니다.

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

- `npm test`는 Sites용 Worker에서 홈, 카탈로그, 제품 상세, 릴리스,
  지원과 하우스 페이지를 렌더링하고 보안 헤더와 배포 경계를 확인합니다.
- `npm run build:static`은 Lightsail의 Nginx가 제공할 정적 파일을
  `out/`에 만듭니다.

## 배포 경계

- `whago.net`: 이 저장소의 제품 홈페이지
- `daymark.whago.net`: `rad1092/daymark`
- `repolens.whago.net`: `rad1092/repolens`
- `siteboard.whago.net`: `rad1092/siteboard`

홈페이지와 세 제품은 각각 별도 릴리스 경로로 배포합니다. 기존
`whago.net/daymark/`와 `whago.net/siteboard/`에는 브라우저 저장 자료를
내려받아 새 주소로 옮기는 이전 화면을 유지합니다.

첫 설치에서는 세 제품을 먼저 빌드해 release 경로에 적재한 뒤 인증서와
Nginx를 전환합니다. 배포 스크립트는 root가 아닌 일반 배포 계정으로
실행합니다.

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
