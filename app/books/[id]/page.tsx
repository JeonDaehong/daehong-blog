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
              <h3 className="text-xl font-semibold text-foreground mb-4">2장</h3>
              {/* 내용을 여기에 추가하세요 */}
            </div>

            {/* Chapter 3 */}
            <div className="mb-4 p-4 bg-muted/50 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-4">3장</h3>
              {/* 내용을 여기에 추가하세요 */}
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
