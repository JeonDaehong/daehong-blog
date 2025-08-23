import type { BlogPost } from "@/lib/types"

export const meta: Omit<BlogPost, "id"> = {
  title: "📘 데이터가 한쪽으로 몰렸다면? Spark에서 Data Skew 해결법 연구!",
  excerpt: "Apache Spark에서 발생하는 Data Skew 문제를 해결하기 위한 다양한 기법들을 연구하고 실습해보는 포스트입니다.",
  author: {
    name: "전대홍",
    image: "/profile.jpg",
  },
  publishedAt: "2025-07-17",
  category: "빅데이터",
  tags: ["Apache Spark", "Data Engineering"],
  thumbnail: "/spark-data-skew-research.png",
  views: 0,
  likes: 0,
  featured: false,
  bookmark: false,
}

const content = `
*내용을 작성해주세요...*
`

export default content
