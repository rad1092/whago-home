# WHAGO

[whago.net](https://whago.net)은 WHAGO의 제품, 업데이트와 지원
경로를 제공하는 홈페이지입니다. 홈에서는 각 제품을 바로 열거나
설치할 수 있고, 아래 경로에서 상세 정보를 분리해 제공합니다.

- `/software`: 용도, 실행 방식과 데이터 위치 비교
- `/software/[slug]`: 실제 화면, 사용 흐름, 설치와 데이터
- `/releases`: 제품별 버전과 변경 내용
- `/support`: 사용법과 Issues
- `/house`: WHAGO 소개

기존 제품 정보는 `app/_data/products.ts`, 최근 도구는 `app/_data/recent-tools.ts`에서 관리합니다. 새 제품은
저장소와 릴리스 경로를 준비한 뒤 이 카탈로그에 추가합니다.

## 현재 소프트웨어

- [FirstCall](https://whago.net/software/firstcall) — HTTP API를 검증하고 로컬 MCP 도구로 연결합니다. v0.3.1은 macOS Apple Silicon용이며 선택 query/header 생략과 이동한 패키지의 연결 설정 갱신을 지원합니다.
- [RepoLens](https://repolens.whago.net/) — 기준선 이후 새 유지보수 회귀를
  표시하는 공개 CLI·GitHub Action입니다.
- [gh-dep-risk](https://github.com/rad1092/gh-dependency-risk) — 의존성이 바뀐
  PR의 검토 근거를 요약하는 GitHub CLI 확장입니다.

## 도구 모음과 최근 업데이트

- [Annotrail](https://whago.net/software/annotrail) — 논문·교재 개정판을 읽는 사용자가 이전 PDF의 하이라이트와 댓글을 새 PDF의 텍스트와 대조하고, 승인한 주석을 새 파일로 옮깁니다.
- [ConflictBench](https://whago.net/software/conflictbench) — Syncthing 사용자가 충돌 파일의 텍스트·이미지·메타데이터를 비교하고, 원본 유지·충돌본 사용·둘 다 보존 중 하나를 직접 선택합니다.
- [ShopShift](https://whago.net/software/shopshift) — 소규모 작업장의 계획 담당자가 ERP에서 내보낸 CSV·XLSX로 일일 작업을 배치하고, 잠금과 수동 시작 시각을 유지하며 충돌과 대안을 검토합니다.
- [Treeport](https://whago.net/software/treeport) — 내보내기·압축·배포 파이프라인 개발자가 폴더, ZIP 또는 JSONL 목록의 이름 충돌과 경로 길이를 대상 모델에 맞춰 읽기 전용으로 검사합니다.
- [Lifecase](https://whago.net/software/lifecase) — 하위 프로세스를 실행하는 앱 개발자가 제어된 네이티브 fixture로 프로세스 종료, 출력 EOF, 취소와 자식 프로세스 정리를 각각 테스트합니다.
- [PaperStager](https://whago.net/software/paperstager) — 묶음 PDF를 정리하는 사용자가 페이지 미리보기로 문서 경계를 나누고, 텍스트 규칙으로 제안된 파일명을 검토한 뒤 승인하여 내보냅니다.
- [SerdeProof](https://whago.net/software/serdeproof) — Java 개발팀이 실제 DTO·매퍼 설정·페이로드 코퍼스를 두 직렬화 빌드에서 실행해 입력 수용, JSON 차이와 생산자·소비자 조합을 비교합니다.

- [Matcha](https://whago.net/software/matcha) — 게임보이 홈브루를 관찰·재생하는 오프라인 HTML 플레이어와 MCP 디버깅 도구입니다.

Annotrail 0.1.3과 PaperStager 0.1.1은 사전 공개판입니다. 각 제품 페이지에서 설치·사용 안내와 공개 저장소로 연결합니다.
프로젝트 문의: [rad174951@gmail.com](mailto:rad174951@gmail.com) · [개인 포트폴리오](https://rad1092.github.io/)

Daymark와 Siteboard는 2026-09-05에 독립 제품 개발을 종료했습니다.
`/archive`와 각 기존 주소는 자료 내려받기, `/legacy/`는 구버전 이용 경로입니다.
소스와 이전 릴리스, 브라우저 저장 자료는 보존합니다. 구버전이 오프라인으로
설치되어 있다면 한 번 온라인으로 연결해야 종료 안내가 갱신됩니다.

제품 결정과 완료 기준은 [재설계 기록](docs/rebuild-plan.md)에 있습니다.

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
원래 형태로 내려받는 복구 화면을 유지합니다. 각 subdomain도 같은 출처에서
자료를 읽으며, legacy 앱과 서비스 워커 캐시를 보존합니다.

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
