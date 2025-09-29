import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Star, Calendar, User, Building } from "lucide-react"

export const metadata: Metadata = {
  title: "엔터프라이즈 데이터 플랫폼 구축 - 도서 리뷰",
  description: "얀 쿠닉크의 엔터프라이즈 데이터 플랫폼 구축 도서 리뷰",
}

export default function BookReviewPage() {
  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />책 목록으로 돌아가기
          </Link>
        </div>

        {/* Book Info Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <div className="relative aspect-[2/3] max-w-sm mx-auto">
              <img
                src="/images/design-mode/image%281%29.png"
                alt="엔터프라이즈 데이터 플랫폼 구축 책 표지"
                className="w-full h-full object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Book Details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">엔터프라이즈 데이터 플랫폼 구축</h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>얀 쿠닉크</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>한빛미디어</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>2021년</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-muted-foreground">5.0/5.0</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">데이터 플랫폼</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">아키텍처</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">엔터프라이즈</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">모던 데이터</span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* 서평 Section */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">📝 서평</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-muted-foreground italic">책을 읽은 후에 남길 예정입니다.</p>
            </div>
          </section>

          {/* 리뷰 Section */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">💭 리뷰</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-muted-foreground italic">책을 읽은 후에 남길 예정입니다.</p>
            </div>
          </section>

          {/* 느낀점 Section */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">✨ 느낀점</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-muted-foreground italic">책을 읽은 후에 남길 예정입니다.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
