"use client"

import { TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

export function BlogStats() {
  const [totalViews, setTotalViews] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedViews = localStorage.getItem("blog-total-views")
    if (storedViews) {
      setTotalViews(Number.parseInt(storedViews))
    } else {
      // Initialize with a reasonable number
      const initialViews = 1250
      localStorage.setItem("blog-total-views", initialViews.toString())
      setTotalViews(initialViews)
    }

    // Increment view count
    const newViewCount = (Number.parseInt(localStorage.getItem("blog-total-views") || "1250") + 1).toString()
    localStorage.setItem("blog-total-views", newViewCount)
    setTotalViews(Number.parseInt(newViewCount))

    setIsLoading(false)
  }, [])

  return (
    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm shadow-lg">
      <div className="p-2 bg-blue-500/20 rounded-full">
        <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-muted-foreground">Total Visitors</span>
        {isLoading ? (
          <div className="h-6 w-20 bg-muted/50 animate-pulse rounded mt-0.5"></div>
        ) : (
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            {totalViews.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  )
}
