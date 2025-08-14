"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X } from "lucide-react"
import { blogPosts, allTags, type BlogPost } from "@/lib/posts"
import Link from "next/link"

interface SearchWithSuggestionsProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onSearch: () => void
}

export function SearchWithSuggestions({ searchQuery, onSearchChange, onSearch }: SearchWithSuggestionsProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<BlogPost[]>([])
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchQuery.length > 1) {
      // 게시글 검색
      const filteredPosts = blogPosts
        .filter(
          (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
        )
        .slice(0, 3)

      // 태그 검색 (실제 존재하는 태그만)
      const filteredTags = allTags.filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)

      setSuggestions(filteredPosts)
      setTagSuggestions(filteredTags)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch()
      setShowSuggestions(false)
    }
  }

  const handleTagClick = (tag: string) => {
    onSearchChange(tag)
    onSearch()
    setShowSuggestions(false)
  }

  return (
    <div ref={searchRef} className="relative">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="제목, 내용, 태그로 검색..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onSearchChange("")
                setShowSuggestions(false)
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted/80"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <Button
          onClick={() => {
            onSearch()
            setShowSuggestions(false)
          }}
          className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <Search className="h-4 w-4 mr-2" />
          검색
        </Button>
      </div>

      {showSuggestions && (suggestions.length > 0 || tagSuggestions.length > 0) && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 animate-fade-in shadow-xl border-2">
          <CardContent className="p-2">
            <div className="space-y-3">
              {/* 태그 제안 */}
              {tagSuggestions.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2 px-2">태그</p>
                  <div className="flex flex-wrap gap-1 px-2">
                    {tagSuggestions.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* 게시글 제안 */}
              {suggestions.length > 0 && (
                <div>
                  {tagSuggestions.length > 0 && <div className="border-t my-2" />}
                  <p className="text-xs font-medium text-muted-foreground mb-2 px-2">게시글</p>
                  <div className="space-y-1">
                    {suggestions.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.id}`}
                        onClick={() => setShowSuggestions(false)}
                        className="block p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02] group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors duration-200 truncate">
                              {post.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
                            <div className="flex gap-1 mt-2">
                              {post.tags.slice(0, 2).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
