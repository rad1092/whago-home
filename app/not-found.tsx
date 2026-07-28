import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404 · Not found</p>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>WHAGO는 실제 내용이 준비된 페이지부터 하나씩 공개합니다.</p>
      <Link className="primary-action" href="/">
        홈으로 돌아가기
        <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
