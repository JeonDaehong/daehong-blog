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

      // 존재하는 언어 컴포넌트만 로드
      await Promise.all([
        import("prismjs/components/prism-javascript"),
        import("prismjs/components/prism-typescript"),
        import("prismjs/components/prism-java"),
        import("prismjs/components/prism-python"),
        import("prismjs/components/prism-bash"),
        import("prismjs/components/prism-sql"),
        import("prismjs/components/prism-json"),
        import("prismjs/components/prism-css"),
        import("prismjs/components/prism-jsx"),
        import("prismjs/components/prism-tsx"),
        import("prismjs/components/prism-scala"),
        import("prismjs/components/prism-yaml"),
        import("prismjs/components/prism-markup"), // HTML
      ])

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
