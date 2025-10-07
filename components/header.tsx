"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/dictionary", label: "IT Dictionary" },
    { href: "/books", label: "Books" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-2 sm:px-4">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex items-center space-x-2">
            <div className="text-xl sm:text-2xl font-bold text-primary transition-all duration-300 group-hover:scale-110">
              {"</>"}
            </div>
          </div>
        </Link>
        <nav className="ml-auto flex items-center space-x-1 sm:space-x-4 md:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-xs sm:text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 relative px-1 sm:px-0",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
                "after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
                pathname === item.href && "after:w-full",
                // Hide "IT Dictionary" text on very small screens, show abbreviated version
                item.href === "/dictionary" && "hidden xs:inline sm:inline",
              )}
            >
              {item.href === "/dictionary" ? (
                <>
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">IT Dict</span>
                </>
              ) : (
                item.label
              )}
            </Link>
          ))}
          <Link
            href="/dictionary"
            className={cn(
              "text-xs font-medium transition-all duration-300 hover:text-primary hover:scale-105 relative px-1 xs:hidden sm:hidden",
              pathname === "/dictionary" ? "text-primary" : "text-muted-foreground",
              "after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
              pathname === "/dictionary" && "after:w-full",
            )}
          >
            Dict
          </Link>
          <div className="ml-1 sm:ml-0">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
