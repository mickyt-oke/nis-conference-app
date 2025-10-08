import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NIS Conference Management System",
  description: "Nigeria Immigration Service Conference Management Platform",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <LanguageProvider>
            {children}
            <Toaster position="top-right" />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
