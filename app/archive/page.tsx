import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";
export const metadata: Metadata = {title: "종료 제품과 자료 회수",description:"Daymark와 Siteboard의 기존 자료를 백업하고 구버전을 여는 방법.",alternates:{canonical:"/archive"}};

export default function ArchivePage(){
  return <main id="main">
    <header className="page-intro page-shell"><p className="eyebrow">ARCHIVE</p><h1>앱 개발은 종료해도,<br />자료는 가져갈 수 있도록.</h1><p>2026년 9월 5일 Daymark와 Siteboard의 독립 제품 개발을 종료했습니다. 기존 소스와 릴리스, 자료 회수 경로를 유지합니다.</p></header>
    <section className="archive-grid page-shell" aria-label="종료 제품">
      {[{slug:"daymark",name:"Daymark",copy:"할 일·메모·하루 기록의 원본을 내려받습니다. 구버전에서는 기존 작업을 열 수 있습니다."},{slug:"siteboard",name:"Siteboard",copy:"프로젝트와 편집 문서의 원본을 내려받습니다. 구버전에서 홈페이지를 편집하고 정적 파일로 내보낼 수 있습니다."}].map(p=><article className="archive-card" key={p.slug}><span className="status-label">개발 종료</span><h2>{p.name}</h2><p>{p.copy}</p><nav><a href={`https://${p.slug}.whago.net/`}>자료와 구버전 열기 ↗</a><Link href={`/software/${p.slug}`}>백업 안내 →</Link></nav></article>)}
    </section>
    <section className="page-shell product-section"><h2>자료를 찾을 수 없다면</h2><div className="setup-copy"><p>사용하던 기기·브라우저·주소를 확인하세요. 브라우저 저장 자료는 다른 브라우저나 주소에서 자동으로 보이지 않습니다.</p><p>이전 홈페이지 주소의 자료: <a href="/daymark/">Daymark</a> · <a href="/siteboard/">Siteboard</a>. www.whago.net에서 사용했다면 그 주소에서 같은 경로를 열어주세요.</p><p>설치형 앱의 SQLite·프로젝트 파일은 웹 자료와 별개입니다. 설치판의 백업 메뉴와 기존 소스를 유지합니다. 회수 화면은 원본을 읽고 파일로 내려받으며 기존 저장 자료를 수정하지 않습니다.</p></div></section>
  </main>;
}
