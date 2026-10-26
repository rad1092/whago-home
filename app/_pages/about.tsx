import Link from "next/link";
import type { Locale } from "../../lib/catalog";
import { GITHUB_URL, PORTFOLIO_URL, localePath, pageMetadata } from "../../lib/site";
import { ExternalLink } from "../_components/external-link";

const copy = {
  en: {
    title: "About",
    heading: "WHAGO is a one-person software studio run by Hongdae Kim in Ulsan, Korea.",
    description: "WHAGO is a one-person software studio in Ulsan, Korea.",
    principleTitle: "How the tools work",
    principle: [
      "Most of the tools follow one rule. They show what would change next to what you have now, and change nothing until you approve it.",
      "Annotrail moves a highlight only after you accept its new spot. ConflictBench backs up a conflict file before it removes anything. RepoLens fails a pull request only for the problems it adds.",
      "They run on your own computer or in your own CI.",
    ],
    makerTitle: "Who makes them",
    maker: "Hongdae Kim designs, builds and maintains every tool.",
    portfolio: "Portfolio",
    software: "See the software",
  },
  ko: {
    title: "소개",
    heading: "WHAGO는 김홍대가 울산에서 혼자 만드는 소프트웨어 스튜디오입니다.",
    description: "WHAGO는 울산에서 혼자 만드는 소프트웨어 스튜디오입니다.",
    principleTitle: "도구들이 일하는 방식",
    principle: [
      "대부분의 도구는 규칙이 하나입니다. 바뀔 내용을 지금 가진 것 옆에 보여주고, 승인하기 전에는 아무것도 바꾸지 않습니다.",
      "Annotrail은 새 위치를 승인한 하이라이트만 옮깁니다. ConflictBench는 충돌 파일을 지우기 전에 먼저 백업합니다. RepoLens는 PR이 새로 만든 문제로만 실패합니다.",
      "모두 내 컴퓨터나 내 CI에서 돕니다.",
    ],
    makerTitle: "만드는 사람",
    maker: "김홍대가 모든 도구를 설계하고 만들고 관리합니다.",
    portfolio: "포트폴리오",
    software: "소프트웨어 보기",
  },
} as const;

export function aboutMetadata(locale: Locale) {
  return pageMetadata({ locale, path: "/house", title: copy[locale].title, description: copy[locale].description });
}

export function AboutPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  return (
    <main id="main">
      <header className="page-intro page-shell">
        <h1>{text.heading}</h1>
      </header>
      <section aria-labelledby="principle-title" className="prose page-shell">
        <h2 id="principle-title">{text.principleTitle}</h2>
        {text.principle.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          <Link href={localePath(locale, "/software")}>{text.software}</Link>
        </p>
      </section>
      <section aria-labelledby="maker-title" className="prose page-shell">
        <h2 id="maker-title">{text.makerTitle}</h2>
        <p>{text.maker}</p>
        <ul className="link-list">
          <li>
            <ExternalLink href={PORTFOLIO_URL} locale={locale}>
              {text.portfolio}
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={GITHUB_URL} locale={locale}>
              GitHub
            </ExternalLink>
          </li>
        </ul>
      </section>
    </main>
  );
}
