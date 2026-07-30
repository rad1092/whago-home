import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

const description =
  "WHAGO는 Daymark, RepoLens, Siteboard를 만들고 배포하는 독립 소프트웨어 하우스입니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://whago.net"),
  title: {
    default: "WHAGO — Independent software house",
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
    title: "WHAGO — Independent software house",
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "WHAGO software catalog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WHAGO — Independent software house",
    description,
    images: ["/og.png"],
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
              <Link href="/software">소프트웨어</Link>
              <Link href="/releases">릴리스</Link>
              <Link href="/support">지원</Link>
              <Link href="/house">하우스</Link>
              <a
                href="https://github.com/rad1092"
                rel="noreferrer"
                target="_blank"
              >
                GitHub ↗
                <span className="sr-only">(새 탭에서 열림)</span>
              </a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="site-footer__inner">
            <div>
              <Link className="wordmark" href="/">
                WHAGO
              </Link>
              <p>Independent software house · Seoul</p>
            </div>
            <nav aria-label="하단 메뉴">
              <Link href="/software">소프트웨어</Link>
              <Link href="/releases">릴리스</Link>
              <Link href="/support">지원</Link>
              <Link href="/house">하우스</Link>
              <a
                href="https://github.com/rad1092"
                rel="noreferrer"
                target="_blank"
              >
                GitHub ↗
              </a>
            </nav>
            <p>© 2026 WHAGO</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
