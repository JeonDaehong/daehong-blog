import { Zap, Code, Database, Container, Server } from "lucide-react"

export const categories = [
  { name: "빅데이터", icon: Zap, color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
  { name: "CS", icon: Code, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  { name: "DB", icon: Database, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  { name: "컨테이너", icon: Container, color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
  { name: "인프라", icon: Server, color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
]
