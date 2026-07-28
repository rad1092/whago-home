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
      <h1>요청한 주소를 확인해 주세요.</h1>
      <Link href="/">
        김홍대 홈페이지로 <span aria-hidden="true">←</span>
      </Link>
    </main>
  );
}
