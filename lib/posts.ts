import type { Post, BlogPost } from "./types"

// 블로그 게시글들
import { meta as meta1, default as content1 } from "@/content/posts/spring-kafka-retrytopic-bean-name-fix"
import { meta as meta2, default as content2 } from "@/content/posts/iceberg-flink-junit4-dependency-removal"
import { meta as meta3, default as content3 } from "@/content/posts/iceberg-flink-backporting-minicluster-removal"
import { meta as meta4, default as content4 } from "@/content/posts/apache-gravitino-stability-improvements"
import { meta as meta6, default as content6 } from "@/content/posts/apache-iceberg-basic"
import { meta as meta7, default as content7 } from "@/content/posts/2025-memoir"

const postModules = [
  { id: "spring-kafka-retrytopic-bean-name-fix", meta: meta1, content: content1 },
  { id: "iceberg-flink-junit4-dependency-removal", meta: meta2, content: content2 },
  { id: "iceberg-flink-backporting-minicluster-removal", meta: meta3, content: content3 },
  { id: "apache-gravitino-stability-improvements", meta: meta4, content: content4 },
  { id: "apache-iceberg-basic", meta: meta6, content: content6 },
  { id: "2025-memoir", meta: meta7, content: content7 },
]

export const posts: Post[] = postModules
  .map((p) => ({
    meta: { ...p.meta, id: p.id } as BlogPost,
    content: p.content,
  }))
  .sort((a, b) => new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime())

export const blogPosts: BlogPost[] = posts.map((p) => p.meta)

function extractCategoriesFromPosts(): Array<{ name: string; subcategories: string[]; postCount: number }> {
  const categoryMap = new Map<string, Set<string>>()
  const postCountMap = new Map<string, number>()

  // 모든 게시글에서 카테고리와 태그 추출
  blogPosts.forEach((post) => {
    const category = post.category
    const tags = post.tags

    if (!categoryMap.has(category)) {
      categoryMap.set(category, new Set())
      postCountMap.set(category, 0)
    }

    // 게시글 수 증가
    postCountMap.set(category, (postCountMap.get(category) || 0) + 1)

    // 태그들을 서브카테고리로 추가
    tags.forEach((tag) => {
      categoryMap.get(category)?.add(tag)
    })
  })

  // Map을 배열로 변환
  return Array.from(categoryMap.entries())
    .map(([name, subcategoriesSet]) => ({
      name,
      subcategories: Array.from(subcategoriesSet).sort(),
      postCount: postCountMap.get(name) || 0,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export const categories = extractCategoriesFromPosts()

// 모든 태그 목록 추출 (검색용)
export const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags))).sort()

// BlogPost 타입을 다시 export (호환성을 위해)
export type { BlogPost } from "./types"
