"use client"

import { useEffect } from "react"
import { loadPrism } from "@/lib/prism-loader"

export function PrismLoader() {
  useEffect(() => {
    // 앱 시작 시 Prism을 미리 로드
    loadPrism().catch(console.error)
  }, [])

  return null
}
