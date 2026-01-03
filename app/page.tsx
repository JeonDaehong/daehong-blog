import { TypingText } from "@/components/typing-text"
import { Github, Linkedin, Book } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { BlogStats } from "@/components/blog-stats"

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 sm:space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="space-y-4 w-full max-w-4xl relative">
              <div className="flex justify-end mb-2">
                <BlogStats />
              </div>
              <TypingText
                text="Daehong's Commit Log !"
                className="text-2xl sm:text-4xl md:text-6xl font-bold text-primary"
              />
              {/* </CHANGE> */}
              <br />
              <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                하루에 한 걸음씩 꾸준히 성장하는 엔지니어 전대홍입니다.
                <br />
                데이터를 통해 세상을 더 좋은 방향으로 이끄는 것을 목표로 합니다.
              </p>
            </div>
          </div>

          <div className="pt-8 sm:pt-12 w-full flex flex-col items-center sm:flex-row sm:justify-center gap-4 px-4">
            <Button size="lg" asChild className="w-full sm:w-auto max-w-xs bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/blog" className="flex items-center justify-center space-x-2">
                <span>📝</span>
                <span>Blog</span>
              </Link>
            </Button>

            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto max-w-xs bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Link href="/dictionary" className="flex items-center justify-center space-x-2">
                <Book className="h-5 w-5" />
                <span>IT Dictionary</span>
              </Link>
            </Button>

            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto max-w-xs bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Link href="/books" className="flex items-center justify-center space-x-2">
                <span>📚</span>
                <span>IT Books</span>
              </Link>
            </Button>

            <Button size="lg" asChild className="w-full sm:w-auto max-w-xs bg-gray-800 hover:bg-gray-900 text-white">
              <Link
                href="https://github.com/Jeondaehong"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </Link>
            </Button>

            <Button size="lg" asChild className="w-full sm:w-auto max-w-xs bg-blue-600 hover:bg-blue-700 text-white">
              <Link
                href="https://www.linkedin.com/in/daehong-jeon/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </Link>
            </Button>
          </div>

          <br />
          <br />
          <br />

          <div className="mt-16 mb-6 w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Presentation Photo */}
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="bg-white p-3 rounded-lg shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                    <Image
                      src="/images/design-mode/KakaoTalk_20250906_193003212_02.jpg%281%29.jpeg"
                      alt="전대홍의 오픈소스 기여 발표 - Spring Kafka, Apache Iceberg, Apache Gravitino 프로젝트 기여 내용을 소개하는 모습"
                      width={400}
                      height={300}
                      className="rounded-md object-cover w-full h-auto"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow-lg"></div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 italic text-center">
                  오픈소스 기여 발표 - Apache 프로젝트들에 대한 기여 경험 공유
                </p>
              </div>

              {/* Contributions Dashboard */}
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="bg-white p-3 rounded-lg shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <Image
                      src="/images/design-mode/image%281%29.png"
                      alt="오픈소스 기여 대시보드 - Apache Iceberg, Spring Kafka, Apache Gravitino 프로젝트 기여 현황"
                      width={400}
                      height={500}
                      className="rounded-md object-cover w-full h-auto"
                    />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 italic text-center">
                  오픈소스 기여 현황 - 다양한 Apache 프로젝트 기여 내역
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
