"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { X } from "lucide-react"

interface Book {
  id: number
  title: string
  author: string
  publisher: string
  coverImage: string
  description?: string
}

const books: Book[] = [
  {
    id: 1,
    title: "견고한 데이터 엔지니어링",
    author: "조 라이스, 맷 하우슬리",
    publisher: "한빛미디어",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9KLY1m2zG2pzi80wyrnculTYAl0sUK.png",
    description: "데이터 파이프라인 설계와 구축의 핵심 원리",
  },
  {
    id: 2,
    title: "데이터 중심 애플리케이션 설계",
    author: "마틴 클레프만",
    publisher: "한빛미디어",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PZ8kd6V0nRv36O7vf78QbiJB6SL4Sk.png",
    description: "신뢰할 수 있고 확장 가능하며 유지보수하기 쉬운 시스템을 지탱하는 핵심 아이디어",
  },
  {
    id: 3,
    title: "엔터프라이즈 데이터 플랫폼 구축",
    author: "얀 쿠닉크",
    publisher: "한빛미디어",
    coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vc5VXo1WTH77lbQ5B3bskvsldbEmFh.png",
    description: "데이터 엔지니어, 시스템 관리자를 위한 온프레미스 하이브리드 클라우드 구축의 모든 것",
  },
]

export default function BooksClientPage() {
  const [showAlert, setShowAlert] = useState(false)

  const handleBookClick = (e: React.MouseEvent, bookId: number) => {
    if (bookId === 2 || bookId === 3) {
      e.preventDefault()
      setShowAlert(true)
    }
  }

  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">📚 IT Books Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            개발자로 성장하며 읽은 IT 도서들을 소개합니다.
            <br />각 책에서 얻은 인사이트와 지식을 공유합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {books.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`} onClick={(e) => handleBookClick(e, book.id)}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:shadow-primary/20">
                  <div className="relative aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transform transition-all duration-500 ease-out group-hover:scale-105 group-hover:rotate-y-12 group-hover:-rotate-x-6 group-hover:translate-y-[-8px] group-hover:translate-x-2">
                    <img
                      src={book.coverImage || "/placeholder.svg"}
                      alt={`${book.title} 책 표지`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-2 -right-2 w-full h-full bg-gradient-to-l from-black/30 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 transform group-hover:translate-x-1" />
                  </div>
                  <div className="mt-4 space-y-2 transform transition-all duration-300 group-hover:translate-y-[-4px]">
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300">
                      {book.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{book.author}</p>
                    <p className="text-xs text-muted-foreground/80">{book.publisher}</p>
                    {book.description && (
                      <p className="text-xs text-muted-foreground/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {book.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">더 많은 책들을 읽고 지속적으로 업데이트할 예정입니다. 📖</p>
        </div>
      </div>
      {showAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background border rounded-2xl shadow-2xl max-w-md w-full mx-4 transform animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">📚</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">독서 진행 중</h3>
                </div>
                <button
                  onClick={() => setShowAlert(false)}
                  className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  현재 독서/공부중인 책입니다. 다 읽고 리뷰 올리겠습니다.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-primary">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">열심히 읽는 중...</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowAlert(false)}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
