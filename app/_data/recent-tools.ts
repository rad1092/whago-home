import type { Product } from "./products";

// Introductions follow each public README; release links include prereleases.
export const recentTools: readonly Product[] = [
  {
    "slug": "annotrail",
    "name": "Annotrail",
    "typeLabel": "PDF 주석 이동",
    "glyph": "AN",
    "purpose": "논문·교재 개정판을 읽는 사용자가 이전 PDF의 하이라이트와 댓글을 새 PDF의 텍스트와 대조하고, 승인한 주석을 새 파일로 옮깁니다.",
    "offering": "데스크톱 · CLI · 사전 공개판",
    "runtime": "macOS · Windows · Linux / Java CLI",
    "dataLocation": "로컬 PDF · JSON 검토 기록",
    "audience": "개정판 PDF를 검토하는 연구자·학생·문서 독자",
    "boundary": "선택 가능한 가로 텍스트와 지원 주석만 처리합니다. OCR·필기·회전 페이지는 지원하지 않으며, 같은 문구도 문맥을 직접 확인해야 합니다.",
    "workflow": [
      "주석이 있는 이전 PDF와 새 개정판을 선택합니다.",
      "페이지 미리보기와 주변 문맥을 비교해 후보를 승인하거나 건너뜁니다.",
      "새 PDF와 JSON 검토 기록으로 내보내고 평소 쓰는 PDF 뷰어에서 확인합니다."
    ],
    "source": "https://github.com/rad1092/annotrail",
    "facts": [
      {
        "label": "대상",
        "value": "개정판 PDF를 검토하는 연구자·학생·문서 독자"
      },
      {
        "label": "실행",
        "value": "macOS · Windows · Linux / Java CLI"
      },
      {
        "label": "데이터",
        "value": "로컬 PDF · JSON 검토 기록"
      },
      {
        "label": "제공",
        "value": "데스크톱 · CLI · 사전 공개판"
      }
    ],
    "setup": {
      "title": "설치와 시작",
      "body": "Releases에서 운영체제에 맞는 사전 공개 패키지와 SHA256SUMS를 받으세요. 체크섬 확인 후 압축을 풀어 앱을 실행합니다. Java가 포함되어 있으며, 독립 JAR은 Java 17 이상이 필요합니다. macOS는 ad-hoc 서명만 있으며 Apple 공증과 Windows Authenticode 서명은 없습니다."
    },
    "primaryAction": {
      "label": "사전 공개판 다운로드",
      "href": "https://github.com/rad1092/annotrail/releases"
    },
    "guide": {
      "label": "사용 안내",
      "href": "https://github.com/rad1092/annotrail/blob/main/README.md#review-workflow"
    }
  },
  {
    "slug": "conflictbench",
    "name": "ConflictBench",
    "typeLabel": "Syncthing 충돌 검토",
    "glyph": "CB",
    "purpose": "Syncthing 사용자가 충돌 파일의 텍스트·이미지·메타데이터를 비교하고, 원본 유지·충돌본 사용·둘 다 보존 중 하나를 직접 선택합니다.",
    "offering": "로컬 데스크톱 · 수동 검토",
    "runtime": "macOS · Windows · Linux",
    "dataLocation": "선택한 폴더 · 별도 백업 폴더",
    "audience": "동기화 충돌을 직접 검토하는 Syncthing 사용자",
    "boundary": "적용 전 Syncthing을 일시 중지하고 다른 쓰기 프로그램을 닫아야 합니다. 복원은 인식 가능한 로컬 상태에 한정되며 다른 기기의 후속 변경을 되돌리지 않습니다.",
    "workflow": [
      "선택한 폴더를 읽어 충돌 목록과 각 버전의 차이를 확인합니다.",
      "원본 유지·충돌본 사용·둘 다 보존 중 하나를 고르고 동기화 폴더 밖의 백업 위치를 정합니다.",
      "동기화를 멈춘 뒤 경로와 해시를 검토하고 적용합니다. 결과를 확인한 후 동기화를 재개합니다."
    ],
    "source": "https://github.com/rad1092/conflictbench",
    "facts": [
      {
        "label": "대상",
        "value": "동기화 충돌을 직접 검토하는 Syncthing 사용자"
      },
      {
        "label": "실행",
        "value": "macOS · Windows · Linux"
      },
      {
        "label": "데이터",
        "value": "선택한 폴더 · 별도 백업 폴더"
      },
      {
        "label": "제공",
        "value": "로컬 데스크톱 · 수동 검토"
      }
    ],
    "setup": {
      "title": "설치와 시작",
      "body": "Releases에서 운영체제에 맞는 패키지를 받고 SHA-256을 확인한 뒤 압축을 풀어 실행하세요. Try demo로 임시 예제를 볼 수 있습니다. 배포판은 서명되지 않았으며 macOS 공증도 없습니다. Linux 실행 조건은 저장소의 BUILDING 문서를 확인하세요."
    },
    "primaryAction": {
      "label": "다운로드·릴리스",
      "href": "https://github.com/rad1092/conflictbench/releases"
    },
    "guide": {
      "label": "사용 안내",
      "href": "https://github.com/rad1092/conflictbench/blob/main/docs/QUICKSTART.ko.md"
    }
  },
  {
    "slug": "shopshift",
    "name": "ShopShift",
    "typeLabel": "소규모 작업장 계획",
    "glyph": "SS",
    "purpose": "소규모 작업장의 계획 담당자가 ERP에서 내보낸 CSV·XLSX로 일일 작업을 배치하고, 잠금과 수동 시작 시각을 유지하며 충돌과 대안을 검토합니다.",
    "offering": "오프라인 데스크톱 · 계획 담당자 1명",
    "runtime": "macOS · Windows · Linux",
    "dataLocation": "로컬 JSON 프로젝트 · CSV/HTML 출력",
    "audience": "고정 설비·작업자·캘린더로 계획하는 소규모 작업장 담당자",
    "boundary": "ERP 대체나 설비 제어 도구가 아닙니다. 자재·재고, 대체 설비, 여러 계획 담당자의 동시 작업은 모델에 포함하지 않습니다.",
    "workflow": [
      "ERP 내보내기를 가져와 작업 ID·설비·시간을 매핑하고 현장 캘린더를 맞춥니다.",
      "수동 배치 또는 제안을 검토하고 확정한 시작 시각을 잠급니다. 복사한 시나리오에서 대안을 비교합니다.",
      "충돌을 확인한 뒤 일일 작업표를 CSV·인쇄용 HTML로 내보내고 프로젝트를 저장합니다."
    ],
    "source": "https://github.com/rad1092/shopshift",
    "facts": [
      {
        "label": "대상",
        "value": "고정 설비·작업자·캘린더로 계획하는 소규모 작업장 담당자"
      },
      {
        "label": "실행",
        "value": "macOS · Windows · Linux"
      },
      {
        "label": "데이터",
        "value": "로컬 JSON 프로젝트 · CSV/HTML 출력"
      },
      {
        "label": "제공",
        "value": "오프라인 데스크톱 · 계획 담당자 1명"
      }
    ],
    "setup": {
      "title": "설치와 시작",
      "body": "Releases의 운영체제별 패키지는 전체 압축을 푼 뒤 실행하세요. 서명·공증되지 않은 배포판입니다. 소스 체크아웃에서는 Python 3.12 또는 3.13의 가상환경에 설치한 뒤 shopshift --demo로 합성 예제를 열 수 있습니다."
    },
    "primaryAction": {
      "label": "다운로드·릴리스",
      "href": "https://github.com/rad1092/shopshift/releases"
    },
    "guide": {
      "label": "사용 안내",
      "href": "https://github.com/rad1092/shopshift/blob/main/docs/QUICKSTART.ko.md"
    }
  },
  {
    "slug": "treeport",
    "name": "Treeport",
    "typeLabel": "파일명 이식성 검사",
    "glyph": "TP",
    "purpose": "내보내기·압축·배포 파이프라인 개발자가 폴더, ZIP 또는 JSONL 목록의 이름 충돌과 경로 길이를 대상 모델에 맞춰 읽기 전용으로 검사합니다.",
    "offering": "Go 라이브러리 · 독립 CLI",
    "runtime": "터미널 · Go 라이브러리",
    "dataLocation": "파일명 읽기 · JSON 보고서",
    "audience": "파일 내보내기·압축·배포 파이프라인 개발자",
    "boundary": "대상 모델을 명시하며 불확실한 결과는 unknown으로 남깁니다. 파일 내용·권한·남은 공간이나 모든 파일시스템의 호환성을 검증하지 않습니다.",
    "workflow": [
      "실제 대상에 맞춰 posix·windows·macos 또는 export-fold 모델과 목적지 루트를 지정합니다.",
      "폴더·ZIP 엔트리·JSONL 목록을 검사해 부모 경로를 포함한 충돌 원인을 확인합니다.",
      "호환·비호환·불확실 결과와 종료 코드를 검토하고 필요한 경우 CI에 JSON 보고서를 보관합니다."
    ],
    "source": "https://github.com/rad1092/treeport",
    "facts": [
      {
        "label": "대상",
        "value": "파일 내보내기·압축·배포 파이프라인 개발자"
      },
      {
        "label": "실행",
        "value": "터미널 · Go 라이브러리"
      },
      {
        "label": "데이터",
        "value": "파일명 읽기 · JSON 보고서"
      },
      {
        "label": "제공",
        "value": "Go 라이브러리 · 독립 CLI"
      }
    ],
    "setup": {
      "title": "설치와 시작",
      "body": "Releases에서 플랫폼별 바이너리와 SHA256SUMS를 받거나 Go 1.25 이상으로 설치하세요. 명령 옵션은 입력 경로 앞에 둡니다. --root는 검사할 폴더가 아니라 앞으로 사용할 목적지 루트입니다."
    },
    "primaryAction": {
      "label": "다운로드·릴리스",
      "href": "https://github.com/rad1092/treeport/releases"
    },
    "guide": {
      "label": "사용 안내",
      "href": "https://github.com/rad1092/treeport/blob/main/README.ko.md"
    }
  },
  {
    "slug": "lifecase",
    "name": "Lifecase",
    "typeLabel": "하위 프로세스 테스트",
    "glyph": "LC",
    "purpose": "하위 프로세스를 실행하는 앱 개발자가 제어된 네이티브 fixture로 프로세스 종료, 출력 EOF, 취소와 자식 프로세스 정리를 각각 테스트합니다.",
    "offering": "네이티브 fixture · .NET 예제 · 선택적 Go 검증기",
    "runtime": "네이티브 실행 파일 · .NET 8+ / Go",
    "dataLocation": "합성 입력 · 로컬 테스트 보고서",
    "audience": "CliWrap 등으로 하위 프로세스를 실행하는 앱 개발자",
    "boundary": "앱의 명시적 완료 정책을 시험하는 작은 fixture입니다. CliWrap 자체 테스트나 임의의 프로세스 트리 검증을 대체하지 않습니다.",
    "workflow": [
      "운영체제·아키텍처에 맞는 fixture를 받거나 CMake와 C++17로 빌드합니다.",
      "LIFECASE_FIXTURE에 실행 파일의 절대 경로를 지정하고 .NET 8 이상에서 제공된 CliWrap 계약 테스트를 실행합니다.",
      "필요한 정책을 앱의 통합 테스트에 적용합니다. 선택적 Go 검증기로 JSON·JUnit 증거를 남길 수 있습니다."
    ],
    "source": "https://github.com/rad1092/lifecase",
    "facts": [
      {
        "label": "대상",
        "value": "CliWrap 등으로 하위 프로세스를 실행하는 앱 개발자"
      },
      {
        "label": "실행",
        "value": "네이티브 실행 파일 · .NET 8+ / Go"
      },
      {
        "label": "데이터",
        "value": "합성 입력 · 로컬 테스트 보고서"
      },
      {
        "label": "제공",
        "value": "네이티브 fixture · .NET 예제 · 선택적 Go 검증기"
      }
    ],
    "setup": {
      "title": "설치와 시작",
      "body": "Releases는 Linux x64, macOS arm64, Windows x64 fixture ZIP과 체크섬을 제공합니다. .NET 테스트에는 .NET 8 SDK와 네이티브 fixture가 필요하며 Go는 선택 사항입니다. macOS 서명·공증은 보장하지 않습니다. 소스 빌드와 경로 설정은 .NET 가이드를 따르세요."
    },
    "primaryAction": {
      "label": "다운로드·릴리스",
      "href": "https://github.com/rad1092/lifecase/releases"
    },
    "guide": {
      "label": "사용 안내",
      "href": "https://github.com/rad1092/lifecase/blob/main/dotnet/README.md"
    }
  },
  {
    "slug": "paperstager",
    "name": "PaperStager",
    "typeLabel": "PDF 분할·파일명 검토",
    "glyph": "PS",
    "purpose": "묶음 PDF를 정리하는 사용자가 페이지 미리보기로 문서 경계를 나누고, 텍스트 규칙으로 제안된 파일명을 검토한 뒤 승인하여 내보냅니다.",
    "offering": "오프라인 데스크톱 · 사전 공개판",
    "runtime": "macOS · Windows · Linux",
    "dataLocation": "로컬 PDF · 프로젝트 JSON · manifest",
    "audience": "스캔·검색 가능한 PDF 묶음을 문서별로 정리하는 사용자",
    "boundary": "스캐너나 OCR 엔진이 아닙니다. 이미지 전용 PDF는 미리 검색 가능한 PDF로 만들거나 필드를 직접 입력해야 하며, 주석·양식 등 지원하지 않는 PDF 구조는 거부합니다.",
    "workflow": [
      "PDF를 가져오고 페이지 미리보기에서 각 문서의 첫 페이지를 표시합니다.",
      "라벨·정규식 규칙과 이름 템플릿을 정한 뒤 누락된 필드·중복 경로·잘못된 이름을 검토합니다.",
      "승인 후 새 묶음 폴더로 PDF와 원본 페이지·출력 파일을 연결하는 manifest.json을 내보냅니다."
    ],
    "source": "https://github.com/rad1092/paperstager",
    "facts": [
      {
        "label": "대상",
        "value": "스캔·검색 가능한 PDF 묶음을 문서별로 정리하는 사용자"
      },
      {
        "label": "실행",
        "value": "macOS · Windows · Linux"
      },
      {
        "label": "데이터",
        "value": "로컬 PDF · 프로젝트 JSON · manifest"
      },
      {
        "label": "제공",
        "value": "오프라인 데스크톱 · 사전 공개판"
      }
    ],
    "setup": {
      "title": "설치와 시작",
      "body": "Releases의 사전 공개 포터블 패키지를 풀어 실행하세요. .NET 런타임이 포함되어 있습니다. macOS는 ad-hoc 서명만 있으며 Developer ID·Apple 공증과 Windows Authenticode 서명은 없습니다. Linux는 X11 데스크톱과 안내된 시스템 라이브러리가 필요합니다. Try a synthetic example로 예제를 열 수 있습니다."
    },
    "primaryAction": {
      "label": "사전 공개판 다운로드",
      "href": "https://github.com/rad1092/paperstager/releases"
    },
    "guide": {
      "label": "사용 안내",
      "href": "https://github.com/rad1092/paperstager/blob/main/docs/QUICKSTART.ko.md"
    }
  },
  {
    "slug": "serdeproof",
    "name": "SerdeProof",
    "typeLabel": "직렬화 업그레이드 검토",
    "glyph": "SP",
    "purpose": "Java 개발팀이 실제 DTO·매퍼 설정·페이로드 코퍼스를 두 직렬화 빌드에서 실행해 입력 수용, JSON 차이와 생산자·소비자 조합을 비교합니다.",
    "offering": "Java 17 라이브러리 · CLI",
    "runtime": "JDK 17+ · 로컬 JVM · CI",
    "dataLocation": "로컬 코퍼스 · JSON/JUnit 보고서",
    "audience": "Java 직렬화 라이브러리 업그레이드를 검토하는 개발팀",
    "boundary": "통과는 해당 코퍼스에서 예상 밖 차이가 없었다는 뜻입니다. 업무 의미의 동등성을 증명하지 않습니다. 어댑터는 사용자 권한의 신뢰된 로컬 코드로 실행됩니다.",
    "workflow": [
      "같은 DTO와 매퍼를 기준·후보 의존성 버전으로 각각 빌드하고 매니페스트에 경로를 지정합니다.",
      "분리된 JVM에서 코퍼스와 네 가지 생산자·소비자 조합을 실행합니다.",
      "JSON·JUnit 결과를 검토하고 승인할 변경의 이유와 만료일을 명시해 CI 기준으로 사용합니다."
    ],
    "source": "https://github.com/rad1092/serdeproof",
    "facts": [
      {
        "label": "대상",
        "value": "Java 직렬화 라이브러리 업그레이드를 검토하는 개발팀"
      },
      {
        "label": "실행",
        "value": "JDK 17+ · 로컬 JVM · CI"
      },
      {
        "label": "데이터",
        "value": "로컬 코퍼스 · JSON/JUnit 보고서"
      },
      {
        "label": "제공",
        "value": "Java 17 라이브러리 · CLI"
      }
    ],
    "setup": {
      "title": "설치와 시작",
      "body": "JDK 17 이상이 필요합니다. Releases ZIP의 source/ 또는 저장소 체크아웃에서 Maven wrapper로 빌드하고 제공된 예제를 실행하세요. ZIP에는 실행 JAR도 포함됩니다. Maven Central에는 게시되지 않았습니다. 예제의 차이 발견은 종료 코드 1, 불완전한 실험은 2로 구분합니다."
    },
    "primaryAction": {
      "label": "다운로드·릴리스",
      "href": "https://github.com/rad1092/serdeproof/releases"
    },
    "guide": {
      "label": "사용 안내",
      "href": "https://github.com/rad1092/serdeproof/blob/main/docs/QUICKSTART.ko.md"
    }
  }
];
