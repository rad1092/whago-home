# 김홍대 홈페이지

김홍대의 공개 홈페이지입니다. 실제로 배포한 소프트웨어 작업, 개발 방식,
독립 공개 도구와 GitHub 릴리스를 한곳에 정리합니다.

## 주요 작업

- [FirstCall](https://github.com/rad1092/firstcall-local-api-workbench) —
  API 요청을 검증된 에이전트 도구 패키지로 만드는 로컬 워크벤치
- [gh-dep-risk](https://github.com/rad1092/gh-dependency-risk) — Pull
  request의 의존성 변경을 검토자용 요약으로 만드는 GitHub CLI 확장
- [LocalFit Lab](https://github.com/rad1092/localfit-lab) — 서울 상권과
  업종 조건을 비교해 근거 리포트와 현장 확인 항목으로 잇는 웹 서비스

## 공개 도구

각 도구는 독립 저장소와 GitHub Pages 주소에서 배포합니다.

- [Daymark](https://rad1092.github.io/daymark/)
- [RepoLens](https://rad1092.github.io/repolens/)
- [Siteboard](https://rad1092.github.io/siteboard/)

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

- `npm test`는 Sites용 Worker 렌더링과 공개 문구·링크·보안 헤더를
  확인합니다.
- `npm run build:static`은 Lightsail의 Nginx가 바로 제공할 정적 파일을
  `out/`에 만듭니다.

## 배포 경계

- `whago.net`: 이 저장소의 정적 홈페이지
- `rad1092.github.io/daymark/`: Daymark
- `rad1092.github.io/repolens/`: RepoLens 문서
- `rad1092.github.io/siteboard/`: Siteboard

홈페이지 배포는 다른 제품 저장소를 clone하거나 build하지 않습니다.
기존 `whago.net/daymark/`와 `whago.net/siteboard/`는 브라우저에 남은
자료를 파일로 받은 뒤 새 주소로 이동할 수 있는 이전 화면만 제공합니다.
