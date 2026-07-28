import type { Metadata, Viewport } from "next";
import "./globals.css";

const description =
  "일정을 정리하고 저장소 상태를 확인하고 홈페이지 내용을 관리하는 WHAGO 운영 도구 모음.";

export const metadata: Metadata = {
  metadataBase: new URL("https://whago.net"),
  title: {
    default: "WHAGO — 운영 도구",
    template: "%s · WHAGO",
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
    siteName: "WHAGO",
    title: "WHAGO — 운영 도구",
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "WHAGO — 생산성, 유지관리, 홈페이지 관리 도구",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WHAGO — 운영 도구",
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f2f1eb",
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
