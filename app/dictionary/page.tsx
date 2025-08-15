"use client"

import { useState, useMemo } from "react"
import { Search, Book, Zap, Monitor, ChevronDown, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CodeBlock } from "@/components/code-block"

// IT Technologies data - including Iceberg, Hadoop, and CAP theorem
const itTechnologies = [
  {
    name: "Iceberg",
    description: "대용량 분석 데이터셋을 위한 오픈 테이블 포맷",
    category: "빅데이터",
    details: [
      {
        title: "MOR(Merge-on-Read) vs COW(Copy-on-Write) 및 쓰기 모드 설정",
        summary: "Iceberg의 두 가지 주요 테이블 타입과 개별 연산별 설정 방법",
        date: "25.08.12",
        detail: `Apache Iceberg에서 테이블의 쓰기 모드(write.update.mode, write.delete.mode, write.merge.mode)는 COW(Copy-On-Write)와 MOR(Merge-On-Read) 중 선택할 수 있으며, 삽입, 수정, 삭제 연산마다 개별적으로 설정 가능합니다.

COW (Copy-On-Write): 데이터를 삽입, 수정, 삭제할 때 기존 파일을 새로 복사하면서 변경 사항을 반영합니다. 즉, 적재 시점에 데이터가 실제 파일에 반영되므로 쓰기 비용이 크지만, 조회 시 최신 파일만 읽기 때문에 읽기 성능이 높습니다.

MOR (Merge-On-Read): 데이터를 삽입, 수정, 삭제할 때 변경 내용은 별도의 로그 파일에 기록하고, 원본 데이터 파일과 병합하여 읽습니다. 따라서 쓰기 시점의 비용은 낮지만, 조회 시 로그와 원본을 합쳐야 하므로 읽기 비용이 상대적으로 높습니다.

즉, Iceberg 테이블에서는 삽입, 수정, 삭제 시점마다 COW와 MOR를 개별적으로 선택할 수 있으며, 테이블 사용 환경과 요구사항에 따라 어느 시점에 비용을 지불할지 결정하여 최적의 설정을 선택할 수 있습니다.`,
        codeExample: `CREATE TABLE spark_catalog.default.example_table (
    id INT,
    name STRING
)
USING iceberg
TBLPROPERTIES (
    'write.update.mode'='merge-on-read',   -- UPDATE는 MOR
    'write.delete.mode'='copy-on-write',   -- DELETE는 COW
    'write.merge.mode'='merge-on-read'     -- MERGE/INSERT는 MOR
);`,
      },
    ],
  },
  {
    name: "Hadoop",
    description: "대용량 데이터 처리를 위한 분산 컴퓨팅 프레임워크",
    category: "빅데이터",
    details: [
      {
        title: "MapReduce Combiner와 결합법칙/교환법칙",
        summary: "맵 단계에서 중간 결과를 미리 합치는 Combiner의 동작 원리와 수학적 조건",
        date: "25.08.13",
        detail: `MapReduce의 Combiner는 맵 단계에서 생성된 중간 결과를 리듀서로 보내기 전에 로컬에서 미리 합치는 기능입니다. 예를 들어, 단어 수를 세는 작업에서 각 맵 노드가 처리한 문서에서 나온 단어별 개수를 먼저 합산한 후 리듀서로 보내면, 네트워크를 통해 전송되는 데이터 양을 크게 줄일 수 있습니다.

Combiner는 최적화용으로 사용되며, 항상 사용해도 되는 것은 아니고, 합치기 연산이 결합 법칙(associative)과 교환 법칙(commutative)을 만족할 때만 정확한 결과를 보장합니다.

결합 법칙(associative law): 연산의 순서와 상관없이 결과가 같다는 법칙입니다.
예: (a+b)+c = a+(b+c)
단어 수 합산에서 각 맵 노드의 중간 결과를 어떤 순서로 합치든 최종 합계는 같다는 의미입니다.

교환 법칙(commutative law): 피연산자의 순서를 바꾸어도 결과가 같다는 법칙입니다.
예: a+b = b+a
어떤 맵 노드의 결과를 먼저 합치든 나중에 합치든 최종 단어 수는 동일합니다.`,
      },
      {
        title: "MapReduce 동작 조건",
        summary: "MapReduce가 실행되는 조건과 단순 데이터 읽기/쓰기와의 차이점",
        date: "25.08.15",
        detail: `HDFS의 put·get 명령이나 Hive의 단순 SELECT 구문은 데이터를 단순히 읽고 쓰는 작업만 수행하므로 MapReduce가 실행되지 않습니다. MapReduce는 GROUP BY나 JOIN처럼 대용량 데이터를 분산 처리하고 집계하는 연산이 필요할 때에만 동작합니다.

최근에는 Hive나 Pig 등에서 MapReduce 대신 Tez나 Spark 같은 DAG 기반 실행 엔진을 사용하여 동일한 분산 연산을 더 빠르고 효율적으로 수행할 수 있습니다. 이러한 엔진도 마찬가지로 단순 데이터 읽기/쓰기에는 동작하지 않고, 연산이 필요한 경우에만 실행됩니다.`,
      },
    ],
  },
  {
    name: "분산 컴퓨팅",
    description: "분산 시스템에서 일관성, 가용성, 파티션 허용성의 트레이드오프",
    category: "CS",
    details: [
      {
        title: "CAP 이론의 핵심 개념과 실제 적용 사례",
        summary: "분산 시스템에서 세 가지 속성 중 두 가지만 선택할 수 있다는 원리와 실무 예시",
        date: "25.08.14",
        detail: `CAP 이론은 분산 시스템에서 일관성(Consistency), 가용성(Availability), 파티션 허용성(Partition Tolerance) 중 세 가지를 동시에 완벽히 만족할 수 없다는 원리입니다.

P(파티션 허용성)는 네트워크 장애가 불가피하므로 사실상 항상 유지해야 하며, 결국 CP(일관성·파티션 허용) 또는 AP(가용성·파티션 허용) 중 하나를 선택하게 됩니다.

CP 예시: 은행 송금 시스템 — 네트워크 장애 시 잘못된 잔액 표시를 막기 위해 거래를 잠시 중단하고 "나중에 다시 시도" 메시지를 반환.

AP 예시: SNS 타임라인 — 네트워크 장애 시 일부 오래된 글이 보일 수 있지만 서비스는 계속 제공.

즉, CP는 정확성 우선, AP는 연속성 우선이며, 서비스 성격에 맞춰 선택합니다.`,
      },
    ],
  },
]

const categories = [
  { name: "빅데이터", icon: Zap, color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
  { name: "CS", icon: Monitor, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
]

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
        <DialogContent className="max-w-[95vw] sm:max-w-3xl lg:max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedTechnology && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full">
                    {(() => {
                      const Icon = getCategoryIcon(selectedTechnology.category)
                      return <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                    })()}
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedTechnology.name}
                    </DialogTitle>
                    <Badge className={`mt-1 ${getCategoryColor(selectedTechnology.category)}`}>
                      {selectedTechnology.category}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
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
                      autoFocus={false}
                      tabIndex={-1}
                      className="pl-10 pr-4 py-2 border-2 border-green-200 dark:border-green-800 focus:border-green-500 dark:focus:border-green-400 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
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
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1 sm:gap-0">
                                <h4 className="font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                  {title}
                                </h4>
                                {date && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full flex-shrink-0 w-fit">
                                    {date}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">{summary}</p>
                              {isExpanded && (
                                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm whitespace-pre-line">
                                    {detail}
                                  </p>
                                  {originalItem.codeExample && (
                                    <div className="mt-4">
                                      <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        예시 코드:
                                      </h5>
                                      <CodeBlock language="sql" className="text-xs sm:text-sm">
                                        {originalItem.codeExample}
                                      </CodeBlock>
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
