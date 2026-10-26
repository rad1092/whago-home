import type { Metadata, Viewport } from "next";
import { SiteShell } from "../_components/site-shell";
import { LANGUAGE_SCRIPT, SITE_URL } from "../../lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f8fafc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANGUAGE_SCRIPT }} />
      </head>
      <SiteShell locale="ko">{children}</SiteShell>
    </html>
  );
}
