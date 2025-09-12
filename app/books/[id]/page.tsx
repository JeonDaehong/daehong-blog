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
    toc: [
      {
        title: "[PART I 데이터 엔지니어링 기반 구축하기]",
        items: [
          "_1.1 데이터 엔지니어링이란?",
          "_1.2 데이터 엔지니어링 기술과 활동",
          "_1.3 조직 내 데이터 엔지니어",
          "_1.4 결론",
          "_1.5 참고 문헌",
          "_2.1 데이터 엔지니어링 수명 주기란?",
          "_2.2 데이터 엔지니어링 수명 주기의 드러나지 않는 주요 요소",
          "_2.3 결론",
          "_2.4 참고 문헌",
          "_3.1 데이터 아키텍처란?",
          "_3.2 우수한 데이터 아키텍처의 원칙",
          "_3.3 주요 아키텍처 개념",
          "_3.4 데이터 아키텍처의 사례 및 유형",
          "_3.5 데이터 아키텍처 설계 담당자는 누구인가?",
          "_3.6 결론",
          "_3.7 참고 문헌",
          "_4.1 팀의 규모와 능력",
          "_4.2 시장 출시 속도",
          "_4.3 상호 운용��",
          "_4.4 비용 최적화 및 비즈니스 가치",
          "_4.5 현재 vs 미래: 불변의 기술과 일시적 기술 비교",
          "_4.6 장소: 프레미스, 클라우드, 하이브리드 클라우드, 멀티클라우드",
          "_4.7 구축과 구매 비교",
          "_4.8 모놀리식과 모듈식 비교",
          "_4.9 서버리스와 서버 비교",
          "_4.10 최적화, 성능, 벤치마크 전쟁",
          "_4.11 데이터 엔지니어링 수명 주기의 드러나지 않는 요소",
          "_4.12 결론",
          "_4.13 참고 문헌",
        ],
      },
      {
        title: "[PART II 데이터 엔지니어링 수명 주기 심층 분석]",
        items: [
          "_5.1 데이터 원천: 데이터는 어떻게 생성될까?",
          "_5.2 원천 시스템: 주요 아이디어",
          "_5.3 원천 시스템의 실질적인 세부 사항",
          "_5.4 함께 작업할 대상",
          "_5.5 드러나지 않는 요소가 원천 시스템에 미치는 영향",
          "_5.6 결론",
          "_5.7 참고 문헌",
          "_6.1 데이터 스토리지의 기본 구성 요소",
          "_6.2 데이터 스토리지 시스템",
          "_6.3 데이터 엔지니어링 스토리지 개요",
          "_6.4 스토리지의 주요 아이디어와 동향",
          "_6.5 함께 작업할 대상",
          "_6.6 드러나지 않는 요소",
          "_6.7 결론",
          "_6.8 참고 문헌",
          "_7.1 데이터 수집이란?",
          "_7.2 수집 단계의 주요 엔지니어링 고려 사항",
          "_7.3 배치 수집 고려 사항",
          "_7.4 메시지 및 스트림 수집에 관한 고려 사항",
          "_7.5 데이터 수집 방법",
          "_7.6 함께 일할 담당자",
          "_7.7 드러나지 않는 요소",
          "_7.8 결론",
          "_7.9 참고 문헌",
          "_8.1 쿼리",
          "_8.2 데이터 모델링",
          "_8.3 변환",
          "_8.4 함께 일할 담당자",
          "_8.5 드러나지 않는 요소",
          "_8.6 결론",
          "_8.7 참고 문헌",
          "_9.1 데이터 서빙의 일반적인 고려 사항",
          "_9.2 분석",
          "_9.3 머신러닝",
          "_9.4 데이터 엔지니어가 ML에 관해 알아야 할 사항",
          "_9.5 분석 및 ML을 위한 데이터 서빙 방법",
          "_9.6 역 ETL",
          "_9.7 함께 작업하는 사람",
          "_9.8 드러나지 않는 요소",
          "_9.9 결론",
          "_9.10 참고 문헌",
        ],
      },
      {
        title: "[PART III 보안, 개인정보보호 및 데이터 엔지니어링의 미래]",
        items: [
          "_10.1 사람",
          "_10.2 프로세스",
          "_10.3 기술",
          "_10.4 결론",
          "_10.5 참고 문헌",
          "_11.1 사라지지 않는 데이터 엔지니어링 수명 주기",
          "_11.2 복잡성의 감소와 사용하기 쉬운 데이터 도구의 부상",
          "_11.3 클라우드 규모의 데이터 OS와 향상된 상호 운용성",
          "_11.4 '엔터프라이즈' 데이터 엔지니어링",
          "_11.5 직책과 책임의 변화",
          "_11.6 모던 데이터 스택을 넘어 라이브 데이터 스택으로",
          "_11.7 결론",
        ],
      },
    ],
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
                효과적으로 관리하는 것이 최상위 목표라 할 수 ��습니다.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                이 책은 "어떻게 하면 비즈니스에 진정한 가치를 더하는 데이터 엔지니어가 될 수 있을까?" 그리고 "데이터
                엔지니어로서 고려해야 할 핵심 요소들은 무엇인가?" 등의 본질적인 질문에 대한 깊이 있는 통찰을 제공합니다.
                이 책에서 탐구하는 데이터 엔지니어의 역할은 더욱 정확하게는 '데이터 수명주기 엔지니어'라고 칭할 수 있을
                만큼 전반적이고 종합적인 관점을 제시합니다.
              </p>
            </div>
          </section>

          {/* 리뷰 Section */}
          <section className="bg-card rounded-lg p-6 border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              리뷰
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-foreground mb-4">1. 데이터 엔지니어링 수명 주기</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                데이터 엔지니어링 수명 주기는 원시 데이터의 요소를 분석가, 데이터 과학자, ML 엔지니어 등이 사용할 수
                있는 유용한 최종 제품으로 전환하는 단계로 구성됨.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                데이터 엔지니어링의 핵심 목적은 수명 주기 전체에 걸쳐 데이터를 운반하고, 최종 사용자의 요구에 따라 이를
                제공하고 견고하고 신뢰성 높은 시스템 설계하는 것.
              </p>

              <br />

              <h3 className="text-xl font-semibold text-foreground mb-4">2. 데이터 엔지니어링의 발전 과정</h3>

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

              <br />

              <h3 className="text-xl font-semibold text-foreground mb-4">3. 데이터 엔지니어링이란?</h3>

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

          {/* 느낀점 Section */}
          <section className="bg-card rounded-lg p-6 border">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              느낀점
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                
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
