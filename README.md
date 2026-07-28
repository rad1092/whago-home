# WHAGO Home

WHAGO의 공개 홈페이지입니다. 개인 포트폴리오가 아니라 다음 세 운영 도구를
소개하고 실행 화면으로 연결하는 제품 허브입니다.

- [Daymark](https://github.com/rad1092/daymark) — local-first 일일 실행 플래너
- [RepoLens](https://github.com/rad1092/repolens) — 읽기 전용 저장소 상태 감사 CLI
- [Siteboard](https://github.com/rad1092/siteboard) — local-first 홈페이지 관리 도구

## Production routes

- `https://whago.net/` — WHAGO Home
- `https://whago.net/daymark/` — Daymark
- `https://whago.net/repolens/` — RepoLens 예시 리포트
- `https://whago.net/siteboard/` — Siteboard

## Local development

Node.js `22.13.0` 이상이 필요합니다.

```bash
npm install
npm run dev
```

## Verification

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build:server
```

`npm run build`는 Cloudflare Worker 호환 빌드를, `npm run build:server`는
Lightsail에서 실행하는 Next.js 빌드를 만듭니다.
