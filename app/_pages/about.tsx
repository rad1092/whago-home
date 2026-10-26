import Link from "next/link";
import type { Locale } from "../../lib/catalog";
import { localePath, pageMetadata } from "../../lib/site";

const copy = {
  en: {
    title: "About",
    heading: "WHAGO tools show you a change before they make it.",
    description: "WHAGO makes desktop apps and developer tools that show you a change before they make it.",
    sections: [
      {
        title: "Nothing changes until you approve it",
        body: [
          "Annotrail moves a highlight only after you accept its new spot. ConflictBench backs up a conflict file before it removes anything. PaperStager writes files only from a plan you approved. RepoLens fails a pull request only for the problems that pull request adds.",
        ],
      },
      {
        title: "On your own computer",
        body: [
          "The apps run on your computer and the command-line tools in your own CI. There is no account to create.",
        ],
      },
    ],
    software: "See the software",
  },
  ko: {
    title: "소개",
    heading: "WHAGO의 도구는 바꾸기 전에 먼저 보여줍니다.",
    description: "바꾸기 전에 먼저 보여주는 데스크톱 앱과 개발자 도구를 만듭니다.",
    sections: [
      {
        title: "승인하기 전에는 바뀌지 않습니다",
        body: [
          "Annotrail은 새 위치를 승인한 하이라이트만 옮깁니다. ConflictBench는 충돌 파일을 지우기 전에 먼저 백업합니다. PaperStager는 승인한 계획대로만 파일을 씁니다. RepoLens는 PR이 새로 들여온 문제로만 실패합니다.",
        ],
      },
      {
        title: "내 컴퓨터에서",
        body: ["앱은 내 컴퓨터에서, 명령줄 도구는 내 CI에서 돕니다. 계정을 만들 필요가 없습니다."],
      },
    ],
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
      {text.sections.map((section, index) => (
        <section aria-labelledby={`about-${index}`} className="prose page-shell" key={section.title}>
          <h2 id={`about-${index}`}>{section.title}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
      <p className="prose page-shell">
        <Link href={localePath(locale, "/software")}>{text.software}</Link>
      </p>
    </main>
  );
}
