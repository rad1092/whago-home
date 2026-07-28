import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whago.net"),
  title: {
    default: "WHAGO — 김홍대",
    template: "%s · WHAGO",
  },
  description:
    "윈도우 앱 FirstCall, GitHub CLI gh-dep-risk, ASCII Diagram Editor를 만든 김홍대의 작업 페이지.",
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
    title: "WHAGO — 김홍대",
    description:
      "윈도우 앱 FirstCall, GitHub CLI gh-dep-risk, ASCII Diagram Editor를 만든 김홍대의 작업 페이지.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "WHAGO — 김홍대의 작업 페이지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WHAGO — 김홍대",
    description:
      "윈도우 앱 FirstCall, GitHub CLI gh-dep-risk, ASCII Diagram Editor를 만든 김홍대의 작업 페이지.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fff7e8",
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
