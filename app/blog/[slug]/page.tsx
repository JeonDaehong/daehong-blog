"use client"

import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CodeBlock } from "@/components/code-block"
import { posts, blogPosts } from "@/lib/posts"
import { Calendar, ArrowLeft, Share2, User } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { useState, useEffect } from "react"
import type { JSX } from "react/jsx-runtime"

interface BlogPostPageProps {
  params: { slug: string }
}

// 향상된 인라인 텍스트 처리 함수
function processInlineText(text: string): string {
  // 1. 먼저 인라인 코드 처리 (다른 처리보다 우선)
  let processed = text.replace(
    /`([^`]+)`/g,
    '<code class="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-800 dark:text-slate-200 px-2 py-1 rounded-md text-sm font-mono border border-slate-300 dark:border-slate-600 shadow-sm font-medium">$1</code>',
  )

  // 2. 볼드 처리 (**text**)
  processed = processed.replace(/\*\*([^*]+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')

  // 3. 이탤릭 처리 (*text*) - 볼드 처리 후에 실행
  processed = processed.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em class="italic text-foreground/90">$1</em>')

  // 4. 링크 처리
  processed = processed.replace(
    /\[([^\]]+)\]$$([^)]+)$$/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary/80 underline underline-offset-2 font-medium transition-colors decoration-2">$1</a>',
  )

  return processed
}

// 향상된 마크다운 파서
function parseMarkdown(content: string) {
  const lines = content.split("\n")
  const elements: JSX.Element[] = []
  let currentIndex = 0

  while (currentIndex < lines.length) {
    const line = lines[currentIndex]

    // 코드 블록 처리
    if (line.startsWith("```")) {
      const languageMatch = line.slice(3).trim()
      const parts = languageMatch.split(" ")
      const language = parts[0] || "text"

      // 제목 추출 (예: \`\`\`javascript title="example.js")
      const titleMatch = languageMatch.match(/title="([^"]+)"/)
      const title = titleMatch ? titleMatch[1] : undefined

      // 하이라이트 라인 추출 (예: highlight="1,3-5")
      const highlightMatch = languageMatch.match(/highlight="([^"]+)"/)
      const highlightLines: number[] = []
      if (highlightMatch) {
        const ranges = highlightMatch[1].split(",")
        ranges.forEach((range) => {
          if (range.includes("-")) {
            const [start, end] = range.split("-").map(Number)
            for (let i = start; i <= end; i++) {
              highlightLines.push(i)
            }
          } else {
            highlightLines.push(Number(range))
          }
        })
      }

      const codeLines: string[] = []
      currentIndex++

      while (currentIndex < lines.length && !lines[currentIndex].startsWith("```")) {
        codeLines.push(lines[currentIndex])
        currentIndex++
      }

      elements.push(
        <CodeBlock key={currentIndex} language={language} title={title} highlightLines={highlightLines}>
          {codeLines.join("\n")}
        </CodeBlock>,
      )
      currentIndex++
      continue
    }

    // 제목 처리 - 이모지가 포함된 소제목들에 훨씬 더 큰 여백 적용
    if (line.startsWith("# ")) {
      const titleText = processInlineText(line.slice(2))
      elements.push(
        <h1
          key={currentIndex}
          className="text-2xl sm:text-3xl font-bold mt-32 mb-8 text-foreground border-b border-border pb-4 leading-tight"
          dangerouslySetInnerHTML={{ __html: titleText }}
        />,
      )
    } else if (line.startsWith("## ")) {
      const titleText = processInlineText(line.slice(3))
      // 이모지가 포함된 소제목인지 확인
      const hasEmoji = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(line)
      elements.push(
        <h2
          key={currentIndex}
          className={`text-xl sm:text-2xl font-semibold ${hasEmoji ? "mt-32 pt-8 border-t-2 border-dashed border-primary/20" : "mt-12"} mb-6 text-foreground leading-tight`}
          dangerouslySetInnerHTML={{ __html: titleText }}
        />,
      )
    } else if (line.startsWith("### ")) {
      const titleText = processInlineText(line.slice(4))
      const hasEmoji = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(line)
      elements.push(
        <h3
          key={currentIndex}
          className={`text-lg sm:text-xl font-semibold ${hasEmoji ? "mt-28 pt-6 border-t border-dashed border-primary/15" : "mt-10"} mb-5 text-foreground leading-tight`}
          dangerouslySetInnerHTML={{ __html: titleText }}
        />,
      )
    } else if (line.startsWith("#### ")) {
      const titleText = processInlineText(line.slice(5))
      const hasEmoji = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(line)
      elements.push(
        <h4
          key={currentIndex}
          className={`text-base sm:text-lg font-semibold ${hasEmoji ? "mt-24 pt-4 border-t border-dashed border-primary/10" : "mt-8"} mb-4 text-foreground leading-tight`}
          dangerouslySetInnerHTML={{ __html: titleText }}
        />,
      )
    }
    // 인용문 처리
    else if (line.startsWith("> ")) {
      const quoteText = processInlineText(line.slice(2))
      elements.push(
        <blockquote
          key={currentIndex}
          className="border-l-4 border-primary pl-6 py-4 my-10 bg-gradient-to-r from-muted/30 to-muted/10 rounded-r-lg text-foreground/90 italic text-base leading-8 shadow-sm"
          dangerouslySetInnerHTML={{ __html: quoteText }}
        />,
      )
    }
    // 리스트 처리
    else if (line.startsWith("- ") || line.startsWith("* ")) {
      const listItems: string[] = []
      while (
        currentIndex < lines.length &&
        (lines[currentIndex].startsWith("- ") || lines[currentIndex].startsWith("* "))
      ) {
        const itemText = processInlineText(lines[currentIndex].slice(2))
        listItems.push(itemText)
        currentIndex++
      }
      elements.push(
        <ul key={currentIndex} className="mb-10 ml-4 space-y-4 text-foreground">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-3 flex-shrink-0"></div>
              <span dangerouslySetInnerHTML={{ __html: item }} className="leading-8 text-base" />
            </li>
          ))}
        </ul>,
      )
      currentIndex--
    }
    // 번호 리스트 처리
    else if (/^\d+\. /.test(line)) {
      const listItems: string[] = []
      let listIndex = 1
      while (currentIndex < lines.length && /^\d+\. /.test(lines[currentIndex])) {
        const itemText = processInlineText(lines[currentIndex].replace(/^\d+\. /, ""))
        listItems.push(itemText)
        currentIndex++
        listIndex++
      }
      elements.push(
        <ol key={currentIndex} className="mb-10 ml-4 space-y-4 text-foreground">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                {idx + 1}
              </div>
              <span dangerouslySetInnerHTML={{ __html: item }} className="leading-8 text-base" />
            </li>
          ))}
        </ol>,
      )
      currentIndex--
    }
    // 구분선 처리
    else if (line.trim() === "---" || line.trim() === "***") {
      elements.push(<hr key={currentIndex} className="my-8 border-border" />)
    }
    // 빈 줄 처리
    else if (line.trim() === "") {
      elements.push(<div key={currentIndex} className="mb-8" />)
    }
    // 일반 텍스트 처리
    else if (line.trim()) {
      const processedLine = processInlineText(line)

      elements.push(
        <p
          key={currentIndex}
          className="mb-10 leading-9 text-foreground/90 text-base"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />,
      )
    }

    currentIndex++
  }

  return elements
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { toast } = useToast()
  const { slug } = params
  const [parsedContent, setParsedContent] = useState<JSX.Element[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const postData = posts.find((p) => p.meta.id === slug)

  useEffect(() => {
    if (postData) {
      const parsed = parseMarkdown(postData.content)
      setParsedContent(parsed)
      setIsLoading(false)
    }
  }, [postData])

  if (!postData) {
    notFound()
  }

  const { meta: post } = postData

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "URL 복사 완료",
        description: "게시글의 주소가 클립보드에 복사되었습니다.",
      })
    })
  }

  // 관련 포스트 (같은 카테고리의 다른 글들)
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-white to-slate-50/50 dark:from-slate-950/50 dark:via-slate-900 dark:to-slate-950/50">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
        <div className="space-y-8">
          {/* 뒤로가기 버튼 */}
          <Button variant="ghost" asChild className="hover:bg-primary/10 transition-all duration-300 group">
            <Link href="/blog" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>블로그 목록으로</span>
            </Link>
          </Button>

          {/* 포스트 헤더 - 완전히 새로운 디자인 */}
          <article className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8 md:p-10">
              {/* 태그들 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-blue-200 bg-blue-50/80 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-xs px-3 py-1 font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* 제목 - 크기 대폭 축소 및 스타일 개선 */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6 text-slate-900 dark:text-slate-100 tracking-tight">
                {post.title}
              </h1>

              {/* 부제목/설명 */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 font-light">
                {post.excerpt}
              </p>

              {/* 메타 정보 */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{post.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                    <Calendar className="h-4 w-4" />
                    <span>{post.publishedAt}</span>
                  </div>
                  <Badge variant="secondary" className="font-medium text-xs">
                    {post.category}
                  </Badge>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-sm bg-transparent"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  공유하기
                </Button>
              </div>
            </div>
          </article>

          {/* 포스트 내용 - 타이포그래피 대폭 개선 */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg p-6 sm:p-8 md:p-10">
            <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-7">
              {isLoading ? (
                <div className="space-y-6">
                  <div className="animate-pulse bg-muted h-6 rounded-lg w-3/4"></div>
                  <div className="animate-pulse bg-muted h-4 rounded w-full"></div>
                  <div className="animate-pulse bg-muted h-4 rounded w-5/6"></div>
                  <div className="animate-pulse bg-muted h-32 rounded-lg"></div>
                  <div className="animate-pulse bg-muted h-4 rounded w-full"></div>
                  <div className="animate-pulse bg-muted h-4 rounded w-4/5"></div>
                </div>
              ) : (
                <div className="space-y-4">{parsedContent}</div>
              )}
            </div>
          </div>

          <Separator className="my-8" />

          {/* 작성자 정보 - 디자인 개선 */}
          <Card className="border border-slate-200/60 dark:border-slate-700/60 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center space-x-6">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-primary/20 shadow-lg">
                  <Image src="/daehong-profile.jpg" alt={post.author.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-slate-100">전대홍</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                    소프트웨어 엔지니어 / 데이터 엔지니어로 활동하며 최신 기술 트렌드와 개발 경험을 공유합니다. 오픈소스
                    기여와 기술 블로깅을 통해 개발 커뮤니티에 기여하고 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 관련 포스트 */}
          {relatedPosts.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">관련 글</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="hover:shadow-xl transition-all duration-300 border border-slate-200/60 dark:border-slate-700/60 hover:border-primary/20 group bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
                  >
                    <Link href={`/blog/${relatedPost.id}`} className="block h-full">
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className="relative w-full h-28 mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={
                              relatedPost.thumbnail || "/placeholder.svg?height=112&width=224&query=tech blog thumbnail"
                            }
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <h3 className="font-semibold text-base mb-3 hover:text-primary transition-colors flex-grow line-clamp-2 leading-tight">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{relatedPost.publishedAt}</span>
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {relatedPost.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
