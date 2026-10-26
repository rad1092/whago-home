import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found · WHAGO",
  robots: { index: false, follow: false },
};

// Served for any unknown path, so it carries both languages.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="site-header__inner">
            <Link className="wordmark" href="/">
              WHAGO
            </Link>
          </div>
        </header>
        <main className="page-intro page-shell not-found" id="main">
          <h1>Page not found</h1>
          <p>
            <Link href="/">Go to the home page</Link>
          </p>
          <p lang="ko">
            페이지가 없습니다. <Link href="/ko">홈으로 가기</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
