// Prism 전역 로더
let prismLoaded = false
let prismLoadPromise: Promise<any> | null = null

export async function loadPrism() {
  if (prismLoaded) {
    return (window as any).Prism
  }

  if (prismLoadPromise) {
    return prismLoadPromise
  }

  prismLoadPromise = (async () => {
    try {
      const Prism = (await import("prismjs")).default

      // Basic languages first
      await import("prismjs/components/prism-javascript")
      await import("prismjs/components/prism-typescript")
      await import("prismjs/components/prism-markup") // HTML (needed for JSX/TSX)
      await import("prismjs/components/prism-css")

      // JSX requires markup and javascript
      await import("prismjs/components/prism-jsx")

      // TSX requires typescript and jsx
      await import("prismjs/components/prism-tsx")

      // Load remaining languages sequentially to avoid dependency issues
      await import("prismjs/components/prism-java")
      await import("prismjs/components/prism-python")
      await import("prismjs/components/prism-bash")
      await import("prismjs/components/prism-sql")
      await import("prismjs/components/prism-json")
      await import("prismjs/components/prism-scala")
      await import("prismjs/components/prism-yaml")

      prismLoaded = true
      return Prism
    } catch (error) {
      console.error("Failed to load Prism:", error)
      prismLoadPromise = null
      throw error
    }
  })()

  return prismLoadPromise
}

export function highlightCode(code: string, language: string): string {
  if (!prismLoaded || typeof window === "undefined") {
    return code
  }

  const Prism = (window as any).Prism

  const languageMap: { [key: string]: string } = {
    js: "javascript",
    ts: "typescript",
    jsx: "jsx",
    tsx: "tsx",
    py: "python",
    sh: "bash",
    shell: "bash",
    yml: "yaml",
    yaml: "yaml",
    html: "markup",
    xml: "markup",
    dockerfile: "bash", // dockerfile을 bash로 대체
    md: "markdown",
    markdown: "markup",
  }

  const mappedLanguage = languageMap[language] || language

  if (Prism.languages[mappedLanguage]) {
    return Prism.highlight(code, Prism.languages[mappedLanguage], mappedLanguage)
  }

  return code
}
