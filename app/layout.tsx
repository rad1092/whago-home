import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

const description =
  "WHAGO가 만드는 Daymark, RepoLens, Siteboard를 확인하세요.";

export const metadata: Metadata = {
  metadataBase: new URL("https://whago.net"),
  title: {
    default: "WHAGO",
    template: "%s · WHAGO",
  },
  description,
  creator: "WHAGO",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "WHAGO",
    title: "WHAGO",
    description,
    images: [
      {
        url: "/og-house-v2.png",
        width: 1200,
        height: 630,
        alt: "WHAGO의 세 가지 소프트웨어 화면",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WHAGO",
    description,
    images: ["/og-house-v2.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f7f7f3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main">
          본문으로 바로가기
        </a>
        <header className="site-header">
          <div className="site-header__inner">
            <Link className="wordmark" href="/" aria-label="WHAGO 홈">
              WHAGO
            </Link>
            <nav aria-label="주요 메뉴">
              <Link href="/software">제품</Link>
              <Link href="/releases">변경 기록</Link>
              <Link href="/support">지원</Link>
              <Link href="/house">소개</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="site-footer__inner">
            <Link className="wordmark" href="/">
              WHAGO
            </Link>
            <p>© 2026 WHAGO</p>
            <a
              href="https://github.com/rad1092"
              rel="noreferrer"
              target="_blank"
            >
              GitHub ↗<span className="sr-only">(새 탭에서 열림)</span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
