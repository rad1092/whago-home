import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { SiteNavigation } from "./_components/site-navigation";
import "./globals.css";

const description =
  "문서·파일·작업 계획과 개발 검토를 돕는 독립 소프트웨어. FirstCall과 공개 데스크톱 앱, CLI, 라이브러리.";

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
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "WHAGO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WHAGO",
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f8fafc",
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
            <SiteNavigation />
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="site-footer__inner">
            <p>© 2026 WHAGO · 울산</p>
            <nav className="site-footer__links" aria-label="WHAGO 연락">
              <Link href="/archive">종료 제품·자료 회수</Link>
              <a href="mailto:rad174951@gmail.com">문의 · rad174951@gmail.com</a>
              <a
                href="https://github.com/rad1092"
                rel="noreferrer"
                target="_blank"
              >
                GitHub ↗<span className="sr-only">(새 탭에서 열림)</span>
              </a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
