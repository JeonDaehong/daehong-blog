import { CodeBlock } from "@/components/code-block"
import type React from "react"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  console.log("[v0] MarkdownRenderer received content:", content.substring(0, 200))

  const parseMarkdown = (text: string) => {
    const lines = text.split("\n")
    const elements: React.ReactNode[] = []
    let i = 0
    let codeBlock = ""
    let codeLanguage = ""
    let inCodeBlock = false
    let listItems: string[] = []
    let listType: "ul" | "ol" | null = null
    let inSpecialSection: "followup" | "terminology" | null = null
    let specialSectionContent: React.ReactNode[] = []

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const ListTag = listType
        const listElement = (
          <ListTag key={`list-${elements.length}`} className="ml-6 mb-4 space-y-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-gray-700 dark:text-gray-300">
                {parseInline(item)}
              </li>
            ))}
          </ListTag>
        )

        if (inSpecialSection) {
          specialSectionContent.push(listElement)
        } else {
          elements.push(listElement)
        }

        listItems = []
        listType = null
      }
    }

    const flushSpecialSection = () => {
      if (inSpecialSection && specialSectionContent.length > 0) {
        if (inSpecialSection === "followup") {
          elements.push(
            <div
              key={`followup-${elements.length}`}
              className="my-6 p-5 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 rounded-r-lg"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">꼬리질문</h4>
                  <div className="space-y-2">{specialSectionContent}</div>
                </div>
              </div>
            </div>,
          )
        } else if (inSpecialSection === "terminology") {
          elements.push(
            <div
              key={`terminology-${elements.length}`}
              className="my-6 p-5 bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">❓</span>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3">IT 용어</h4>
                  <div className="space-y-2">{specialSectionContent}</div>
                </div>
              </div>
            </div>,
          )
        }

        inSpecialSection = null
        specialSectionContent = []
      }
    }

    const parseInline = (text: string) => {
      // Handle images ![alt](url) - must be done before bold/italic to avoid conflicts
      const imageRegex = /!\[([^\]]*)\]$$([^)]+)$$/g
      const parts: (string | React.ReactNode)[] = []
      let lastIndex = 0
      let match

      while ((match = imageRegex.exec(text)) !== null) {
        // Add text before the image
        if (match.index > lastIndex) {
          parts.push(text.slice(lastIndex, match.index))
        }

        // Add the image
        const alt = match[1]
        const url = match[2]
        parts.push(
          <img
            key={`img-${match.index}`}
            src={url || "/placeholder.svg"}
            alt={alt}
            className="max-w-full h-auto rounded-lg my-4 border border-gray-200 dark:border-gray-700"
          />,
        )

        lastIndex = match.index + match[0].length
      }

      // If we found images, handle the remaining text
      if (parts.length > 0) {
        if (lastIndex < text.length) {
          parts.push(text.slice(lastIndex))
        }

        // Process bold, italic, and inline code on text parts only
        return parts.map((part, idx) => {
          if (typeof part === "string") {
            let result = part.replace(
              /\*\*(.*?)\*\*/g,
              '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>',
            )
            result = result.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
            result = result.replace(
              /`([^`]+)`/g,
              '<code class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">$1</code>',
            )
            return <span key={idx} dangerouslySetInnerHTML={{ __html: result }} />
          }
          return part
        })
      }

      // No images found, process as before
      let result = text.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>',
      )
      result = result.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      result = result.replace(
        /`([^`]+)`/g,
        '<code class="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">$1</code>',
      )

      return <span dangerouslySetInnerHTML={{ __html: result }} />
    }

    while (i < lines.length) {
      const line = lines[i]

      if (line.includes("**💬 꼬리질문") || line.includes("💬 꼬리질문")) {
        flushList()
        flushSpecialSection()
        inSpecialSection = "followup"
        i++
        continue
      }

      if (line.includes("**❓ IT 용어") || line.includes("❓ IT 용어")) {
        flushList()
        flushSpecialSection()
        inSpecialSection = "terminology"
        i++
        continue
      }

      // Handle code blocks
      if (line.trim().startsWith("```")) {
        flushList()
        if (!inCodeBlock) {
          inCodeBlock = true
          codeLanguage = line.trim().slice(3).trim() || "plaintext"
          codeBlock = ""
        } else {
          inCodeBlock = false
          const codeElement = (
            <div key={`code-${elements.length}`} className="my-4">
              <CodeBlock language={codeLanguage}>{codeBlock.trim()}</CodeBlock>
            </div>
          )

          if (inSpecialSection) {
            specialSectionContent.push(codeElement)
          } else {
            elements.push(codeElement)
          }

          codeBlock = ""
          codeLanguage = ""
        }
        i++
        continue
      }

      if (inCodeBlock) {
        codeBlock += line + "\n"
        i++
        continue
      }

      // Handle headings
      if (line.startsWith("### ")) {
        flushList()
        const heading = (
          <h3 key={`h3-${elements.length}`} className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
            {line.slice(4)}
          </h3>
        )

        if (inSpecialSection) {
          specialSectionContent.push(heading)
        } else {
          elements.push(heading)
        }
        i++
        continue
      }

      if (line.startsWith("## ")) {
        flushList()
        flushSpecialSection()
        elements.push(
          <h2 key={`h2-${elements.length}`} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            {line.slice(3)}
          </h2>,
        )
        i++
        continue
      }

      // Handle unordered lists
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        if (listType !== "ul") {
          flushList()
          listType = "ul"
        }
        listItems.push(line.trim().slice(2))
        i++
        continue
      }

      // Handle ordered lists
      if (/^\d+\.\s/.test(line.trim())) {
        if (listType !== "ol") {
          flushList()
          listType = "ol"
        }
        listItems.push(line.trim().replace(/^\d+\.\s/, ""))
        i++
        continue
      }

      // If we were in a list and now we're not, flush it
      if (listType && !line.trim().startsWith("-") && !line.trim().startsWith("*") && !/^\d+\.\s/.test(line.trim())) {
        flushList()
      }

      if (line.trim().match(/^!\[([^\]]*)\]$$([^)]+)$$$/)) {
        flushList()
        const match = line.trim().match(/^!\[([^\]]*)\]$$([^)]+)$$$/)
        if (match) {
          const alt = match[1]
          const url = match[2]
          const imageElement = (
            <div key={`img-block-${elements.length}`} className="my-6">
              <img
                src={url || "/placeholder.svg"}
                alt={alt}
                className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700"
              />
            </div>
          )

          if (inSpecialSection) {
            specialSectionContent.push(imageElement)
          } else {
            elements.push(imageElement)
          }
        }
        i++
        continue
      }

      // Handle empty lines
      if (line.trim() === "") {
        flushList()
        const space = <div key={`space-${elements.length}`} className="h-2" />

        if (inSpecialSection) {
          specialSectionContent.push(space)
        } else {
          elements.push(space)
        }
        i++
        continue
      }

      // Handle regular paragraphs
      if (line.trim()) {
        flushList()
        const paragraph = (
          <p key={`p-${elements.length}`} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {parseInline(line)}
          </p>
        )

        if (inSpecialSection) {
          specialSectionContent.push(paragraph)
        } else {
          elements.push(paragraph)
        }
      }

      i++
    }

    // Flush any remaining list and special section
    flushList()
    flushSpecialSection()

    return elements
  }

  return <div className="markdown-content">{parseMarkdown(content)}</div>
}
