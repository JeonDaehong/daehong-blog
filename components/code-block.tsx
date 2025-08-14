"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { loadPrism, highlightCode } from "@/lib/prism-loader"

interface CodeBlockProps {
  children: string
  language?: string
  title?: string
  highlightLines?: number[]
  className?: string
}

export function CodeBlock({
  children,
  language = "javascript",
  title,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState("")
  const [mounted, setMounted] = useState(false)
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const initializePrism = async () => {
      try {
        await loadPrism()
        const highlighted = highlightCode(children.trim(), language)
        setHighlightedCode(highlighted)
      } catch (error) {
        console.error("Prism initialization failed:", error)
        setHighlightedCode(children.trim())
      }
    }

    initializePrism()
  }, [children, language, mounted])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  // SSR 중에는 기본 스타일로 렌더링
  if (!mounted) {
    return (
      <div
        className={cn(
          "relative my-8 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-lg",
          className,
        )}
      >
        <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            {title && <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{title}</span>}
            {!title && (
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono">{language}</span>
            )}
          </div>
          <div className="h-8 w-8"></div>
        </div>
        <div className="relative bg-slate-950 dark:bg-slate-900">
          <pre className="p-4 overflow-x-auto text-sm">
            <code className={`language-${language} block font-mono text-slate-100 leading-6 whitespace-pre`}>
              {children.trim()}
            </code>
          </pre>
        </div>
      </div>
    )
  }

  const codeLines = children.trim().split("\n")

  return (
    <div
      className={cn(
        "relative my-8 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-lg",
        className,
      )}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {title && <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{title}</span>}
          {!title && <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono">{language}</span>}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0 hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          )}
        </Button>
      </div>

      {/* 코드 영역 */}
      <div className="relative bg-slate-950 dark:bg-slate-900">
        <pre className="p-4 overflow-x-auto text-sm">
          <code ref={codeRef} className={`language-${language} block`}>
            {highlightLines.length > 0 ? (
              // 하이라이트 라인이 있는 경우
              <div>
                {codeLines.map((line, index) => (
                  <div
                    key={index}
                    className={cn(
                      "leading-6 whitespace-pre",
                      highlightLines.includes(index + 1) && "bg-blue-500/20 -mx-4 px-4 border-l-4 border-blue-500",
                    )}
                    dangerouslySetInnerHTML={{
                      __html: highlightedCode
                        ? highlightedCode.split("\n")[index] || line || "&nbsp;"
                        : line || "&nbsp;",
                    }}
                  />
                ))}
              </div>
            ) : (
              // 일반적인 경우
              <div
                className="font-mono text-slate-100 leading-6 whitespace-pre"
                dangerouslySetInnerHTML={{
                  __html: highlightedCode || children.trim(),
                }}
              />
            )}
          </code>
        </pre>
      </div>
    </div>
  )
}
