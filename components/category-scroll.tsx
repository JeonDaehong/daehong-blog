"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { categories, allTags } from "@/lib/posts"
import { cn } from "@/lib/utils"

interface CategoryScrollProps {
  selectedCategory: string
  selectedTag: string
  onCategoryChange: (category: string) => void
  onTagChange: (tag: string) => void
}

export function CategoryScroll({ selectedCategory, selectedTag, onCategoryChange, onTagChange }: CategoryScrollProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      // 같은 카테고리 클릭시 토글
      setExpandedCategory(expandedCategory === categoryName ? null : categoryName)
    } else {
      // 다른 카테고리 선택
      onCategoryChange(categoryName)
      onTagChange("all")
      setExpandedCategory(categoryName)
    }
  }

  // 선택된 카테고리의 태그들만 가져오기
  const getTagsForCategory = (categoryName: string) => {
    if (categoryName === "all") return allTags
    const category = categories.find((cat) => cat.name === categoryName)
    return category?.subcategories || []
  }

  const currentTags = getTagsForCategory(selectedCategory)

  return (
    <div className="space-y-4">
      {/* 메인 카테고리 */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">카테고리:</span>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              onCategoryChange("all")
              onTagChange("all")
              setExpandedCategory(null)
            }}
            className="whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            전체
          </Button>
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(category.name)}
              className={cn(
                "whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-md",
                selectedCategory === category.name && "ring-2 ring-primary/20",
              )}
            >
              {category.name}
              {category.postCount > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.postCount}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* 태그 (서브카테고리) */}
      {selectedCategory !== "all" && expandedCategory && currentTags.length > 0 && (
        <div className="flex items-center gap-2 animate-slide-up">
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">태그:</span>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <Button
              variant={selectedTag === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => onTagChange("all")}
              className="whitespace-nowrap transition-all duration-300 hover:scale-105"
            >
              전체
            </Button>
            {currentTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "ghost"}
                size="sm"
                onClick={() => onTagChange(tag)}
                className="whitespace-nowrap transition-all duration-300 hover:scale-105"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
