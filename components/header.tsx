"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/me", label: "Me" },
    { href: "/blog", label: "Blog" },
    { href: "/dictionary", label: "IT Dictionary" },
    { href: "/books", label: "Books" }, // Added Books navigation item
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary transition-all duration-300 group-hover:scale-110">
              {"</>"}
            </div>
          </div>
        </Link>
        <nav className="ml-auto flex items-center space-x-4 md:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 relative",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
                "after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                pathname === item.href && "after:w-full",
              )}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
