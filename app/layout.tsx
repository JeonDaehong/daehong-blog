import type React from "react"
import type { Metadata } from "next"
import { Inter, Comfortaa } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { PrismLoader } from "@/components/prism-loader"
import { PWAInstaller } from "@/components/pwa-installer"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
  manifest: "/manifest.json",
  themeColor: "#0d6efd",
  icons: {
    icon: "/dh-logo.png",
    shortcut: "/dh-logo.png",
    apple: "/dh-logo.png",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Daehong's Blog",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0d6efd" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Daehong's Blog" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`${inter.className} ${comfortaa.variable} min-h-screen flex flex-col font-round`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PrismLoader />
          <PWAInstaller />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
