import type React from "react"
import type { Metadata } from "next"
import { Inter, Comfortaa } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { PrismLoader } from "@/components/prism-loader"

const inter = Inter({ subsets: ["latin"] })
const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Daehong's Commit Log",
  description: "개발자 대홍의 기술 블로그",
  generator: "v0.app",
  icons: {
    icon: "/dh-logo.png",
    shortcut: "/dh-logo.png",
    apple: "/dh-logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} ${comfortaa.variable} min-h-screen flex flex-col font-round`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PrismLoader />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
