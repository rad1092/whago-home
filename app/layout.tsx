import type { Metadata, Viewport } from "next";
import "./globals.css";

const description =
  "김홍대는 반복되는 업무를 웹 서비스, 데스크톱 앱, CLI로 구현합니다. FirstCall, gh-dep-risk, LocalFit Lab과 공개 도구를 소개합니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://whago.net"),
  title: {
    default: "김홍대 — 소프트웨어 개발",
    template: "%s · 김홍대",
  },
  description,
  creator: "HongDae Kim",
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
    siteName: "김홍대",
    title: "김홍대 — 소프트웨어 개발",
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "김홍대 — 업무를 쓸 수 있는 소프트웨어로 옮깁니다",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "김홍대 — 소프트웨어 개발",
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f2f0e9",
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
      <body>{children}</body>
    </html>
  );
}
