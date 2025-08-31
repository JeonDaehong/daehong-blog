import type { Metadata } from "next"
import BooksClient from "./BooksClient"

export const metadata: Metadata = {
  title: "IT Books - Daehong's Commit Log",
  description: "내가 읽은 IT 도서 목록",
}

export default function BooksPage() {
  return <BooksClient />
}
