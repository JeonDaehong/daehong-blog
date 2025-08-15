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
          "relative my-4 sm:my-8 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-lg w-full",
          className,
        )}
      >
        <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 px-2 sm:px-4 py-2 sm:py-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <div className="flex space-x-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
            </div>
            {title && (
              <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                {title}
              </span>
            )}
            {!title && (
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono">{language}</span>
            )}
          </div>
          <div className="h-6 w-6 sm:h-8 sm:w-8"></div>
        </div>
        <div className="relative bg-slate-950 dark:bg-slate-900">
          <pre className="p-2 sm:p-4 overflow-x-auto text-xs sm:text-sm">
            <code
              className={`language-${language} block font-mono text-slate-100 leading-5 sm:leading-6 whitespace-pre`}
            >
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
        "relative my-4 sm:my-8 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-lg w-full",
        className,
      )}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 px-2 sm:px-4 py-2 sm:py-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          </div>
          {title && (
            <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{title}</span>
          )}
          {!title && <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono">{language}</span>}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-6 w-6 sm:h-8 sm:w-8 p-0 hover:bg-slate-200 dark:hover:bg-slate-700 flex-shrink-0"
        >
          {copied ? (
            <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
          ) : (
            <Copy className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600 dark:text-slate-400" />
          )}
        </Button>
      </div>

      {/* 코드 영역 */}
      <div className="relative bg-slate-950 dark:bg-slate-900">
        <pre className="p-2 sm:p-4 overflow-x-auto text-xs sm:text-sm">
          <code ref={codeRef} className={`language-${language} block`}>
            {highlightLines.length > 0 ? (
              // 하이라이트 라인이 있는 경우
              <div>
                {codeLines.map((line, index) => (
                  <div
                    key={index}
                    className={cn(
                      "leading-5 sm:leading-6 whitespace-pre",
                      highlightLines.includes(index + 1) &&
                        "bg-blue-500/20 -mx-2 sm:-mx-4 px-2 sm:px-4 border-l-2 sm:border-l-4 border-blue-500",
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
                className="font-mono text-slate-100 leading-5 sm:leading-6 whitespace-pre"
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
