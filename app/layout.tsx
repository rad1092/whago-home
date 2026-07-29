import type { Metadata, Viewport } from "next";
import "./globals.css";

const description =
  "WHAGO가 운영하는 Daymark, RepoLens, Siteboard의 제품과 최신 릴리스를 확인합니다.";

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
        url: "/og-release-desk.png",
        width: 1200,
        height: 630,
        alt: "WHAGO Release Desk — Daymark, RepoLens, Siteboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WHAGO — Daymark · RepoLens · Siteboard",
    description,
    images: ["/og-release-desk.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#141515",
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
