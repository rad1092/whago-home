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
      <p>404 / NOT FOUND</p>
      <h1>이 주소에는 도구가 없습니다.</h1>
      <Link href="/">
        WHAGO 홈으로 <span aria-hidden="true">←</span>
      </Link>
    </main>
  );
}
