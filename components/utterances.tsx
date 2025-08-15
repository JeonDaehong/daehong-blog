"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface UtterancesProps {
  repo: string
}

export function Utterances({ repo }: UtterancesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    if (!ref.current) return

    // 기존 스크립트가 있다면 제거
    const existingScript = ref.current.querySelector("script")
    if (existingScript) {
      ref.current.removeChild(existingScript)
    }

    // 새 스크립트 생성
    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.setAttribute("repo", repo)
    script.setAttribute("issue-term", "url")
    script.setAttribute("label", "utterances")

    const utterancesTheme = resolvedTheme === "dark" ? "github-dark" : "github-light"
    script.setAttribute("theme", utterancesTheme)

    script.setAttribute("crossorigin", "anonymous")
    script.async = true

    ref.current.appendChild(script)
  }, [repo, resolvedTheme])

  return (
    <div className="w-full mt-12">
      <div className="border-t border-border pt-8">
        <h3 className="text-lg font-semibold mb-4">댓글</h3>
        <div ref={ref} />
      </div>
    </div>
  )
}
