"use client"

import { Eye } from "lucide-react"
import { useEffect, useState } from "react"

interface PostViewsProps {
  postId: string
}

export function PostViews({ postId }: PostViewsProps) {
  const [views, setViews] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storageKey = `post-views-${postId}`
    const storedViews = localStorage.getItem(storageKey)

    if (storedViews) {
      const currentViews = Number.parseInt(storedViews)
      const newViews = currentViews + 1
      localStorage.setItem(storageKey, newViews.toString())
      setViews(newViews)
    } else {
      // Initialize with a random number between 50-200
      const initialViews = Math.floor(Math.random() * 150) + 50
      localStorage.setItem(storageKey, initialViews.toString())
      setViews(initialViews)
    }

    setIsLoading(false)
  }, [postId])

  if (isLoading) {
    return (
      <div className="flex items-center space-x-1 text-muted-foreground">
        <Eye className="h-4 w-4" />
        <span className="text-sm">...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-1 text-muted-foreground">
      <Eye className="h-4 w-4" />
      <span className="text-sm">{views.toLocaleString()}회</span>
    </div>
  )
}
