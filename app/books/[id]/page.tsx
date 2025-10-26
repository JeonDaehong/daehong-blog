import Link from "next/link"
import { ArrowLeft, Calendar, User, Building2, Star, BookOpen, Clock } from "lucide-react"
import type { Metadata } from "next"

interface Book {
  id: number
  title: string
  author: string
  publisher: string
  coverImage: string
  description: string
  publishDate: string
  pages: number
  rating: number
  readDate: string
  review: string
  keyTakeaways: string[]
  tags: string[]
  toc: {
    title: string
    items: string[]
  }[]
}

const books: Record<string, Book> = {
  "1": {
    id: 1,
    title: "견고한 데이터 엔지니어링",
    author: "조 라이스, 맷 하우슬리",
    publisher: "한빛미디어",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9KLY1m2zG2pzi80wyrnculTYAl0sUK.png",
    description: "데이터 파이프라인 설계와 구축의 핵심 원리를 다루는 실무 중심의 데이터 엔지니어링 가이드북",
    publishDate: "2023년 6월",
    pages: 552,
    rating: 5,
    readDate: "2025년 3월",
    review: "",
    keyTakeaways: [],
    tags: ["데이터 엔지니어링", "파이프라인", "아키텍처", "클라우드", "빅데이터"],
  },
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const book = books[params.id]

  if (!book) {
    return {
      title: "Book Not Found - Daehong's Commit Log",
    }
  }

  return {
    title: `${book.title} 리뷰 - Daehong's Commit Log`,
    description: book.description,
  }
}

export default function BookReviewPage({ params }: { params: { id: string } }) {
  const book = books[params.id]

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">책을 찾을 수 없습니다</h1>
          <Link href="/books" className="text-primary hover:underline">
            도서 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          도서 목록으로 돌아가기
        </Link>

        {/* Book Header */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <div className="relative aspect-[2/3] max-w-sm mx-auto">
              <img
                src={book.coverImage || "/placeholder.svg"}
                alt={`${book.title} 책 표지`}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>

          {/* Book Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{book.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{book.description}</p>
            </div>

            {/* Book Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <User className="w-5 h-5 text-primary" />
                <span>{book.author}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Building2 className="w-5 h-5 text-primary" />
                <span>{book.publisher}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="w-5 h-5 text-primary" />
                <span>{book.publishDate}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>{book.pages}페이지</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span>읽은 날짜: {book.readDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-primary" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < book.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Review Content */}
        <div className="space-y-8">
          {/* 서평 Section */}
          <section className="bg-card rounded-lg p-6 border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              서평
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                이 책은 빅데이터를 지탱하는 기술, 데이터 파이프라인 핵심 가이드와 더불어 데이터 엔지니어링에 관한
                기본서로 많은 내용을 담고 있습니다. 또한, 많은 분들께 추천을 받아 읽게 되었으며 데이터 수명 주기에
                관해서 많이 공감하며 재밌게 읽었습니다.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4">
                이 책을 읽기 전까지 엔지니어가 결국 기업의 의사결정을 효율적으로 지원하는 역할을 해야 한다고
                생각했습니다. 이에 따라 백엔드부터 비즈니스 인텔리전스, 인공지능, 머신러닝, 그리고 MLOps까지 다양한
                분야를 고려해야 한다고 생각했습니다. 그러나 이 책을 통해 데이터 엔지니어의 궁극적인 목적과 역할에 대해
                새롭게 조명을 받게 되었습니다.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                데이터 엔지니어링의 생명주기는 데이터의 생성부터 저장, 수집, 변환, 그리고 서빙까지 이르며, 이 전 과정에
                걸쳐 보안, 데이터 관리, DevOps, 아키텍처, 그리고 오케스트레이션, 소프트웨어 엔지니어링까지 다양한
                요소들이 복합적으로 작용합니다. 결국, 데이터 엔지니어는 이러한 수명주기 전반에 걸쳐 기업의
                투자수익률(ROI)을 극대화하고, 재무적, 기회적 비용을 최소화하며, 다양한 리스크(보안과 데이터 품질 등)를
                효과적으로 관리하는 것이 최상위 목표라 할 수 있습니다.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                이 책은 {'"어떻게 하면 비즈니스에 진정한 가치를 더하는 데이터 엔지니어가 될 수 있을까?"'} 그리고{" "}
                {'"데이터 엔지니어로서 고려해야 할 핵심 요소들은 무엇인가?"'} 등의 본질적인 질문에 대한 깊이 있는 통찰을
                제공합니다. 이 책에서 탐구하는 데이터 엔지니어의 역할은 더욱 정확하게는 {"'데이터 수명주기 엔지니어'"}{" "}
                라고 칭할 수 있을 만큼 전반적이고 종합적인 관점을 제시합니다.
              </p>
            </div>
          </section>

          {/* 본문/리뷰 Section */}
          <section className="bg-card rounded-lg p-6 border">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              본문/리뷰
            </h2>

            {/* Chapter 1 */}
            <div className="mb-8 p-4 bg-muted/50 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">1장: 데이터 엔지니어링 기반 구축하기</h3>

              <h4 className="text-lg font-medium text-foreground mb-3">💬 데이터 엔지니어링이란</h4>

              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  데이터 엔지니어링이란, 조직의 데이터가 단순히 저장되는 수준을 넘어{" "} 
                  <strong style={{ color: "skyblue" }}>
                     분석과 머신러닝 같은 실제 비즈니스 활용이 가능하도록 준비하는 과정
                  </strong>
                  이라고 정의할 수 있습니다. 실제 현업 상황을 가정해보면, 기업은 수많은 원시 데이터를 수집하지만, 이
                  데이터가 정제되지 않으면 분석가나 데이터 과학자가 제대로 활용할 수 없습니다. 그래서{" "} 
                  <strong style={{ color: "skyblue" }}>
                    데이터 엔지니어는 데이터가 생성되는 시점부터 수집, 변환, 저장, 그리고 최종적으로 서빙
                  </strong>
                  까지 이어지는{" "} 
                  <strong style={{ color: "skyblue" }}>엔드 투 엔드 데이터 파이프라인</strong>을 책임집니다.
                </p>

                <p>
                  또한 데이터 엔지니어링은 단순한 ETL 작업이 아니라{" "} 
                  <strong style={{ color: "skyblue" }}>
                    보안, 거버넌스, 데이터옵스, 아키텍처 설계, 오케스트레이션, 소프트웨어 엔지니어링
                  </strong>
                  까지 포괄합니다. 즉, 데이터 엔지니어는 조직의 데이터 인프라를 안정적으로 운영하면서도, 분석가와
                  과학자가 바로 활용 가능한{" "} 
                  <strong style={{ color: "skyblue" }}>고품질 데이터 환경</strong>을 제공하는 역할을 합니다.
                </p>

                <p>
                  추가적으로 말씀드리자면, 데이터 엔지니어링은 오늘날 클라우드 환경, 대규모 분산 시스템, 스트리밍 처리
                  등과 맞물려 점점 더 고도화되고 있습니다. 따라서 단순한 데이터 준비를 넘어서{" "} 
                  <strong style={{ color: "skyblue" }}>확장성과 신뢰성을 갖춘 데이터 플랫폼 구축</strong>이 데이터
                  엔지니어링의 핵심이라고 생각합니다.
                </p>

                <p>
                  <br />
                </p>

                <h4 className="text-lg font-medium text-foreground mb-3">💬 데이터 엔지니어의 진화 과정</h4>

                <p>
                  데이터 엔지니어의 진화는 크게{" "}
                  <strong style={{ color: "skyblue" }}>
                    데이터 웨어하우스 시대 → 빅데이터 시대 → 현대 데이터 엔지니어링
                  </strong>
                  으로 구분할 수 있습니다. 각 시기는 데이터 기술 패러다임의 변화를 반영하며,
                  데이터 엔지니어의 역할 역시 점점 더 고도화되어 왔습니다.
                </p>

                <p>
                  먼저 1980년대부터 2000년대 초반까지는{" "}
                  <strong style={{ color: "skyblue" }}>데이터 웨어하우스 시대</strong>로,
                  오라클(Oracle), 인포매티카(Informatica), 테라데이터(Teradata),
                  MPP 데이터베이스 같은 전통적인 DW 기술이 중심이었습니다.
                  이 시기에는 주로{" "}
                  <strong style={{ color: "skyblue" }}>
                    BI 개발자와 ETL 전문가
                  </strong>
                  가 활동했으며, 정형 데이터를 대상으로{" "}
                  <strong style={{ color: "skyblue" }}>정기적 배치 처리</strong>를 통해 리포트를 생성하는 것이 핵심이었습니다.
                </p>

                <p>
                  이후 2000년대 중반부터 데이터의 폭증과 함께 구글의{" "}
                  <strong style={{ color: "skyblue" }}>GFS 및 맵리듀스(MapReduce) 논문</strong>이 발표되고,
                  이를 기반으로 한{" "}
                  <strong style={{ color: "skyblue" }}>아파치 하둡(Apache Hadoop)</strong>이 오픈소스로 등장하면서
                  <strong style={{ color: "skyblue" }}>빅데이터 엔지니어링 시대</strong>가 열렸습니다.
                  이 시기에는{" "}
                  <strong style={{ color: "skyblue" }}>HDFS, 하이브(Hive), 스파크(Spark)</strong> 같은
                  분산 처리 프레임워크가 등장하며, 대규모 데이터 병렬 처리와 확장성이
                  데이터 엔지니어링의 핵심 주제가 되었습니다.
                </p>

                <p>
                  2010년대에 들어서는 배치 중심의 워크플로우를 넘어{" "}
                  <strong style={{ color: "skyblue" }}>실시간 스트리밍 처리</strong>로 패러다임이 이동했습니다.
                  이를 통해{" "}
                  <strong style={{ color: "skyblue" }}>
                    카프카(Kafka), 스톰(Storm), 플링크(Flink)
                  </strong>
                  와 같은 이벤트 기반 기술이 각광받았고,
                  데이터 엔지니어는 단순한 적재·변환을 넘어서{" "}
                  <strong style={{ color: "skyblue" }}>
                    실시간 데이터 파이프라인 구축 및 장애 대응 능력
                  </strong>
                  을 요구받게 되었습니다.
                </p>

                <p>
                  마지막으로 2020년대의{" "}
                  <strong style={{ color: "skyblue" }}>현대 데이터 엔지니어링</strong>은
                  저수준 하둡 클러스터 운영보다{" "}
                  <strong style={{ color: "skyblue" }}>클라우드 네이티브 아키텍처</strong>와
                  <strong style={{ color: "skyblue" }}>데이터옵스(DataOps)</strong>,
                  그리고{" "}
                  <strong style={{ color: "skyblue" }}>GDPR/CCPA 기반 데이터 거버넌스</strong>를 중심으로 발전하고 있습니다.
                  즉, 데이터 엔지니어는 이제 인프라 구축보다는{" "}
                  <strong style={{ color: "skyblue" }}>
                    데이터 수명주기 전체를 관리하고, 데이터 품질·보안·비즈니스 가치 극대화
                  </strong>
                  에 초점을 맞추는 역할로 진화했습니다.
                </p>

                <p>
                  <br />
                </p>

                <h4 className="text-lg font-medium text-foreground mb-3">💬 데이터 엔지니어링의 기술과 활동</h4>

                <p>
                  데이터 엔지니어의 핵심 활동은{" "}
                  <strong style={{ color: "skyblue" }}>
                    데이터 파이프라인의 설계와 운영을 통해 안정적이고 활용 가능한 데이터를 제공하는 것
                  </strong>
                  입니다. 조직이 원시 데이터를 다양한 소스에서 수집했다고 할 때,
                  데이터 엔지니어는 업스트림으로부터 받은 데이터를{" "}
                  <strong style={{ color: "skyblue" }}>정제·변환</strong>하여
                  분석가나 머신러닝 엔지니어 같은 다운스트림 직무가 즉시 활용할 수 있는 형태로 전달해야 합니다.
                </p>

                <p>
                  이를 위해 데이터 엔지니어는{" "}
                  <strong style={{ color: "skyblue" }}>
                    데이터 수명 주기 관리(수집, 저장, 변환, 서빙)
                  </strong>
                  의 전 과정에 관여하며, 동시에{" "}
                  <strong style={{ color: "skyblue" }}>보안·데이터 거버넌스·확장성</strong>
                  을 고려해야 합니다.
                </p>

                <p>
                  1️⃣ {" "}
                  <strong style={{ color: "skyblue" }}>데이터 아키텍처 설계</strong>
                  를 통해 비용 효율적이면서도 확장 가능한 인프라를 구축하고,
                </p>

                <p>
                  2️⃣ {" "}
                  <strong style={{ color: "skyblue" }}>데이터옵스(DataOps)와 오케스트레이션</strong>
                  을 적용하여 파이프라인의{" "}
                  <strong style={{ color: "skyblue" }}>자동화·모니터링·배포</strong>
                  를 수행합니다.
                </p>

                <p>
                  3️⃣ 데이터 품질을 확보하기 위해{" "}
                  <strong style={{ color: "skyblue" }}>
                    데이터 카탈로그·계보(Lineage) 관리·메타데이터 시스템
                  </strong>
                  을 활용하며,
                </p>

                <p>
                  4️⃣ {" "}
                  <strong style={{ color: "skyblue" }}>
                    내부 BI·ML 지원을 위한 API 및 서빙 계층
                  </strong>
                  을 최적화합니다.
                </p>

                <p>
                  또한 데이터 엔지니어는{" "}
                  <strong style={{ color: "skyblue" }}>A형(추상화 중심)</strong>과{" "}
                  <strong style={{ color: "skyblue" }}>B형(구축 중심)</strong> 역할 모두 수행할 수 있으며,
                  상황에 따라{" "}
                  <strong style={{ color: "skyblue" }}>
                    SaaS 기반 관리형 서비스
                  </strong>
                  를 빠르게 도입하거나{" "}
                  <strong style={{ color: "skyblue" }}>맞춤형 데이터 플랫폼</strong>
                  을 직접 개발하기도 합니다.
                </p>

                <p>
                  더불어, 내부 이해관계자(데이터 분석가·데이터 과학자)와 외부 시스템(소셜 미디어, IoT 등) 모두를 고려해{" "}
                  <strong style={{ color: "skyblue" }}>데이터 소비자와 생산자를 잇는 허브</strong>
                  역할을 수행하기도 합니다.
                </p>

                <p>
                  결국 데이터 엔지니어의 활동은 단순한 파이프라인 구축을 넘어,{" "}
                  <strong style={{ color: "skyblue" }}>
                    조직의 데이터 성숙도를 끌어올리고 데이터 기반 의사결정을 가능하게 만드는 전략적 실행
                  </strong>
                  이라 할 수 있습니다.
                </p>
                
              </div>
            </div>

            {/* Chapter 2 */}
            <div className="mb-8 p-4 bg-muted/50 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">2장: 데이터 엔지니어링 생명 주기</h3>
                <h4 className="text-lg font-medium text-foreground mb-3">💬 데이터 엔지니어링의 수명 주기: “데이터 생성”</h4>

                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    데이터 생성은 데이터 엔지니어링 파이프라인의 시작점으로, 원천 시스템에서 최초로 데이터가 만들어지는 과정을 의미합니다. 기업 환경을 가정해보면, 데이터는 IoT 센서에서 실시간 이벤트로 발생하거나, 애플리케이션 로그와 메시지 큐를 통해 스트리밍되기도 하며, 트랜잭션 DB에 정형 데이터로 축적되기도 합니다. 따라서{" "} 
                    <strong style={{ color: "skyblue" }}>
                      데이터 엔지니어는 단순히 데이터가 존재하는 사실을 아는 것을 넘어, 데이터가 어떤 속도와 구조로 생성되는지, 품질 이슈 가능성이 있는지 이해
                    </strong>{" "} 
                    하는 것이 중요합니다. 이러한 이해는 이후의 수집, 저장, 변환 단계에서 설계 의사결정의 핵심 기준이 됩니다.
                  </p>

                  <p>
                    예를 들어, IoT 센서 데이터처럼 초당 수천 건의 이벤트가 발생하는 경우에는{" "} 
                    <strong style={{ color: "skyblue" }}>
                      스트리밍 파이프라인과 실시간 처리
                    </strong>{" "} 
                    가 필요하지만, ERP 시스템의 트랜잭션 데이터처럼 하루 단위로 집계되는 경우에는{" "} 
                    <strong style={{ color: "skyblue" }}>
                      배치 수집만으로 충분
                    </strong>{" "} 
                    할 수 있습니다. 따라서 데이터 생성 단계에서 발생원과 특성을 명확히 정의하는 것은{" "} 
                    <strong style={{ color: "skyblue" }}>
                      전체 데이터 파이프라인의 안정성과 품질 보장
                    </strong>{" "} 
                    에 핵심적인 역할을 합니다.
                  </p>

                  <p>
                    <strong style={{ color: "pink" }}>👉 키워드 → 원천시스템 / 데이터속성 </strong>
                  </p>


                  <p>
                    <br />
                  </p>

                  <h4 className="text-lg font-medium text-foreground mb-3">💬 데이터 엔지니어링의 수명 주기: “데이터 저장”</h4>
                  <p>
                    데이터 저장은 생성된 데이터를 안정적으로 보관하고, 향후 분석과 처리 과정에서 효율적으로 활용할 수 있도록 관리하는 단계입니다. 예를 들어, 금융 서비스 기업에서는 실시간 결제 데이터를 빠르게 조회하기 위해{" "} 
                    <strong style={{ color: "skyblue" }}>
                      데이터 웨어하우스
                    </strong>{" "} 
                    를 사용하고, 장기 로그 데이터는{" "} 
                    <strong style={{ color: "skyblue" }}>
                      객체 스토리지
                    </strong>{" "} 
                    에 적재하여 비용 효율성을 확보할 수 있습니다.
                  </p>

                  <p>
                    데이터 저장에서 중요한 근거는 선택한 스토리지 시스템이{" "} 
                    <strong style={{ color: "skyblue" }}>
                      읽기·쓰기 성능 요구사항을 충족하고, 확장성에 대응하며, 다운스트림 프로세스에서 병목을 발생시키지 않는가
                    </strong>{" "} 
                    에 있습니다. 또한 데이터의 온도(Hot, Warm, Cold)를 고려하여 자주 쓰이는 데이터는 고성능 스토리지에, 잘 쓰이지 않는 데이터는 아카이브 스토리지에 배치하는 것이 중요합니다.
                  </p>

                  <p>
                    추가적으로{" "} 
                    <strong style={{ color: "skyblue" }}>
                      스키마 진화, 메타데이터 관리, 데이터 계보 추적
                    </strong>{" "} 
                    은 단순 저장을 넘어 데이터 거버넌스와 규제 준수를 가능하게 하며, 이는 장기적으로 데이터 플랫폼의{" "} 
                    <strong style={{ color: "skyblue" }}>
                      신뢰성과 활용성
                    </strong>{" "} 
                    을 결정짓는 요소가 됩니다. 따라서 데이터 저장 단계는 단순한 보관이 아니라,{" "} 
                    <strong style={{ color: "skyblue" }}>
                      아키텍처 전체의 성능과 거버넌스 수준을 좌우하는 전략적 선택
                    </strong>{" "} 
                    이라고 할 수 있습니다.
                  </p>

                  <p>
                    <strong style={{ color: "pink" }}>👉 키워드 → 스토리지 / 성능 / 확장성 / Hot,Cold Data </strong>
                  </p>



                  <p>
                    <br />
                  </p>

                  <h4 className="text-lg font-medium text-foreground mb-3">💬 데이터 엔지니어링의 수명 주기: “데이터 수집”</h4>
                  <p>
                    데이터 수집은 원천 시스템에서 발생한 데이터를 안정적이고 효율적으로 취합하여 다운스트림 시스템에서 활용할 수 있도록 전달하는 단계입니다. 예를 들어, 실시간 금융 거래 모니터링 시스템에서는{" "} 
                    <strong style={{ color: "skyblue" }}>
                      스트리밍 수집
                    </strong>{" "} 
                    을 통해 밀리초 단위로 이벤트를 처리하고, 반대로 리포트용 고객 데이터 분석에서는{" "} 
                    <strong style={{ color: "skyblue" }}>
                      하루 단위 배치 수집
                    </strong>{" "} 
                    을 활용할 수 있습니다.
                  </p>

                  <p>
                    데이터 수집의 핵심 근거는{" "} 
                    <strong style={{ color: "skyblue" }}>
                      수집 방식(배치 vs 스트리밍), 수집 모델(푸시 vs 풀), 그리고 CDC
                    </strong>{" "} 
                    와 같은 기법을 어떤 아키텍처에 적용하느냐에 따라{" "} 
                    <strong style={{ color: "skyblue" }}>
                      데이터 신뢰성, 지연 시간, 운영 안정성
                    </strong>{" "} 
                    이 달라진다는 점입니다. 또한 수집된 데이터가 다운스트림 시스템의 처리 속도와 포맷 요구사항을 충족해야 하며,{" "} 
                    <strong style={{ color: "skyblue" }}>
                      장애 상황에서도 안정적으로 전달될 수 있는 내결함성
                    </strong>{" "} 
                    을 갖추는 것이 중요합니다.
                  </p>

                  <p>
                    현대 데이터 엔지니어링에서는{" "} 
                    <strong style={{ color: "skyblue" }}>
                      카프카(Kafka), 플링크(Flink), 스파크 스트리밍
                    </strong>{" "} 
                    과 같은 분산 스트리밍 플랫폼이 핵심 도구로 자리 잡고 있으며,{" "} 
                    <strong style={{ color: "skyblue" }}>
                      관리형 서비스(Pub/Sub, Kinesis)
                    </strong>{" "} 
                    를 통해 운영 복잡도를 줄이는 전략도 활용됩니다. 따라서 데이터 수집은 단순 데이터 이동이 아니라,{" "} 
                    <strong style={{ color: "skyblue" }}>
                      전체 데이터 파이프라인의 신뢰성과 실시간성을 결정짓는 핵심 단계
                    </strong>{" "} 
                    라고 할 수 있습니다.
                  </p>

                  <p>
                    <strong style={{ color: "pink" }}>👉 키워드 → 배치 / 스트리밍 / 푸시 / 풀 / CDC / 카프카 </strong> 
                  </p>

                  <p>
                    <br />
                  </p>

                  <h4 className="text-lg font-medium text-foreground mb-3">💬 데이터 엔지니어링의 수명 주기: “데이터 변환”</h4>
                  <p>
                    데이터 변환은 원천 데이터를 분석, 머신러닝, 비즈니스 활용에 적합한 형태로 가공하고 정제하는 과정입니다. 예를 들어, 이커머스 기업에서 고객 로그 데이터를 수집했을 때, 이를 단순한 JSON 원시 로그로는 분석하기 어렵기 때문에{" "} 
                    <strong style={{ color: "skyblue" }}>
                      정규화된 테이블 구조
                    </strong>{" "} 
                    로 변환하고, 불필요한 컬럼을 제거하거나{" "} 
                    <strong style={{ color: "skyblue" }}>
                      파생 컬럼 생성
                    </strong>{" "} 
                    과 같은 과정을 거칠 수 있습니다.
                  </p>

                  <p>
                    데이터 변환의 핵심 근거는{" "} 
                    <strong style={{ color: "skyblue" }}>
                      비즈니스 규칙과 분석 목적에 맞춰 데이터를 일관성 있게 가공
                    </strong>{" "} 
                    함으로써, 다운스트림 단계에서 즉시 활용 가능하도록 만드는 것입니다. 또한 변환 로직은{" "} 
                    <strong style={{ color: "skyblue" }}>
                      단순하고 모듈화
                    </strong>{" "} 
                    되어야 유지보수성이 높으며, 불필요한 연산을 줄여{" "} 
                    <strong style={{ color: "skyblue" }}>
                      성능과 비용 효율��
                    </strong>{" "} 
                    을 확보할 수 있습니다.
                  </p>

                  <p>
                    추가적으로, 데이터 변환은 배치 기반 ETL뿐만 아니라{" "} 
                    <strong style={{ color: "skyblue" }}>
                      실시간 스트리밍 파이프라인
                    </strong>{" "} 
                    에서도 적용되며,{" "} 
                    <strong style={{ color: "skyblue" }}>
                      Spark, Flink, dbt
                    </strong>{" "} 
                    같은 도구를 통해 자동화되고 관리됩니다. 나아가{" "} 
                    <strong style={{ color: "skyblue" }}>
                      스키마 진화와 데이터 품질 검증
                    </strong>{" "} 
                    을 통합하면 변환 단계는 단순한 가공을 넘어{" "} 
                    <strong style={{ color: "skyblue" }}>
                      데이터 신뢰성 보장
                    </strong>{" "} 
                    의 핵심 역할을 합니다.
                  </p>

                  <p>
                    <strong style={{ color: "pink" }}>👉 키워드 → ETL / Spark / Flink / dbt </strong>
                  </p>

                  <p>
                    <br />
                  </p>

                  <h4 className="text-lg font-medium text-foreground mb-3">💬 데이터 엔지니어링의 수명 주기: “데이터 서빙”</h4>
                  <p>
                    데이터 서빙은 데이터 엔지니어링 수명 주기의 마지막 단계로, 수집되고 저장된 데이터를 일관성 있고 유용한 구조로 변환한 뒤 실제 비즈니스 현장에서 활용할 수 있도록 제공하는 과정입니다. 이 단계의 핵심은 단순히 데이터를 보관하는 데 그치지 않고,{" "} 
                    <strong style={{ color: "skyblue" }}>
                      다양한 소비자가 데이터를 실제로 사용하여 가치로 전환하도록 만드는 것
                    </strong>{" "} 
                    에 있습니다.
                  </p>

                  <p>
                    기업은 이 단계에서 여러 형태의 서빙 방식을 사용합니다. 첫째,{" "} 
                    <strong style={{ color: "skyblue" }}>
                      비즈니스 인텔리전스(BI)
                    </strong>{" "} 
                    를 통해 경영진과 분석가가 기업의 과거와 현재 상황을 이해하고 전략을 수립할 수 있습니다. BI는 원시 데이터를 비즈니스 로직으로 가공하고, 리포트나 대시보드로 시각화하여 조직 전반에 배포합니다.
                  </p>

                  <p>
                    둘째,{" "} 
                    <strong style={{ color: "skyblue" }}>
                      운영 분석
                    </strong>{" "} 
                    은 재고나 웹 서비스 상태 같은 실시간 데이터를 모니터링하며, 사용자가 즉시 실행할 수 있는 행동을 촉진합니다.
                  </p>

                  <p>
                    셋째,{" "} 
                    <strong style={{ color: "skyblue" }}>
                      임베디드 분석
                    </strong>{" "} 
                    은 고객에게 직접 데이터를 제공하는 방식으로, 대규모 사용자에게 각자의 데이터만 안전하게 보여주는 것이 핵심입니다. 이 과정에서는{" "} 
                    <strong style={{ color: "skyblue" }}>
                      보안과 접근 제어
                    </strong>{" "} 
                    가 매우 중요합니다.
                  </p>

                  <p>
                    넷째,{" "} 
                    <strong style={{ color: "skyblue" }}>
                      머신러닝 서빙
                    </strong>{" "} 
                    에서는 데이터 과학자와 ML 엔지니어가 모델 학습과 예측에 활용할 수 있도록 품질 높은 데이터를 제공하는 것이 중요하며,{" "} 
                    <strong style={{ color: "skyblue" }}>
                      데이터셋이 실제 상황을 공정하게 반영하는지
                    </strong>{" "} 
                    와{" "} 
                    <strong style={{ color: "skyblue" }}>
                      편향 여부
                    </strong>{" "} 
                    가 검토 포인트가 됩니다.
                  </p>

                  <p>
                    특히 최근 데이터 서빙에서 점점 더 중요해지고 있는 개념은{" "} 
                    <strong style={{ color: "skyblue" }}>
                      역ETL
                    </strong>{" "} 
                    입니다. 역ETL은 데이터 웨어하우스나 데이터 레이크에서 처리된 분석 결과를 원천 시스템이나 SaaS 플랫폼으로 다시 공급하는 과정을 의미합니다. 예를 들어, 기업이 웨어하우스에서 고객 세분화 모델을 만든 뒤 CRM이나 CDP로 전달하여 영업팀이 마케팅 캠페인에 활용하거나, 광고 플랫폼에 맞춤형 데이터를 푸시하여 직접 광고 집행에 반영하는 경우가 있습니다. 역ETL은 단순 전송이 아니라{" "} 
                    <strong style={{ color: "skyblue" }}>
                      분석된 데이터를 비즈니스 프로세스 속으로 통합
                    </strong>{" "} 
                    하는 핵심 작업이며, SaaS 중심 현대 기업 환경에서 필수적인 요소입니다.
                  </p>

                  <p>
                    <strong style={{ color: "pink" }}>👉 키워드 → BI / 운영분석 / 임베디드분석 / ML서빙 / 역ETL / 데이터가치</strong>
                  </p>

                  <p>
                    <br />
                  </p>

                  <h4 className="text-lg font-medium text-foreground mb-3">💬 데이터 엔지니어링 수명 주기의 드러나지 않는 주요 요소</h4>

                  <h4>1️⃣ 보안 (Security)</h4>
                  <p>
                    데이터 엔지니어링에서 보안은 단순히 접근을 차단하는 것을 넘어{" "}
                    <strong style={{ color: "skyblue" }}>
                      데이터를 안전하게 저장하고 전송하며, 사용자의 권한을 최소화하는 원칙을 실천하는 것
                    </strong>
                    을 의미합니다. 즉, 시스템이 맡은 역할을 수행하는 데 필요한{" "}
                    <strong>최소한의 데이터와 자원만 접근</strong>할 수 있도록 제한해야 합니다.
                  </p>
                  <p>
                    이를 위해 <strong>암호화(Encryption)</strong>,
                    <strong> 토큰화(Tokenization)</strong>,
                    <strong> 데이터 마스킹(Data Masking)</strong>,
                    <strong> 난독화(Obfuscation)</strong> 등의 기법을 적용하여 데이터가 이동 중이든 저장 중이든
                    원치 않는 가시성으로부터 보호합니다.
                  </p>
                  <p>
                    또한 IAM(Identity and Access Management), 네트워크 보안, 암호 정책, 역할 기반 접근 제어(RBAC) 같은 체계적
                    보안 모델이 필요합니다. 결국 보안은 단순한 기술적 장치가 아니라{" "}
                    <strong style={{ color: "skyblue" }}>
                      데이터 엔지니어가 기본적으로 이해하고 실천해야 할 필수 문화이자 원칙
                    </strong>
                    입니다.
                  </p>

                  <h4>2️⃣ 데이터 관리 (Data Management)</h4>
                  <p>
                    데이터 관리는 데이터 자산이 전 생애주기 동안{" "}
                    <strong style={{ color: "skyblue" }}>가치 있게 활용되고 보호되도록 계획·감독하는 활동</strong>
                    입니다. 단순 저장과 변환만으로는 품질과 신뢰를 보장할 수 없으므로, 이를 위해
                    거버넌스, 품질 관리, 보안, 규제 준수가 필요합니다.
                  </p>
                  <p>
                    핵심은 <strong>데이터 거버넌스(Data Governance)</strong>입니다. 이는 발견 가능성, 보안, 책임성을 확보하는 것으로,{" "}
                    <strong>메타데이터 관리</strong>와 <strong>마스터 데이터 관리(MDM)</strong>가 대표적입니다.
                    메타데이터는 비즈니스, 기술, 운영, 참조 메타데이터로 구분되며, 데이터 검색과 제어의 기반이 됩니다.
                  </p>
                  <p>
                    MDM은 고객, 제품 같은 핵심 엔터티를 조직 전반에서 일관되게 관리하여 ‘골든 레코드’를 보장합니다.
                    또한 <strong>데이터 품질 관리(Data Quality Management)</strong>를 통해 정확성·완전성·적시성을 검증하고,
                    <strong>데이터 계보(Lineage)</strong>를 통해 생성·변환·활용 과정을 추적함으로써 오류 분석이나 규제 대응에 활용할 수 있습니다.
                  </p>
                  <p>
                    현대 환경에서는 다양한 SaaS·클라우드 간 API 기반 연동을 통해{" "}
                    <strong style={{ color: "skyblue" }}>
                      Salesforce → S3 → Snowflake → Spark
                    </strong>{" "}
                    와 같은 유연한 데이터 흐름을 구축하는 것도 중요합니다. 데이터는 단순히 저장되는 것이 아니라 연결되고 흘러야 합니다.
                  </p>
                  <p>
                    이와 더불어 <strong>수명 주기 관리(Lifecycle Management)</strong>와{" "}
                    <strong>윤리·보호(Ethics & Protection)</strong>도 필수입니다. 데이터는 수집·보존·파기까지 관리되어야 하며,
                    GDPR·CCPA 같은 규제를 준수해야 합니다. 특히 PII(개인 식별 정보) 같은 민감 데이터는 암호화나 마스킹으로 보호해야 하며,
                    데이터 편향 여부 또한 검토 대상입니다.
                  </p>
                  <p>
                    결론적으로 데이터 관리는{" "}
                    <strong style={{ color: "skyblue" }}>
                      거버넌스, 품질, 메타데이터, 계보, 통합, 수명 주기, 윤리와 보안을 종합적으로 다루는 활동
                    </strong>
                    으로, 조직이 데이터를 신뢰하고 비즈니스 가치를 창출할 수 있게 만드는 기반이라 할 수 있습니다.
                  </p>

                  <h4>3️⃣ 데이터옵스 (DataOps)</h4>
                  <p>
                    데이터옵스는{" "}
                    <strong style={{ color: "skyblue" }}>
                      애자일(Agile) 방법론, 데브옵스(DevOps), 통계적 공정관리(SPC)
                    </strong>{" "}
                    의 모범 사례를 데이터 관리에 적용한 접근법입니다.
                    소프트웨어 제품이 기능과 서비스를 제공하듯, 데이터 제품은{" "}
                    <strong style={{ color: "skyblue" }}>
                      의사결정과 모델링에 필요한 정확한 비즈니스 로직과 지표
                    </strong>
                    를 제공합니다.
                  </p>
                  <p>
                    데이터옵스의 핵심은{" "}
                    <strong>자동화(Automation), 관찰 가능성(Observability), 사고 대응(Incident Response)</strong>입니다.
                    자동화를 통해 데이터 변환 및 파이프라인의 일관성과 신뢰성을 확보하고, CI/CD, 코드 기반 워크플로, 버전 관리 등을 통합합니다.
                  </p>
                  <p>
                    복잡한 파이프라인 환경에서는 Airflow, Dagster 같은 오케스트레이션 도구가 필요하며, 이는 업스트림 데이터 준비 여부를 인식해
                    종속 작업을 자동 실행합니다. 이를 통해 안정성과 효율성이 크게 향상됩니다.
                  </p>
                  <p>
                    또 다른 핵심은{" "}
                    <strong style={{ color: "skyblue" }}>DODD(Data Observability Driven Development)</strong>
                    입니다. TDD(Test Driven Development)처럼 데이터 가치 사슬 전 단계에서 데이터를 가시화하고, 변경 사항을 추적하며, 문제를 사전에
                    감지할 수 있도록 설계하는 방법론입니다.
                  </p>
                  <p>
                    데이터옵스의 성숙한 조직은 이러한 자동화·관찰 가능성·사고 대응 체계를 바탕으로{" "}
                    <strong>데이터 품질 저하, 시스템 오류, 모델 드리프트</strong> 같은 문제를 사전에 최소화합니다.
                  </p>

                  <h4>4️⃣ 데이터 아키텍처 (Data Architecture)</h4>
                  <p>
                    데이터 아키텍처란{" "}
                    <strong style={{ color: "skyblue" }}>
                      원천 시스템에서 데이터 수집, 저장, 변환, 서빙까지 데이터가 이동하고 활용되는 전체 구조를 설계하고 최적화하는 과정
                    </strong>
                    을 의미합니다. 여기에는 성능, 비용, 확장성, 유지보수성을 균형 있게 고려한 설계가 필요합니다.
                  </p>
                  <p>
                    중요한 것은 기술 중심이 아니라{" "}
                    <strong style={{ color: "skyblue" }}>비즈니스 가치 중심의 설계</strong>
                    라는 점입니다. 처리 속도와 비용, 데이터 품질 사이의 트레이드오프를 이해하고, 새로운 요구사항에도 유연하게 대응할 수 있어야 합니다.
                  </p>
                  <p>
                    데이터 엔지니어는 데이터 아키텍트가 설계한 구조를 구현하면서 실무에서 발생한 문제와 개선점을 피드백하여,
                    전체 아키텍처를 지속적으로 발전시킵니다. 따라서 데이터 아키텍처는{" "}
                    <strong style={{ color: "skyblue" }}>기술·설계·비즈니스 가치·민첩성</strong>
                    이 결합된 전략적 영역입니다.
                  </p>

                  <h4>5️⃣ 오케스트레이션 (Orchestration)</h4>
                  <p>
                    오케스트레이션은{" "}
                    <strong style={{ color: "skyblue" }}>
                      여러 데이터 작업이 순서대로, 효율적으로, 안정적으로 실행되도록 조정하는 프로세스
                    </strong>
                    입니다. 일반적으로 DAG(Directed Acyclic Graph) 형태로 종속성을 정의하고,
                    작업이 완료될 때 후속 작업을 자동으로 실행하도록 스케줄링합니다.
                  </p>
                  <p>
                    고급 오케스트레이션 엔진은 실행 기록, 시각화, 경고 기능을 제공하며,
                    새로운 DAG나 작업이 추가될 때{" "}
                    <strong>백필(Backfill)</strong>과 시간 기반 종속성 관리도 지원합니다.
                    대표적인 예로{" "}
                    <strong>Prefect, Dagster, Argo, Metaflow</strong>
                    등이 있으며, 이는 로컬 개발에서 운영 환경으로의 이식성과 유연성을 높여줍니다.
                  </p>
                  <p>
                    결국 오케스트레이션은{" "}
                    <strong style={{ color: "skyblue" }}>
                      복잡한 데이터 파이프라인의 종속성과 실행 순서를 보장하며, 운영을 투명하고 안정적으로 만드는 핵심 기술
                    </strong>
                    입니다.
                  </p>

                  <h4>6️⃣ 소프트웨어 엔지니어링 (Software Engineering)</h4>
                  <p>
                    데이터 엔지니어링에서 소프트웨어 엔지니어링은{" "}
                    <strong style={{ color: "skyblue" }}>
                      데이터를 효율적이고 안정적으로 처리할 수 있는 소프트웨어를 설계·구현·테스트·운영하는 기술과 방법론
                    </strong>
                    을 의미합니다. 과거에는 Java, C++로 MapReduce를 직접 구현했지만,
                    현재는 Spark, Beam, Flink 같은 고수준 프레임워크로 생산성과 안정성을 높입니다.
                  </p>
                  <p>
                    데이터 엔지니어는{" "}
                    <strong>수집, 변환, 서빙 등 데이터 처리 전반의 핵심 코드를 작성</strong>
                    해야 하며, 단위 테스트, 회귀 테스트, 통합 테스트, E2E 테스트 등
                    다양한 테스트 방법론으로 코드 품질을 보장합니다.
                  </p>
                  <p>
                    또한{" "}
                    <strong>오픈소스 프레임워크 활용 능력</strong>과{" "}
                    <strong>IaC(코드형 인프라)</strong>,{" "}
                    <strong>코드형 파이프라인</strong> 설계 역량이 필수입니다.
                    Terraform, CloudFormation 등을 사용해 인프라를 자동 배포하고 관리하며,
                    CI/CD 파이프라인을 통해{" "}
                    <strong style={{ color: "skyblue" }}>버전 제어와 배포의 일관성</strong>
                    을 유지합니다.
                  </p>
                  <p>
                    마지막으로,{" "}
                    <strong style={{ color: "skyblue" }}>
                      범용 문제 해결 능력
                    </strong>
                    도 데이터 엔지니어의 핵심 역량입니다. Airbyte, Fivetran, Matillion 같은 커넥터가 지원하지 않는
                    소스의 경우, API 분석과 데이터 풀링, 예외 처리를 직접 구현해야 합니다.
                  </p>

                </div>
            </div>

            {/* Chapter 3 */}
            <div className="mb-4 p-4 bg-muted/50 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">3장</h3>
                  <h4 className="text-lg font-medium text-foreground mb-3">💬 데이터 아키텍처 설계의 중요한 3요소</h4>
                
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    데이터 아키텍처 설계에서 가장 중요한 세 가지 핵심 요소는{" "}
                    <strong style={{ color: "skyblue" }}>Scalability</strong>,{" "}
                    <strong style={{ color: "skyblue" }}>Availability</strong>,{" "}
                    그리고{" "}
                    <strong style={{ color: "skyblue" }}>Reliability</strong>{" "}
                    입니다.
                  </p>

                  <p>
                    <strong style={{ color: "skyblue" }}>Scalability</strong> 는 데이터 양이나 사용자 수가
                    증가하더라도{" "}
                    <strong>시스템 성능이 저하되지 않고 유연하게 확장될 수 있는 능력</strong>을 의미합니다. 
                    특히 클라우드 환경에서는{" "}
                    <strong>자동 스케일링(Auto Scaling)</strong> 기능을 활용해 컴퓨팅 자원과 스토리지를
                    동적으로 조정함으로써, 비용 효율적이면서도 확장성 있는 인프라를 구현할 수 있습니다.
                  </p>

                  <p>
                    <strong style={{ color: "skyblue" }}>Availability</strong> 는 시스템이{" "}
                    <strong>언제나 안정적으로 서비스를 제공할 수 있는 능력</strong>을 의미하며,
                    장애가 발생하더라도 서비스 중단을 최소화해야 합니다. 이를 위해{" "}
                    <strong>멀티존 배포</strong>,{" "}
                    <strong>리던던시 구조</strong>,{" "}
                    <strong>클러스터링</strong> 등을 활용해 고가용성을 확보합니다.
                  </p>

                  <p>
                    <strong style={{ color: "skyblue" }}>Reliability</strong> 는 데이터 처리와 저장 과정에서{" "}
                    <strong>오류 없이 일관되고 신뢰성 있게 동작하는 능력</strong>을 말합니다. 
                    이를 위해{" "}
                    <strong>백업 및 데이터 복제</strong>,{" "}
                    <strong>장애 복구(Disaster Recovery)</strong> 전략 등을 통해 데이터 손실이나 손상을
                    최소화해야 합니다.
                  </p>

                  <p>
                    따라서 데이터 아키텍처 설계는{" "}
                    <strong style={{ color: "skyblue" }}>
                      클라우드 기반의 확장성, 가용성, 신뢰성을 균형 있게 확보하는 것
                    </strong>{" "}
                    에 초점을 두어야 하며, 이를 통해 안정적인 데이터 플랫폼 운영과 지속 가능한 확장을 가능하게 합니다.
                  </p>

                  <p>
                    <strong style={{ color: "pink" }}>👉 키워드 →{" "}
                    Scalability / Availability / Reliability</strong>
                  </p>
                  <p>
                    <br />
                  </p>
                </div>
            </div>
          </section>

          {/* 느낀점 Section */}
          <section className="bg-card rounded-lg p-6 border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              느낀점
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                이 책은 데이터 엔지니어링의 방대한 영역을 체계적으로 정리하고, 각 개념에 대한 깊이 있는 설명과 함께
                실질적인 아키텍처 설계 원칙 및 기술 선택 가이드라인을 제공합니다. 특히, 데이터 수명 주기 전반에 걸친
                고려사항과 최신 트렌드를 균형 있게 다루고 있어, 데이터 엔지니어로서 갖춰야 할 지식과 관점을 넓히는 데
                매우 유용했습니다. 단순히 기술적인 내용을 나열하는 것을 넘어, 비즈니스 가치와 비용 효율성을 고려한
                의사결정의 중요성을 강조하는 부분이 인상 깊었습니다. 데이터 엔지니어링 분야의 입문자부터 경험자까지
                모두에게 추천할 만한 책입니다.
              </p>
            </div>
          </section>
        </div>

        {/* Back to Books */}
        <div className="mt-12 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            다른 책 둘러보기
          </Link>
        </div>
      </div>
    </div>
  )
}
