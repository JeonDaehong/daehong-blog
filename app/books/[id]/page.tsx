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
                효과적으로 관리하는 것이 최상위 목표라 할 수 습니다.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                이 책은 "어떻게 하면 비즈니스에 진정한 가치를 더하는 데이터 엔지니어가 될 수 있을까?" 그리고 "데이터
                엔지니어로서 고려해야 할 핵심 요소들은 무엇인가?" 등의 본질적인 질문에 대한 깊이 있는 통찰을 제공합니다.
                이 책에서 탐구하는 데이터 엔지니어의 역할은 더욱 정확하게는 '데이터 수명주기 엔지니어'라고 칭할 수 있을
                만큼 전반적이고 종합적인 관점을 제시합니다.
              </p>
            </div>
          </section>

          {/* 1. 데이터 엔지니어링 개요 Section */}
          <section className="bg-card rounded-lg p-6 border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              1. 데이터 엔지니어링 수명 주기 정의
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                데이터 엔지니어링 수명 주기는 원시 데이터의 요소를 분석가, 데이터 과학자, ML 엔지니어 등이 사용할 수
                있는 유용한 최종 제품으로 전환하는 단계로 구성됨.
              </p>
            </div>
          </section>

          {/* 2. 데이터 엔지니어링의 발전 과정 Section */}
          <section className="bg-card rounded-lg p-6 border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              2. 데이터 엔지니어링의 발전 과정
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-2">1980년대: 데이터 웨어하우징의 시작</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    1980년대 데이터 웨어하우스라는 용어가 형성되고 1989년 빌 인먼이 '데이터 웨어하우스'라는 용어 공식화.
                    IBM의 엔지니어들이 관계형 데이터베이스(RDBMS)와 SQL 개발하였으며 오라클이 이 기술 대중화.
                    BI(비즈니스 인텔리전스) 도구와 데이터 파이프라인의 필요성 증가되고 랄프 킴벌과 빌 인먼, 데이터
                    모델링 기법 개발.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-2">1990년대: 인터넷과 웹 우선 기업의 탄생</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    1990년대 중반: 인터넷이 주류가 되며 AOL, 야후, 아마존 등 웹 우선 기업 탄생. 닷컴 열풍으로 웹
                    애플리케이션과 백엔드 시스템에 활동 증가.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-2">
                    2000년대 초: 현대 데이터 엔지니어링의 시작
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    닷컴 열풍 이후 야후, 구글, 아마존 등이 강력한 기술 기업으로 성장했고 범용 하드웨어의 저렴화와 대규모
                    분산 컴퓨팅 클러스터의 발전. 2003년: 구글, 구글 파일 시스템 논문 발표. 2004년: 구글, 맵리듀스 논문
                    발표. 2006년: 야후 엔지니어들이 아파치 하둡 개발 및 오픈소스화. 아마존, AWS 개발 및 클라우드 시장
                    혁신.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-2">2000년대와 2010년대: 빅데이터 엔지니어링</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    하둡 생태계와 오픈소스 빅데이터 도구의 성숙. 실시간 빅데이터 분석의 새 시대 개막. 빅데이터
                    엔지니어의 등장과 데이터 전달의 중요성 증가.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-2">
                    2020년대: 데이터 수명 주기를 위한 엔지니어링
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    데이터 엔지니어링의 모듈화, 분산, 고도의 추상화. 데이터 엔지니어의 역할, 보안, 데이터 관리,
                    데이터옵스, 아키텍처, 오케스트레이션으로 확장. CCPA, GDPR 등 데이터 프라이버시 및 규정 준수에 대한
                    중요성 증가.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. 데이터 엔지니어링이란? Section */}
          <section className="bg-card rounded-lg p-6 border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              3. 데이터 엔지니어링이란?
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">데이터 엔지니어링의 정의</h4>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    데이터 엔지니어링은 데이터 과학자, 데이터 분석가, 비즈니스 인텔리전스 개발자, 그리고 조직 내의 다른
                    전문가가 데이터를 사용할 수 있도록 만드는 일련의 작업입니다. 원시 데이터(raw data)를 가져와 분석 및
                    머신러닝과 같은 다운스트림 사용 사례를 지원하는, 고품질의 일관된 정보를 시스템과 프로세스의 개발,
                    구현 및 유지 관리라고 할 수 있습니다.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    데이터 엔지니어링은 보안, 데이터 관리, 데이터 운영, 데이터 아키텍처, 오케스트레이션, 소프트웨어
                    엔지니어링의 교차점에 위치합니다.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">데이터 엔지니어링 수명 주기</h4>
                  <div className="bg-muted/30 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-center">
                      <div className="bg-primary/10 rounded px-3 py-2 text-sm font-medium">데이터 생성</div>
                      <div className="bg-primary/10 rounded px-3 py-2 text-sm font-medium">데이터 저장</div>
                      <div className="bg-primary/10 rounded px-3 py-2 text-sm font-medium">데이터 수집</div>
                      <div className="bg-primary/10 rounded px-3 py-2 text-sm font-medium">데이터 변환</div>
                      <div className="bg-primary/10 rounded px-3 py-2 text-sm font-medium">데이터 서빙</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    데이터 엔지니어링 수명 주기는 전체 수명 주기에 걸쳐 중요한 아이디어인 드러나지 않는
                    요소(undercurrent)라는 개념을 포함합니다. 여기에는 보안, 데이터 관리, 데이터옵스, 데이터 아키텍처,
                    오케스트레이션, 소프트웨어 엔지니어링이 포함됩니다.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">데이터 성숙도와 데이터 엔지니어</h4>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    데이터 성숙도(data maturity)는 조직 전체에 걸쳐 더 높은 데이터 활용률, 기능, 통합을 향해 나아가는
                    과정입니다.
                  </p>

                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h5 className="font-medium text-foreground mb-2">1단계: 데이터로 시작하기</h5>
                      <p className="text-sm text-muted-foreground">
                        적절한 데이터 아키텍처 정의, 기업의 목표를 지원하는 데이터 아키텍처 설계 및 구축
                      </p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h5 className="font-medium text-foreground mb-2">2단계: 데이터로 확장하기</h5>
                      <p className="text-sm text-muted-foreground">
                        공식적인 데이터 관행 수립, 확장성 있고 견고한 데이터 아키텍처 구축, 데브옵스 및 데이터옵스 관행
                        채택
                      </p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h5 className="font-medium text-foreground mb-2">3단계: 데이터로 선도하기</h5>
                      <p className="text-sm text-muted-foreground">
                        자동화 구축, 경쟁 우위로서 데이터 활용, 데이터 관리 및 데이터옵스에 집중, 조직 전체 협업 환경
                        구축
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">데이터 엔지니어의 유형</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">A형 데이터 엔지니어 (추상화)</h5>
                      <p className="text-sm text-muted-foreground">
                        시판되는 기성 제품, 관리형 서비스와 도구들을 사용해 데이터 엔지니어링 수명 주기를 관리.
                        차별화되지 않은 과중한 작업을 피하고 단순하게 유지.
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">B형 데이터 엔지니어 (구축)</h5>
                      <p className="text-sm text-muted-foreground">
                        기업의 핵심 역량과 경쟁 우위를 확장하고 활용할 데이터 도구와 시스템을 구축. 맞춤형 데이터 도구
                        개발에 집중.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">주요 기술 스택</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-foreground mb-1">핵심 언어</h5>
                      <p className="text-sm text-muted-foreground">SQL (가장 중요), Python, Java, Scala, Bash</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground mb-1">플랫폼 및 도구</h5>
                      <p className="text-sm text-muted-foreground">
                        Apache Spark, Hadoop, Kafka, Airflow, 클라우드 서비스 (AWS, GCP, Azure)
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground mb-1">데이터베이스</h5>
                      <p className="text-sm text-muted-foreground">
                        관계형 DB, NoSQL, 데이터 웨어하우스, 데이터 레이크
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">조직 내 역할과 협업</h4>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    데이터 엔지니어는 데이터 생산자(소프트웨어 엔지니어, 데이터 아키텍트, DevOps 엔지니어)와 데이터
                    소비자(데이터 분석가, 데이터 과학자, ML 엔지니어) 사이에서 허브 역할을 수행합니다.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-foreground mb-2">업스트림 협업</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 데이터 아키텍트: 전체 데이터 전략 수립</li>
                        <li>• 소프트웨어 엔지니어: 내부 데이터 생성</li>
                        <li>• DevOps/SRE: 운영 모니터링</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground mb-2">다운스트림 지원</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 데이터 과학자: ML 모델 개발 지원</li>
                        <li>• 데이터 분석가: BI 및 리포팅 지원</li>
                        <li>• ML 엔지니어: 모델 운영 인프라 제공</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. 데이터 엔지니어링 수명 주기 Section */}
          <section className="bg-card rounded-lg p-6 border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              4. 데이터 엔지니어링 수명 주기
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">데이터 엔지니어링 수명 주기란?</h4>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    데이터 엔지니어링 수명 주기는 원시 데이터의 요소를 분석가, 데이터 과학자, ML 엔지니어 등이 사용할 수
                    있는 유용한 최종 제품으로 전환하는 단계로 구성됩니다.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">📊 데이터 생성</h4>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    원천 시스템(source system)은 데이터 엔지니어링 수명 주기에서 사용되는 데이터의 원본입니다. 예를 들어
                    원천 시스템은 IoT 장치, 애플리케이션 메시지 대기열 또는 트랜잭션 데이터베이스일 수 있습니다.
                  </p>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h5 className="font-medium text-foreground mb-2">원천 시스템 평가 시 고려사항</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 데이터 원천의 본질적 특징과 데이터 유지 방식</li>
                      <li>• 데이터 생성 속도와 일관성 수준</li>
                      <li>• 에러 발생 빈도와 중복 데이터 포함 여부</li>
                      <li>• 스키마 구조와 변경 시 대응 방안</li>
                      <li>• 상태가 있는 시스템의 경우 CDC(변경 데이터 캡처) 방식</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">💾 데이터 저장</h4>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    스토리지 시스템을 선택할 때는 아키텍처 요구사항과의 적합성, 확장성, 다운스트림 프로세스와의 호환성을
                    고려해야 합니다.
                  </p>
                  <div className="bg-muted/30 rounded-lg p-4 mb-4">
                    <h5 className="font-medium text-foreground mb-2">데이터 온도별 분류</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="text-sm">
                          <strong>핫 데이터:</strong> 가장 자주 액세스되는 데이터 (하루 여러 번)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="text-sm">
                          <strong>미온적 데이터:</strong> 가끔 액세스되는 데이터 (매주/매월)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className="text-sm">
                          <strong>콜드 데이터:</strong> 거의 쿼리되지 않는 아카이브 데이터
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">🔄 데이터 수집</h4>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    수집 단계에서는 데이터의 사용 사례, 안정성, 형식, 접근 빈도 등을 고려해야 합니다.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">배치 수집</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        미리 설정된 시간 간격이나 크기 임계값에 따라 데이터를 큰 청크로 처리하는 방식
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• 레거시 시스템에서 주로 사용</li>
                        <li>• 분석 및 ML에서 인기</li>
                        <li>• 지연 시간 제한 존재</li>
                      </ul>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">스트리밍 수집</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        실시간으로 연속해서 데이터를 다운스트림 시스템에 제공하는 방식
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• 실시간 처리 가능</li>
                        <li>• 높은 복잡성과 비용</li>
                        <li>• 안정성과 다중화 필요</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h5 className="font-medium text-foreground mb-2">푸시 vs 풀 모델</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">푸시 모델</p>
                        <p className="text-xs text-muted-foreground">원천 시스템이 타깃에 데이터를 직접 전송</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">풀 모델</p>
                        <p className="text-xs text-muted-foreground">수집 시스템이 원천에서 데이터를 검색</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">⚙️ 데이터 변환</h4>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    변환 단계에서는 비용과 투자수익률(ROI), 비즈니스 가치를 고려하여 가능한 한 단순하고 독립적인 변환을
                    구현해야 합니다.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">📈 데이터 서빙</h4>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    데이터를 수집하고 저장한 뒤 일관성 있고 유용한 구조로 변환했으니, 이제 데이터로부터 가치를 창출할
                    때입니다.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">분석 유형</h5>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-foreground">비즈니스 인텔리전스(BI)</p>
                          <p className="text-xs text-muted-foreground">
                            기업 경영의 과거와 현재 상태를 설명하기 위해 데이터를 수집
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">운영 분석</p>
                          <p className="text-xs text-muted-foreground">
                            운영의 상세 사항에 중점을 두고 즉시 수행할 수 있는 작업을 촉진
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">임베디드 분석</p>
                          <p className="text-xs text-muted-foreground">고객 대면 분석으로 접근 제어가 매우 중요</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">머신러닝 서빙</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 신뢰할 수 있는 특성 엔지니어링을 위한 충분한 품질의 데이터</li>
                        <li>• 데이터 검색 가능성과 편향성 검토</li>
                        <li>• 데이터 엔지니어링과 ML 엔지니어링 간의 경계 설정</li>
                      </ul>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">역 ETL</h5>
                      <p className="text-sm text-muted-foreground">
                        처리한 데이터를 가져와 원천 시스템에 다시 공급하는 방식으로, SaaS 플랫폼 의존도가 높아지면서
                        중요성이 증가
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">🔒 드러나지 않는 주요 요소</h4>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    데이터 엔지니어링 수명 주기 전체에 걸쳐 작용하는 핵심 요소들입니다.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-muted/30 rounded-lg p-3">
                        <h5 className="font-medium text-foreground mb-1">보안</h5>
                        <p className="text-xs text-muted-foreground">접근 제어, 암호화, 토큰화, 데이터 마스킹</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <h5 className="font-medium text-foreground mb-1">데이터 관리</h5>
                        <p className="text-xs text-muted-foreground">거버넌스, 발견 가능성, 정의, 책임, 모델링</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <h5 className="font-medium text-foreground mb-1">데이터옵스</h5>
                        <p className="text-xs text-muted-foreground">자동화, 모니터링, 관찰 가능성, 사건 보고</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-muted/30 rounded-lg p-3">
                        <h5 className="font-medium text-foreground mb-1">데이터 아키텍처</h5>
                        <p className="text-xs text-muted-foreground">설계 패턴, 기술 트레이드오프, 비즈니스 가치</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <h5 className="font-medium text-foreground mb-1">오케스트레이션</h5>
                        <p className="text-xs text-muted-foreground">워크플로 조정, 작업 스케줄링, DAG 관리</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <h5 className="font-medium text-foreground mb-1">소프트웨어 엔지니어링</h5>
                        <p className="text-xs text-muted-foreground">프로그래밍, 디자인 패턴, 테스트, 디버깅</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">📊 메타데이터의 중요성</h4>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    메타데이터는 데이터에 관한 데이터로 데이터 엔지니어링 수명 주기의 모든 부분을 뒷받침합니다.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">비즈니스 메타데이터</h5>
                      <p className="text-sm text-muted-foreground">
                        비즈니스와 데이터 정의, 데이터 규칙과 로직, 데이터 사용 방법과 소유자
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">기술 메타데이터</h5>
                      <p className="text-sm text-muted-foreground">
                        데이터 모델과 스키마, 데이터 계보, 필드 매핑, 파이프라인 워크플로우
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">운영 메타데이터</h5>
                      <p className="text-sm text-muted-foreground">
                        프로세스, 작업 ID, 런타임 로그, 사용 데이터, 오류 로그 통계
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">참조 메타데이터</h5>
                      <p className="text-sm text-muted-foreground">다른 데이터를 분류하는 데 필요한 조회 데이터</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">🔄 데이터옵스의 핵심 요소</h4>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    데이터옵스는 애자일 방법론, 데브옵스, 통계적 공정 관리의 모범사례를 데이터에 매핑한 것입니다.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">자동화(Automation)</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        데이터옵스 프로세스의 신뢰성과 일관성을 보장하며, 새로운 제품 기능을 신속하게 구현
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• 변경 관리 (환경, 코드, 데이터 버전 제어)</li>
                        <li>• 지속적 통합 배포 (CI/CD)</li>
                        <li>• 코드형 인프라 (IaC)</li>
                      </ul>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">관찰 가능성과 모니터링</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        DODD(Data Observability-Driven Development) 방법론을 통한 데이터 가시성 확보
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• 데이터 품질 모니터링</li>
                        <li>• 데이터/모델 드리프트 감지</li>
                        <li>• 메타데이터 무결성 검증</li>
                      </ul>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">사고 대응(Incident Response)</h5>
                      <p className="text-sm text-muted-foreground">
                        자동화 및 관찰 가능성 기능을 사용해 사고의 근본 원인을 신속하게 특정하고 해결
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 우수한 데이터 아키텍처 설계 Section */}
          <section className="bg-card rounded-lg p-6 border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              5. 우수한 데이터 아키텍처 설계
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">데이터 아키텍처란?</h4>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    데이터 아키텍처는 기업의 진화하는 데이터 요구 사항을 지원하는 시스템 설계로, 트레이드오프에 대한
                    신중한 평가를 통해 유연하고 되돌릴 수 있는 결정을 내림으로써 실현됩니다.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">운영 아키텍처</h5>
                      <p className="text-sm text-muted-foreground">
                        인력, 프로세스 및 기술과 관련한 필요 기능의 요건을 포괄. 무엇을 해야하는지 설명
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">기술 아키텍처</h5>
                      <p className="text-sm text-muted-foreground">
                        데이터 엔지니어링 수명 주기를 통해 데이터를 수집, 저장, 변환 및 제공하는 방법을 개략적으로 설명.
                        어떻게 해야하는지를 자세히 설명
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">가역적 의사결정의 중요성</h4>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    세상은 끊임없이 변화하며 미래를 예측하기란 불가능합니다. 가역적 의사결정은 세상의 변화와 새로운 정보
                    수집에 따라서 프로세스를 조정할 수 있게 해줍니다.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                      <h5 className="font-medium text-foreground mb-2">단방향 의사결정 (One-way Door)</h5>
                      <p className="text-sm text-muted-foreground">되돌릴 수 없는 결정으로 신중한 검토가 필요</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                      <h5 className="font-medium text-foreground mb-2">양방향 의사결정 (Two-way Door)</h5>
                      <p className="text-sm text-muted-foreground">쉽게 되돌릴 수 있는 결정으로 빠른 실험 가능</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">우수한 데이터 아키텍처의 9가지 원칙</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                        <h5 className="font-medium text-foreground mb-2">1. 공통 컴포넌트를 현명하게 선택하라</h5>
                        <p className="text-sm text-muted-foreground">
                          조직 전체에서 널리 쓸 수 있는 컴포넌트와 관행을 선택. 객체 스토리지, 버전 제어, 모니터링
                          시스템 등
                        </p>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                        <h5 className="font-medium text-foreground mb-2">2. 장애에 대비하라</h5>
                        <p className="text-sm text-muted-foreground">
                          가용성, 신뢰성, RTO(복구 시간 목표), RPO(복구 시점 목표) 고려
                        </p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                        <h5 className="font-medium text-foreground mb-2">3. 확장성을 위한 아키텍처를 설계하라</h5>
                        <p className="text-sm text-muted-foreground">
                          스케일 업/다운, 탄력적 시스템, 0으로 확장 가능한 서버리스 시스템 활용
                        </p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                        <h5 className="font-medium text-foreground mb-2">4. 아키텍처는 리더십이다</h5>
                        <p className="text-sm text-muted-foreground">
                          현재 데이터 엔지니어를 지도하고, 조직과 협의해 신중하게 기술을 선택
                        </p>
                      </div>
                      <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
                        <h5 className="font-medium text-foreground mb-2">5. 항상 아키텍처에 충실하라</h5>
                        <p className="text-sm text-muted-foreground">
                          기본 아키텍처 지식 개발, 목표 아키텍처 개발, 시퀀싱 계획 수립
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-teal-50 dark:bg-teal-950/20 rounded-lg p-4 border border-teal-200 dark:border-teal-800">
                        <h5 className="font-medium text-foreground mb-2">6. 느슨하게 결합된 시스템을 구축하라</h5>
                        <p className="text-sm text-muted-foreground">
                          팀이 다른 팀에 의존하지 않고도 시스템을 테스트, 배포, 변경할 수 있도록 설계
                        </p>
                      </div>
                      <div className="bg-pink-50 dark:bg-pink-950/20 rounded-lg p-4 border border-pink-200 dark:border-pink-800">
                        <h5 className="font-medium text-foreground mb-2">7. 되돌릴 수 있는 의사결정을 하라</h5>
                        <p className="text-sm text-muted-foreground">
                          아키텍처를 단순화하고 민첩성을 유지하려면 돌이킬 수 있는 의사결정을 목표로 삼아야 함
                        </p>
                      </div>
                      <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                        <h5 className="font-medium text-foreground mb-2">8. 보안 우선순위를 지정하라</h5>
                        <p className="text-sm text-muted-foreground">제로 트러스트 보안 모델, 공동 책임 모델 채택</p>
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                        <h5 className="font-medium text-foreground mb-2">9. 핀옵스를 수용하라</h5>
                        <p className="text-sm text-muted-foreground">
                          엔지니어링, 재무, 기술 및 비즈니스 팀이 데이터 기반 지출 결정을 위해 협업
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">주요 아키텍처 개념</h4>

                  <div className="space-y-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">분산 시스템의 4가지 특징</h5>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">확장성 (Scalability)</p>
                          <p className="text-xs text-muted-foreground">
                            시스템의 용량을 늘려 성능을 개선하고 수요를 처리
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">탄력성 (Elasticity)</p>
                          <p className="text-xs text-muted-foreground">
                            현재 워크로드에 따라 자동으로 스케일 업과 다운 수행
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">가용성 (Availability)</p>
                          <p className="text-xs text-muted-foreground">
                            IT 서비스 또는 컴포넌트가 작동 가능한 상태에 있는 시간의 비율
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">신뢰성 (Reliability)</p>
                          <p className="text-xs text-muted-foreground">
                            지정된 간격 동안 의도한 기능을 수행할 때 정의된 표준을 충족할 가능성
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">강한 결합 vs 느슨한 결합</h5>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">강한 결합 (Tight Coupling)</p>
                          <p className="text-xs text-muted-foreground">
                            도메인과 서비스의 모든 부분이 다른 모든 도메인과 서비스에 필수적으로 의존
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">느슨한 결합 (Loose Coupling)</p>
                          <p className="text-xs text-muted-foreground">
                            서로 온전히 의존하지 않는 분산형 도메인과 서비스
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">아키텍처 계층</h5>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">단일 계층 아키텍처</p>
                          <p className="text-xs text-muted-foreground">
                            데이터베이스와 애플리케이션이 밀접하게 연결되어 단일 서버에 상주. 프로토타이핑에는 좋지만
                            운영 환경에서는 권장되지 않음
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">3계층 아키텍처</p>
                          <p className="text-xs text-muted-foreground">
                            데이터, 애플리케이션 로직 및 프레젠테이션 계층으로 구성. 각 계층은 다른 계층과 서로 격리되어
                            리스크를 분리
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">데이터 아키텍처의 사례 및 유형</h4>

                  <div className="space-y-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">데이터 웨어하우스</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        보고 및 분석에 사용되는 중앙 데이터 허브로, 가장 오래되고 잘 확립된 데이터 아키텍처
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• MPP(대규모 병렬 처리) 시스템으로 고성능 집계 및 통계 계산 수행</li>
                        <li>• ETL/ELT 프로세스를 통한 데이터 중앙 집중화 및 구성</li>
                        <li>• 클라우드 데이터 웨어하우스: 컴퓨팅과 스토리지 분리, 온디맨드 확장</li>
                      </ul>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">데이터 레이크</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        모든 크기와 유형의 방대한 데이터를 저장할 수 있는 스토리지와 컴퓨팅 분리 아키텍처
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs font-medium text-foreground">장점</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• 저렴한 스토리지 비용</li>
                            <li>• 사실상 무제한 스토리지 용량</li>
                            <li>• 다양한 데이터 처리 기술 선택 가능</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">단점</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• 데이터 늪(data swamp) 위험</li>
                            <li>• 스키마 관리 및 검색 도구 부족</li>
                            <li>• 복잡한 데이터 처리 과정</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">데이터 레이크하우스</h5>
                      <p className="text-sm text-muted-foreground">
                        데이터 웨어하우스의 제어, 데이터 관리, 데이터 구조와 데이터 레이크의 유연성을 결합. ACID
                        트랜잭션 지원
                      </p>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">모던 데이터 스택</h5>
                      <p className="text-sm text-muted-foreground">
                        클라우드 기반의 플러그 앤 플레이 방식과 사용하기 쉬운 기성 구성 요소를 써서 모듈식이면서도 비용
                        효율적인 데이터 아키텍처 구축
                      </p>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">람다 vs 카파 아키텍처</h5>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs font-medium text-foreground">람다 아키텍처</p>
                          <p className="text-xs text-muted-foreground">
                            배치, 스트리밍, 서빙 시스템이 독립적으로 작동. 속도 계층과 배치 계층을 서빙 계층에서 결합
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">카파 아키텍처</p>
                          <p className="text-xs text-muted-foreground">
                            스트림 처리 플랫폼을 모든 데이터 처리의 백본으로 사용. 진정한 이벤트 기반 아키텍처 실현
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">데이터 메시</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        중앙 집중식 데이터 플랫폼의 문제를 해결하기 위한 도메인 기반 분산 아키텍처
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs font-medium text-foreground">핵심 구성 요소</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• 도메인 지향 분산형 데이터 소유권</li>
                            <li>• 제품으로서의 데이터</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">지원 요소</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• 셀프서비스 데이터 인프라</li>
                            <li>• 통합 컴퓨팅 거버넌스</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-2">IoT 아키텍처</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        사물인터넷 장치들의 분산 컬렉션을 위한 특별한 아키텍처 고려사항
                      </p>
                      <div className="text-xs text-muted-foreground">
                        <p className="mb-1">
                          <strong>구성요소:</strong> 장치 → IoT 게이트웨이 → 스트림 처리 → 스토리지 → [머신러닝, 보고]
                        </p>
                        <p>
                          <strong>특징:</strong> 저전력, 저자원/저대역폭 환경, 에지 컴퓨팅 및 에지 머신러닝 지원
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-foreground mb-3">브라운필드 vs 그린필드 프로젝트</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                      <h5 className="font-medium text-foreground mb-2">브라운필드 프로젝트</h5>
                      <p className="text-sm text-muted-foreground mb-2">기존 아키텍처를 리팩터링하고 재구성하는 경우</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• 현재와 과거의 선택에 따른 제약을 받음</li>
                        <li>• 레거시 아키텍처에 대한 철저한 이해 필요</li>
                        <li>• 스트랭글러 패턴을 통한 점진적 대체</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                      <h5 className="font-medium text-foreground mb-2">그린필드 프로젝트</h5>
                      <p className="text-sm text-muted-foreground mb-2">
                        이전 아키텍처의 역사나 레거시에 얽매이지 않고 새롭게 출발
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• 최신 기술과 모범 사례 적용 가능</li>
                        <li>• 처음부터 우수한 아키텍처 원칙 적용</li>
                        <li>• 유연하고 되돌릴 수 있는 결정에 집중</li>
                      </ul>
                    </div>
                  </div>
                </div>
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
              <p className="text-muted-foreground leading-relaxed mb-4"></p>
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
