import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "견고한 데이터 엔지니어링 | Daehong's Blog",
  description: "데이터 파이프라인 설계와 구축의 핵심 원리",
}

export default function Book1Page() {
  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />책 목록으로 돌아가기
        </Link>

        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9KLY1m2zG2pzi80wyrnculTYAl0sUK.png"
              alt="견고한 데이터 엔지니어링 책 표지"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">저자:</span> 조 라이스, 맷 하우슬리
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">출판사:</span> 한빛미디어
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">견고한 데이터 엔지니어링</h1>
              <p className="text-lg text-muted-foreground">데이터 파이프라인 설계와 구축의 핵심 원리</p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2>책 소개</h2>
              <p>
                이 책은 현대적인 데이터 엔지니어링의 핵심 개념과 실무 기술을 다룹니다. 데이터 파이프라인 설계부터 구축,
                운영까지 데이터 엔지니어가 알아야 할 모든 것을 포괄적으로 설명합니다.
              </p>

              <h2>주요 내용</h2>
              <ul>
                <li>데이터 엔지니어링의 기초와 핵심 개념</li>
                <li>데이터 파이프라인 아키텍처 설계</li>
                <li>데이터 수집, 저장, 처리 기술</li>
                <li>데이터 품질 관리와 모니터링</li>
                <li>클라우드 기반 데이터 인프라 구축</li>
              </ul>

              <h2>독서 후기</h2>
              <p>
                데이터 엔지니어링의 전반적인 개념을 체계적으로 정리할 수 있었습니다. 특히 실무에서 바로 적용할 수 있는
                베스트 프랙티스와 안티패턴에 대한 설명이 유용했습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
