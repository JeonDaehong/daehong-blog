"use client"

import { useState, useMemo } from "react"
import { Search, Book, ChevronDown, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CodeBlock } from "@/components/code-block"
import { itTechnologies, categories } from "@/data/dictionary"

const formatTextWithBoldSubheadings = (text: string) => {
  // Convert **text** to HTML with blue styling
  return text.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #2563eb;">$1</strong>').replace(/\n/g, "<br />")
}

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTechnology, setSelectedTechnology] = useState<(typeof itTechnologies)[0] | null>(null)
  const [modalSearchTerm, setModalSearchTerm] = useState("")
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  const filteredTechnologies = useMemo(() => {
    return itTechnologies.filter((tech) => {
      const matchesSearch =
        tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = !selectedCategory || tech.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const filteredDetails = useMemo(() => {
    if (!selectedTechnology) return []

    return selectedTechnology.details
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter(
        ({ title, summary }) =>
          title.toLowerCase().includes(modalSearchTerm.toLowerCase()) ||
          summary.toLowerCase().includes(modalSearchTerm.toLowerCase()),
      )
  }, [selectedTechnology, modalSearchTerm])

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set<number>()
    if (!expandedItems.has(index)) {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  const handleModalClose = () => {
    setSelectedTechnology(null)
    setModalSearchTerm("")
    setExpandedItems(new Set())
  }

  const handleTechnologyClick = (tech: (typeof itTechnologies)[0]) => {
    setSelectedTechnology(tech)
  }

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName)
    return category ? category.icon : Book
  }

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName)
    return category ? category.color : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-6">
            <Book className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-round">
            대홍의 얇고 넓은 IT 백과사전
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            현업을 지내면서 얻은 지식들과 개인 공부를 통해 얻은 지식들
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="기술을 검색해보세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-2 border-green-200 dark:border-green-800 focus:border-green-500 dark:focus:border-green-400 rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">카테고리별 탐색</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                !selectedCategory
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
            >
              전체
            </button>
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    selectedCategory === category.name
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-6xl mx-auto">
          {filteredTechnologies.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-600 dark:text-gray-400">다른 키워드로 검색해보세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTechnologies.map((tech, index) => {
                const Icon = getCategoryIcon(tech.category)
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm cursor-pointer"
                    onClick={() => handleTechnologyClick(tech)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                          {tech.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-gray-500" />
                        </div>
                      </div>
                      <Badge className={`w-fit ${getCategoryColor(tech.category)}`}>{tech.category}</Badge>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {tech.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg">
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{itTechnologies.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">총 기술 수</div>
            </div>
            <div className="w-px h-12 bg-gray-200 dark:bg-gray-700"></div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{categories.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">카테고리</div>
            </div>
            <div className="w-px h-12 bg-gray-200 dark:bg-gray-700"></div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{filteredTechnologies.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">검색 결과</div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Detail Modal */}
      <Dialog open={!!selectedTechnology} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl lg:max-w-4xl max-h-[80vh] overflow-y-auto overflow-x-hidden">
          {selectedTechnology &&
            (() => {
              const ModalIcon = getCategoryIcon(selectedTechnology.category)

              return (
                <>
                  <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full">
                        <ModalIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white break-words">
                          {selectedTechnology.name}
                        </DialogTitle>
                        <Badge className={`mt-1 ${getCategoryColor(selectedTechnology.category)}`}>
                          {selectedTechnology.category}
                        </Badge>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="mt-6 overflow-hidden">
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed break-words">
                      {selectedTechnology.description}
                    </p>

                    <div className="mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="text"
                          placeholder="지식 항목을 검색해보세요..."
                          value={modalSearchTerm}
                          onChange={(e) => setModalSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border-2 border-green-200 dark:border-green-800 focus:border-green-500 dark:focus:border-green-400 rounded-lg"
                          tabIndex={-1}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 break-words">
                        얇고 넓은 지식들
                        {modalSearchTerm && (
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                            ({filteredDetails.length}개 결과)
                          </span>
                        )}
                      </h3>

                      {filteredDetails.length === 0 && modalSearchTerm ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400">검색 결과가 없습니다.</p>
                        </div>
                      ) : (
                        filteredDetails.map(({ title, summary, detail, date, originalIndex }) => {
                          const isExpanded = expandedItems.has(originalIndex)
                          const originalItem = selectedTechnology.details[originalIndex]

                          return (
                            <div key={originalIndex} className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                              <div
                                className="flex gap-4 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                onClick={() => toggleExpanded(originalIndex)}
                              >
                                <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                                    {originalIndex + 1}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0 overflow-hidden">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1 sm:gap-0">
                                    <h4 className="font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors break-words">
                                      {title}
                                    </h4>
                                    {date && (
                                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full flex-shrink-0 w-fit">
                                        {date}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2 break-words">
                                    {summary}
                                  </p>
                                  {isExpanded && (
                                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                      <div
                                        className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm break-words overflow-wrap-anywhere"
                                        dangerouslySetInnerHTML={{ __html: formatTextWithBoldSubheadings(detail) }}
                                      />
                                      {originalItem.codeExample && (
                                        <div className="mt-4">
                                          <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            예시 코드:
                                          </h5>
                                          <div className="overflow-x-auto">
                                            <CodeBlock language="sql" className="text-xs sm:text-sm whitespace-pre">
                                              {originalItem.codeExample}
                                            </CodeBlock>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <div className="flex-shrink-0">
                                  {isExpanded ? (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                  ) : (
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                </>
              )
            })()}
        </DialogContent>
      </Dialog>
    </div>
  )
}
