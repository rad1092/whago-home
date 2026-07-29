import type { Metadata, Viewport } from "next";
import "./globals.css";

const description =
  "Daymark, RepoLens, Siteboard의 제품 홈페이지입니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://whago.net"),
  title: {
    default: "WHAGO — Daymark · RepoLens · Siteboard",
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
    title: "WHAGO — Daymark · RepoLens · Siteboard",
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "WHAGO — Daymark, RepoLens, Siteboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WHAGO — Daymark · RepoLens · Siteboard",
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07120f",
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
