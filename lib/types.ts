export interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  tags: string[]
  category: string
  subcategory?: string
  views: number
  likes: number
  featured: boolean
  thumbnail: string
}

export interface Post {
  meta: BlogPost
  content: string
}
