import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description: "서울에서 소프트웨어를 만들고 운영하는 WHAGO입니다.",
  alternates: {
    canonical: "/house",
  },
};

export const dynamic = "force-static";

export default function HousePage() {
  return (
    <main id="main">
      <section className="house-profile page-shell" aria-labelledby="house-name">
        <h1 id="house-name">WHAGO</h1>
        <div>
          <p>서울에서 소프트웨어를 만들고 운영합니다.</p>
          <p>제품의 소스, 릴리스, 이슈는 GitHub에서 확인할 수 있습니다.</p>
          <a
            className="primary-text-link"
            href="https://github.com/rad1092"
            rel="noreferrer"
            target="_blank"
          >
            GitHub ↗<span className="sr-only">(새 탭에서 열림)</span>
          </a>
        </div>
      </section>
    </main>
  );
}
