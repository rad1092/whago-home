import type { Product } from "./products";

// Current public releases and reproducible examples; no universal compatibility claims.
export const recentTools: readonly Product[] = [
  {
    "slug": "annotrail",
    "name": "Annotrail",
    "typeLabel": "PDF 주석 이전",
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
      "label": "v0.1.3 사전 공개판",
      "href": "https://github.com/rad1092/annotrail/releases/tag/v0.1.3"
    },
    "guide": {
      "label": "사용 안내",
      "href": "https://github.com/rad1092/annotrail/blob/main/README.md#review-workflow"
    },
    "demo": {
      "label": "합성 PDF 실습",
      "href": "https://github.com/rad1092/annotrail/tree/main/examples/review-demo"
    },
    "result": "합성 old/new PDF에서 정확한 일치·중복 문구·찾지 못한 문구·지원하지 않는 주석을 구분합니다. 기본 선택은 1개 이전·3개 건너뛰기이며, 중복 문구의 두 번째 후보를 선택하면 2개 이전·2개 건너뛰기를 확인할 수 있습니다."
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
      "label": "v0.1.0 다운로드",
      "href": "https://github.com/rad1092/conflictbench/releases/tag/v0.1.0"
    },
    "guide": {
      "label": "사용 안내",
      "href": "https://github.com/rad1092/conflictbench/blob/main/docs/QUICKSTART.ko.md"
    },
    "demo": {
      "label": "첫 실행과 복구 실습",
      "href": "https://github.com/rad1092/conflictbench/blob/main/docs/FIRST-RUN.md"
    },
    "result": "Try demo의 임시 파일에서 세 선택의 결과를 비교하고 History / recovery를 확인할 수 있습니다. 실제 파일을 다루기 전에는 동기화와 편집기를 멈추고 모든 동기화 폴더 밖에 백업 위치를 정하세요."
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
      "label": "v0.1.0 다운로드",
      "href": "https://github.com/rad1092/shopshift/releases/tag/v0.1.0"
    },
    "guide": {
      "label": "사용 안내",
      "href": "https://github.com/rad1092/shopshift/blob/main/docs/QUICKSTART.ko.md"
    },
    "demo": {
      "label": "CSV 가져오기 실습",
      "href": "https://github.com/rad1092/shopshift#daily-workflow"
    },
    "result": "합성 데모나 샘플 CSV로 가져오기→필드 매핑→첫 import를 진행합니다. 시작 시각을 고정·잠근 뒤 다시 가져와 유지 여부를 살피고, 일일 CSV와 인쇄용 HTML에서 배치와 충돌을 확인하세요."
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
      "label": "v0.1.3 다운로드",
      "href": "https://github.com/rad1092/treeport/releases/tag/v0.1.3"
    },
    "guide": {
      "label": "사용 안내",
      "href": "https://github.com/rad1092/treeport/blob/main/README.ko.md"
    },
    "demo": {
      "label": "폴더·ZIP 실습",
      "href": "https://github.com/rad1092/treeport/blob/main/docs/first-run.md"
    },
    "result": "샘플 이름 트리에서 대소문자·부모 경로 충돌과 Windows 예약명을 확인한 뒤 이름 생성 규칙을 고쳐 다시 검사합니다. 도구는 입력이나 ZIP의 내용물을 바꾸지 않으며 결과 JSON과 종료 코드로 차이를 확인할 수 있습니다."
  },
  {
    "slug": "lifecase",
    "name": "Lifecase",
    "typeLabel": "하위 프로세스 테스트",
    "glyph": "LC",
    "purpose": "하위 프로세스를 실행하는 앱 개발자가 제어된 네이티브 fixture로 프로세스 종료, 출력 EOF, 취소와 자식 프로세스 정리를 각각 테스트합니다.",
    "offering": "네이티브 fixture + 검증 CLI · .NET 예제",
    "runtime": "패키지 CLI · 선택적 .NET 8 계약 테스트",
    "dataLocation": "합성 입력 · 로컬 테스트 보고서",
    "audience": "CliWrap 등으로 하위 프로세스를 실행하는 앱 개발자",
    "boundary": "앱의 명시적 완료 정책을 시험하는 작은 fixture입니다. CliWrap 자체 테스트나 임의의 프로세스 트리 검증을 대체하지 않습니다.",
    "workflow": [
      "배포 ZIP의 fixture와 검증기를 전체 추출합니다.",
      "exit·flood부터 실행하고 JSON·JUnit에 기록된 종료·출력 완료 단언을 확인합니다.",
      "앱의 정책에 맞는 시나리오를 고르거나 .NET/CliWrap 통합 예제로 확장합니다. 보고서는 매번 새 경로에 기록합니다."
    ],
    "source": "https://github.com/rad1092/lifecase",
    "facts": [
      {
        "label": "대상",
        "value": "CliWrap 등으로 하위 프로세스를 실행하는 앱 개발자"
      },
      {
        "label": "실행",
        "value": "패키지 CLI · 선택적 .NET 8 계약 테스트"
      },
      {
        "label": "데이터",
        "value": "합성 입력 · 로컬 테스트 보고서"
      },
      {
        "label": "제공",
        "value": "네이티브 fixture + 검증 CLI · .NET 예제"
      }
    ],
    "setup": {
      "title": "빌드 없이 첫 테스트",
      "body": "v0.1.3 ZIP에는 fixture와 lifecase 검증기가 함께 들어 있습니다. 운영체제·아키텍처에 맞는 ZIP의 SHA-256을 확인하고 전체를 푼 뒤 그 폴더에서 실행하세요. 아래 예제에는 Go나 .NET이 필요하지 않습니다. 별도의 CliWrap 계약 테스트에는 .NET 8 SDK가 필요합니다. macOS 서명·공증은 보장하지 않습니다. Windows는 .\\lifecase.exe와 .\\lifecase-fixture.exe를 사용하세요.",
      "commands": [
        "./lifecase version",
        "./lifecase run --fixture ./lifecase-fixture --scenario exit --scenario flood --json reports/first.json --junit reports/first.xml"
      ]
    },
    "primaryAction": {
      "label": "v0.1.3 다운로드",
      "href": "https://github.com/rad1092/lifecase/releases/tag/v0.1.3"
    },
    "guide": {
      "label": "한국어 시작 안내",
      "href": "https://github.com/rad1092/lifecase/blob/main/docs/quickstart.ko.md"
    },
    "demo": {
      "label": "빌드 없는 첫 실행",
      "href": "https://github.com/rad1092/lifecase#run-the-net-contracts"
    },
    "result": "배포 ZIP의 verifier와 fixture로 exit·flood 두 시나리오를 실행하면 종료 코드 0과 JSON·JUnit의 통과 결과를 확인할 수 있습니다. flood는 stdout과 stderr에서 각각 262,144바이트를 셉니다. 반복 실행에는 새 보고서 경로를 사용하세요."
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
      "라벨·정규식 규칙과 이름 템플릿을 정하고 제안 이름을 새로 계산합니다. 누락 필드·중복 경로·잘못된 이름을 다시 검토합니다.",
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
      "label": "v0.1.1 사전 공개판",
      "href": "https://github.com/rad1092/paperstager/releases/tag/v0.1.1"
    },
    "guide": {
      "label": "사용 안내",
      "href": "https://github.com/rad1092/paperstager/blob/main/docs/QUICKSTART.ko.md"
    },
    "demo": {
      "label": "합성 PDF로 시작하기",
      "href": "https://github.com/rad1092/paperstager#get-started"
    },
    "result": "Try a synthetic example의 가상 문서 두 개로 경계와 이름을 편집합니다. 이름을 새로 계산한 뒤 다시 검토·승인하여 PDF 두 개와 원본 페이지·출력 해시를 연결하는 manifest.json을 확인하세요. OCR은 실행하지 않습니다."
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
    "boundary": "통과는 해당 코퍼스에서 예상 밖 차이가 없었다는 뜻입니다. 업무 의미의 동등성을 증명하지 않습니다. 어댑터는 사용자 권한의 신뢰된 로컬 코드로 실행됩니다. 양쪽 버전에서 모두 거절한 입력은 미검증입니다. CI에서 미검증도 실패로 처리하려면 --fail-on-untested를 사용합니다.",
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
      "title": "빌드 없는 릴리스 실습",
      "body": "JDK 17 이상에서 serdeproof-0.1.1.zip과 SHA256SUMS를 받고 확인한 뒤 전체 압축을 풉니다. 추출한 serdeproof-0.1.1 폴더에서 아래 명령을 실행하세요. 예제의 차이 발견은 종료 코드 1, 불완전한 실험은 2입니다. Maven 설치나 계정은 필요하지 않으며 lib/의 모든 JAR을 함께 유지해야 합니다. 자체 DTO 통합은 사용 안내를 따르세요. Maven Central에는 게시되지 않았습니다.",
      "commands": [
        "java -jar lib/serdeproof-cli-0.1.1.jar run --manifest examples/release-demo.json --json reports/first.json --junit reports/first.xml --as-of 2026-10-08"
      ]
    },
    "primaryAction": {
      "label": "v0.1.1 다운로드",
      "href": "https://github.com/rad1092/serdeproof/releases/tag/v0.1.1"
    },
    "guide": {
      "label": "사용 안내",
      "href": "https://github.com/rad1092/serdeproof/blob/main/docs/QUICKSTART.ko.md"
    },
    "demo": {
      "label": "빌드 없는 Jackson 실습",
      "href": "https://github.com/rad1092/serdeproof#try-the-release-without-building"
    },
    "result": "공개 ZIP의 예제는 17개 fixture에서 예상 밖 차이 12개, 미검증 5개, 기반 실행 오류 0개를 출력하고 의도적으로 종료 코드 1을 반환합니다. 이 수치는 합성 예제 결과이며 실제 서비스의 호환성 판정은 자체 코퍼스로 해야 합니다."
  },
  {
    "slug": "matcha",
    "name": "Matcha",
    "typeLabel": "게임보이 홈브루 디버깅",
    "glyph": "MA",
    "purpose": "게임보이 홈브루 개발자와 에뮬레이터 학습자가 CPU·메모리·화면을 관찰하고, 저장 상태를 재생하거나 MCP 도구로 같은 실행을 반복합니다.",
    "offering": "오프라인 HTML · MCP 플러그인 · Rust CLI 소스",
    "runtime": "브라우저 · Node 18+ MCP · 소스 빌드 CLI",
    "dataLocation": "로컬 ROM · 브라우저 저장 · 프로세스 내 슬롯",
    "source": "https://github.com/rad1092/matcha",
    "audience": "자작 게임보이 소프트웨어를 시험하는 개발자·학습자",
    "boundary": "DMG/CGB의 일부 정밀 타이밍과 CGB의 DMG 호환 모드는 남아 있습니다. MCP 저장 슬롯은 프로세스 종료 시 사라집니다. 실행 권한이 있는 ROM만 사용하세요. 전체 하드웨어나 모든 게임의 호환성을 보장하지 않습니다.",
    "facts": [
      {
        "label": "실행",
        "value": "HTML 파일 · Node 18+ MCP"
      },
      {
        "label": "도구",
        "value": "MCP 17개 · 브레이크포인트·메모리 검색"
      },
      {
        "label": "입력",
        "value": "직접 만든 ROM · 포함된 오픈소스 홈브루"
      },
      {
        "label": "CLI",
        "value": "Rust로 소스 빌드"
      }
    ],
    "workflow": [
      "v0.1.1의 matcha.html 또는 matcha.plugin과 체크섬을 받습니다.",
      "HTML을 로컬 브라우저에서 열거나 플러그인 ZIP을 추출해 Node stdio 서버를 MCP 클라이언트에 연결합니다.",
      "홈브루 예제의 쓰기 명령을 찾아 실행하고, 저장·복원 후 같은 입력이 같은 레지스터·메모리·화면을 만드는지 비교합니다."
    ],
    "setup": {
      "title": "다운로드와 디버깅 실습",
      "body": "HTML 플레이어와 MCP 플러그인은 Rust 빌드가 필요하지 않습니다. matcha.plugin은 ZIP이며 전체 추출 후 server/server.mjs를 Node 18 이상으로 실행합니다. npm 패키지 설치는 필요하지 않습니다. MCP 설정에는 실제 절대 경로를 사용하세요. 아래 합성 홈브루 실습은 같은 태그의 소스 아카이브 루트에서 실행합니다.",
      "commands": [
        "node mcp/debug-homebrew.mjs"
      ]
    },
    "primaryAction": {
      "label": "v0.1.1 다운로드",
      "href": "https://github.com/rad1092/matcha/releases/tag/v0.1.1"
    },
    "guide": {
      "label": "설치와 실행 안내",
      "href": "https://github.com/rad1092/matcha#download-011"
    },
    "demo": {
      "label": "홈브루 디버깅 실습",
      "href": "https://github.com/rad1092/matcha/blob/main/docs/MCP-HOMEBREW.md"
    },
    "result": "실습은 자체 생성한 ROM에서 $C000에 $42를 쓰는 명령을 찾고 저장·복원 후 같은 실행을 재현합니다. v0.1.1은 잘못된 도구 요청을 실행 중 머신·저장 슬롯·중단점을 유지한 채 거부합니다. 이 결과는 디버깅 흐름의 확인이며 하드웨어 정확도 점수가 아닙니다."
  }
];
