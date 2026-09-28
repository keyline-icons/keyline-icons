"use client"

import { Geist } from "next/font/google"

import "./globals.css"
import { ErrorState } from "@/components/error-state"
import { ThemeProvider } from "@/components/theme-provider"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

/**
 * The last resort: what shows when the root layout itself fails, which
 * `error.tsx` cannot catch because it sits inside that layout.
 *
 * It replaces the layout outright, so it brings its own `<html>` and
 * `<body>`, the global stylesheet, the font and the site's `ThemeProvider`,
 * the same one the layout uses, so it follows the reader's theme rather than
 * painting a white page into dark mode the way Next's built-in did. No site
 * bar and nothing else from the layout: whatever broke may be in it.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`font-sans antialiased ${geist.variable}`}
    >
      <body className="flex min-h-svh flex-col">
        <ThemeProvider>
          <ErrorState
            error={error}
            retry={retry}
            lead="The site failed to load. Trying again usually fixes it."
            way={{ href: "/", label: "Home" }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
