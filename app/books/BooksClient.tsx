"use client"

import Link from "next/link"

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
    title: "데이터베이스 인터널스",
    author: "알렉스 페트로프",
    publisher: "한빛미디어",
    coverImage: "/images/books/database-internals.png",
    description: "분산 데이터베이스 시스템 실무 분석",
  },
  {
    id: 3,
    title: "시작하세요! 도커/쿠버네티스",
    author: "용찬호",
    publisher: "위키북스",
    coverImage: "/images/books/docker-kubernetes.png",
    description: "컨테이너 관리의 기초부터 실전까지",
  },
]

export default function BooksClient() {
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
          {books.map((book) => {
            const bookContent = (
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:shadow-primary/20">
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transform transition-all duration-500 ease-out group-hover:scale-105 group-hover:rotate-y-12 group-hover:-rotate-x-6 group-hover:translate-y-[-8px] group-hover:translate-x-2">
                    <img
                      src={book.coverImage || "/placeholder.svg"}
                      alt={`${book.title} 책 표지`}
                      className="w-full h-full object-cover rounded-lg"
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
            )

            return (
              <Link key={book.id} href={`/books/${book.id}`}>
                {bookContent}
              </Link>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">더 많은 책들을 읽고 지속적으로 업데이트할 예정입니다. 📖</p>
        </div>
      </div>
    </div>
  )
}
