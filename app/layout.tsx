import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whago.net"),
  title: {
    default: "WHAGO — HongDae Kim",
    template: "%s · WHAGO",
  },
  description:
    "사람의 다음 한 걸음을 돕는 제품과 도구를 설계하고 직접 구현합니다.",
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
    title: "WHAGO — HongDae Kim",
    description:
      "사람의 다음 한 걸음을 돕는 소프트웨어를 만듭니다.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "WHAGO — 사람의 다음 한 걸음을 돕는 소프트웨어를 만듭니다.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WHAGO — HongDae Kim",
    description:
      "사람의 다음 한 걸음을 돕는 소프트웨어를 만듭니다.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f5f3ee",
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
