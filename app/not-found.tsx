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
      <p className="section-code">404 / NOT FOUND</p>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>요청한 주소에 페이지가 없습니다.</p>
      <Link className="button button-solid" href="/">
        작업 인덱스로 돌아가기
        <span aria-hidden="true">←</span>
      </Link>
    </main>
  );
}
