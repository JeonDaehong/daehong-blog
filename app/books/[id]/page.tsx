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

              <h4 className="text-lg font-medium text-foreground mb-3">데이터 엔지니어링이란</h4>

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

                <h4 className="text-lg font-medium text-foreground mb-3">데이터 엔지니어링 수명 주기</h4>
                <div className="mt-4">
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>데이터 생성(generation)</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>데이터 저장(Storage)</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>데이터 수집(Ingestion)</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>데이터 변환(Transformation)</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>데이터 서빙(Serving)</strong>
                      </span>
                    </li>
                  </ul>
                </div>

                <p>
                  데이터 엔지니어링 수명 주기는 전체 수명 주기에 걸쳐 중요한 아이디어인 드러나지 않는
                  요소(undercurrent)라는 개념을 포함함. 여기에는 보안, 데이터 관리, 데이터옵스, 데이터 아키텍처,
                  오케스트레이션, 소프트웨어 엔지니어링이 포함된다.
                </p>

                <h4 className="text-lg font-medium text-foreground mb-3">데이터 엔지니어의 진화</h4>

                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p className="font-medium">1980년부터 2000년까지: 데이터 웨어하우징에서 웹으로</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        1980년대에 비즈니스 데이터 웨어하우스라는 용어가 형성되었으며 1989년 빌 인먼이 데이터
                        웨어하우스라는 용어를 공식적으로 만들었음
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        IBM의 엔지니어들이 관계형 데이터 베이스와 구조적 질의 언어(SQL)를 개발한 이후 오라클은 이 기술을
                        대중화함
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        BI를 위한 전용 툴과 데이터 파이프라인이 필요해졌으며 랄프 킴벌과 빌 인먼은 데이터 모델링 기법과
                        접근 방식을 개발했음
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        데이터 웨어하우징은 대량의 데이터를 처리하고자 다수의 프로세서를 사용하는 새로운 대규모 병렬
                        처리(MPP) 데이터베이스로 확장성 있는 분석의 첫 시대를 열음
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        인터넷은 1990년대 중반에 주류를 이루었고 AOL, 야후, 아마존과 같은 세대의 웹 우선(web-first)
                        기업을 탄생시킴
                      </span>
                    </li>
                  </ul>

                  <p className="font-medium mt-6">2000년대 초: 현대 데이터 엔지니어링의 탄생</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        닷컴 열풍이 무너지고 생존자 중 일부인 야후, 구글, 아마존 같은 기업들은 강력한 기술 기업으로
                        성장함
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        데이터의 폭발적 증가와 함께 범용 하드웨어도 저렴해지고 분산 연산 및 저장을 실현함 (빅데이터시대,
                        3V)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        2003년 구글은 구글 파일 시스템에 관한 논문을 발표했고, 2004년에는 맵리듀스에 대한 논문을
                        발표했음
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>구글의 논문들은 야후의 엔지니어들이 2006년 아파치 하둡을 개발하는 데 영감을 주었음</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        아마존은 EC2, S3, 다이나모DB를 비롯한 데이터 빌딩 블록을 구축했으며, AWS가 성장 엔진이 되면서
                        다른 퍼블릭 클라우드들이 등장함
                      </span>
                    </li>
                  </ul>

                  <p className="font-medium mt-6">2000년대와 2010년대: 빅데이터 엔지니어링</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        하둡 생태계의 오픈 소스 빅데이터 도구는 빠르게 성숙했고, 배치 컴퓨팅에서 이벤트 스트리밍으로의
                        전환이 발생함
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        엔지니어는 하둡, 피그, 하이브, HBase, 스톰, 카산드라, 스파크, 프레스토 등 최신 기술을 선택할 수
                        있었음
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        맵리듀스의 출현으로 코드 우선(code-first) 엔지니어링이 유행했으며, 빅데이터 엔지니어가 탄생함
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>핵심 기술 개발에서 데이터 전달로 초점이 옮겨짐</span>
                    </li>
                  </ul>

                  <p className="font-medium mt-6">2020년대: 데이터 수명 주기를 위한 엔지니어링</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        모놀리식 프레임워크에서 분산되고 모듈화되고, 관리되고, 고도로 추상화된 도구로 트렌드가 이동중
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        데이터 엔지니어링은 다양한 기술을 마치 레고 블록처럼 연결하고 상호 운용하는 분야가 되고 있음
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        보안, 데이터 관리, 데이터옵스, 데이터 아키텍처, 오케스트레이션 및 일반 데이터 수명 주기 관리와
                        같은 가치 사슬의 상위 영역에 역할이 집중됨
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        CCPA와 GDPR 같은 규정에 정통하며 파이프라인 설계 시 개인정보보호, 익명화, 데이터 가비지 수집 및
                        규정 준수에 관심을 가짐
                      </span>
                    </li>
                  </ul>
                </div>
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
