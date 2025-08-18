import { TypingText } from "@/components/typing-text"
import { Github, Linkedin, Book } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 sm:space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="space-y-4 w-full max-w-4xl">
              <TypingText
                text="Daehong's Commit Log !"
                className="text-2xl sm:text-4xl md:text-6xl font-bold text-primary"
              />
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

            <Button size="lg" asChild className="w-full sm:w-auto max-w-xs bg-green-600 hover:bg-green-700 text-white">
              <Link href="/me" className="flex items-center justify-center space-x-2">
                <span>👨‍💻</span>
                <span>Portfolio</span>
              </Link>
            </Button>

            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto max-w-xs bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Link href="/dictionary" className="flex items-center justify-center space-x-2">
                <Book className="h-5 w-5" />
                <span>Daehong's IT Dictionary</span>
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
        </div>
      </div>
    </div>
  )
}
