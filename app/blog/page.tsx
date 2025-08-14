"use client"

import { useState, useMemo } from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchWithSuggestions } from "@/components/search-with-suggestions"
import { CategoryScroll } from "@/components/category-scroll"
import { blogPosts, type BlogPost } from "@/lib/posts"
import { Calendar, ChevronLeft, ChevronRight, Sparkles, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const POSTS_PER_PAGE = 10

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTag, setSelectedTag] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearchActive, setIsSearchActive] = useState(false)

  // 추천글 (featured posts)
  const featuredPosts = blogPosts.filter((post) => post.featured)

  // 최신글 (날짜 기준)
  const latestPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  // 필터링된 포스트
  const filteredPosts = useMemo(() => {
    let posts = blogPosts

    // 검색 필터
    if (searchQuery) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // 카테고리 필터
    if (selectedCategory !== "all") {
      posts = posts.filter((post) => post.category === selectedCategory)
    }

    // 태그 필터
    if (selectedTag !== "all") {
      posts = posts.filter((post) => post.tags.includes(selectedTag))
    }

    return posts
  }, [searchQuery, selectedCategory, selectedTag])

  // 페이지네이션
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  const handleSearch = () => {
    setIsSearchActive(true)
    setCurrentPage(1)
  }

  const PostCard = ({ post }: { post: BlogPost }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:-translate-y-1 border-2 hover:border-primary/20 h-full flex flex-col overflow-hidden">
      <Link href={`/blog/${post.id}`} className="flex flex-col h-full">
        {/* 썸네일 이미지 */}
        <div className="relative w-full h-48 sm:h-52 md:h-48 overflow-hidden">
          <Image
            src={post.thumbnail || "/placeholder.svg?height=200&width=400&query=tech blog thumbnail"}
            alt={post.title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {post.featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="animate-pulse text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">추천</span>
              </Badge>
            </div>
          )}
        </div>

        {/* 카드 내용 */}
        <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
          {/* 제목 */}
          <CardTitle className="text-base sm:text-lg md:text-xl group-hover:text-primary transition-all duration-300 line-clamp-2 leading-tight mb-2 sm:mb-3">
            {post.title}
          </CardTitle>

          {/* 설명 */}
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 line-clamp-2 leading-relaxed mb-3 sm:mb-4 flex-1">
            {post.excerpt}
          </p>

          {/* 태그 */}
          <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs transition-all duration-300 hover:scale-110 hover:bg-primary/10"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* 메타 정보 */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex items-center space-x-1 group-hover:text-primary transition-colors duration-300">
                <Calendar className="h-3 w-3" />
                <span className="hidden sm:inline">{post.publishedAt}</span>
                <span className="sm:hidden">{post.publishedAt.slice(5)}</span>
              </div>
            </div>
            <Badge variant="outline" className="group-hover:border-primary transition-colors duration-300 text-xs">
              {post.category}
            </Badge>
          </div>
        </div>
      </Link>
    </Card>
  )

  // 탭별 페이지네이션을 위한 함수
  const renderTabContent = (posts: BlogPost[], tabName: string) => {
    const tabTotalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
    const tabPaginatedPosts = posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {tabPaginatedPosts.map((post, index) => (
            <div key={post.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <PostCard post={post} />
            </div>
          ))}
        </div>

        {/* 탭별 페이지네이션 */}
        {tabTotalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 animate-fade-in">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">이전</span>
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(tabTotalPages, 5) }, (_, i) => {
                let page
                if (tabTotalPages <= 5) {
                  page = i + 1
                } else if (currentPage <= 3) {
                  page = i + 1
                } else if (currentPage >= tabTotalPages - 2) {
                  page = totalPages - 4 + i
                } else {
                  page = currentPage - 2 + i
                }
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm transition-all duration-300 hover:scale-110"
                  >
                    {page}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, tabTotalPages))}
              disabled={currentPage === tabTotalPages}
              className="transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
            >
              <span className="hidden sm:inline mr-1">다음</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="space-y-6 md:space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-4 bg-muted/50 rounded-xl p-6 md:p-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent animate-fade-in">
            개발 블로그
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground animate-slide-up">
            기술과 경험을 공유하는 공간입니다
          </p>
        </div>

        {/* 검색 */}
        <div className="animate-fade-in">
          <SearchWithSuggestions searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearch={handleSearch} />
        </div>

        {/* 카테고리 스크롤 */}
        <div className="animate-slide-up">
          <CategoryScroll
            selectedCategory={selectedCategory}
            selectedTag={selectedTag}
            onCategoryChange={(category) => {
              setSelectedCategory(category)
              setCurrentPage(1)
              setIsSearchActive(true)
            }}
            onTagChange={(tag) => {
              setSelectedTag(tag)
              setCurrentPage(1)
              setIsSearchActive(true)
            }}
          />
        </div>

        {/* 검색 결과 또는 필터링된 결과 */}
        {(isSearchActive || searchQuery || selectedCategory !== "all" || selectedTag !== "all") && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                {searchQuery ? `"${searchQuery}" 검색 결과` : "필터링된 글"} ({filteredPosts.length}개)
              </h2>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedTag("all")
                  setCurrentPage(1)
                  setIsSearchActive(false)
                }}
                className="transition-all duration-300 hover:scale-105 hover:shadow-md w-full sm:w-auto text-sm"
              >
                필터 초기화
              </Button>
            </div>

            {paginatedPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedPosts.map((post, index) => (
                    <div key={post.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 animate-fade-in">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline ml-1">이전</span>
                    </Button>

                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let page
                        if (totalPages <= 5) {
                          page = i + 1
                        } else if (currentPage <= 3) {
                          page = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          page = totalPages - 4 + i
                        } else {
                          page = currentPage - 2 + i
                        }
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm transition-all duration-300 hover:scale-110"
                          >
                            {page}
                          </Button>
                        )
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
                    >
                      <span className="hidden sm:inline mr-1">다음</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground">검색 결과가 없습니다.</p>
                <p className="text-sm sm:text-base text-muted-foreground mt-2">다른 키워드로 검색해보세요.</p>
              </div>
            )}
          </div>
        )}

        {/* 탭 컨텐츠 (검색이 활성화되지 않았을 때만 표시) */}
        {!isSearchActive && !searchQuery && selectedCategory === "all" && selectedTag === "all" && (
          <Tabs
            defaultValue="featured"
            className="space-y-6 animate-fade-in"
            onValueChange={() => setCurrentPage(1)} // 탭 변경시 페이지 초기화
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="featured"
                className="transition-all duration-300 hover:scale-105 text-xs sm:text-sm md:text-base"
              >
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">추천글</span>
                <span className="sm:hidden">추천</span>
              </TabsTrigger>
              <TabsTrigger
                value="latest"
                className="transition-all duration-300 hover:scale-105 text-xs sm:text-sm md:text-base"
              >
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">최신글</span>
                <span className="sm:hidden">최신</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="featured">{renderTabContent(featuredPosts, "featured")}</TabsContent>

            <TabsContent value="latest">{renderTabContent(latestPosts, "latest")}</TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
