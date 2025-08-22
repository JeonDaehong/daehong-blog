import type { BlogPost } from "@/lib/types"

export const meta: Omit<BlogPost, "id"> = {
  title: "📘 Apache Gravitino 안정성을 높이는 작은 개선 3가지 기여 회고",
  excerpt: "Apache Gravitino 프로젝트에 기여한 3가지 개선 사항들을 통해 안정성을 높인 경험을 공유합니다.",
  author: {
    name: "전대홍",
    image: "/profile.jpg",
  },
  publishedAt: "2025-08-22",
  tags: ["OpenSource PR", "Gravitino"],
  category: "오픈소스기여",
  views: 0,
  likes: 0,
  featured: false,
  thumbnail: "/apache-gravitino-stability-improvements.png",
  bookmark: false,
}

const content = `
*내용을 작성해주세요...*
`

export default content
