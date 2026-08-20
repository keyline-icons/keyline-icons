import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import {
  OG_DEFAULTS,
  SITE_DESCRIPTION,
  SITE_URL,
  TWITTER_DEFAULTS,
} from "@/lib/seo"
import { SET_TITLE } from "@/lib/site-chrome"
import { RouteProgress } from "@/components/route-progress"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

/**
 * Everything a page does not say for itself.
 *
 * Read this as a list of defaults, not as the site's head: the fields that
 * identify a *page*, meaning title, description, canonical and `og:url`, are
 * set by the pages, through `pageMetadata` in `lib/seo.ts`.
 *
 * Two omissions here are load-bearing:
 *
 * - **No `alternates`.** A canonical set on a layout is inherited by every
 *   route below it that does not set its own, so `canonical: "/"` here would
 *   make every page in the site declare itself the homepage: the one mistake
 *   that collapses a whole site to a single indexed URL, and it fails silently
 *   because the tag it emits is perfectly well-formed.
 * - **No `openGraph.url`.** Same inheritance, same reason: a card that always
 *   links home no matter which page was shared.
 *
 * `metadataBase` is the opposite case and must be here: it is what lets
 * relative URLs anywhere below resolve to absolute ones, and without it the
 * build fails on the first relative image, or worse, resolves against
 * `localhost` in a preview.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Used only by a route that sets no title at all. There is no such route
    // today; it exists so that the next one added is wrong in a survivable way.
    default: `${SET_TITLE}: free icons for shadcn/ui`,
    // Pages pass their own name only. "Mobile demo" renders as
    // "Mobile demo · Keyline Icons"; passing the full title here would render
    // the set name twice.
    //
    // The separator is the middle dot the hero and the social card already
    // use, so the three read as one voice.
    template: `%s · ${SET_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SET_TITLE,
  keywords: [
    "free icons",
    "free svg icons",
    "icon set",
    "shadcn/ui icons",
    "react icons",
    "stroke icons",
    "duotone icons",
    "24px icon grid",
  ],
  authors: [{ name: SET_TITLE, url: SITE_URL }],
  creator: SET_TITLE,
  publisher: SET_TITLE,
  // Fallbacks only. A page setting `openGraph` or `twitter` *replaces* these
  // objects rather than extending them, so `pageMetadata` spreads the same two
  // constants back in. See the note on them in `lib/seo.ts`.
  //
  // `app/opengraph-image.tsx` supplies `og:image` and its dimensions on its
  // own, for this segment and every one below it, so no `images` key here.
  openGraph: OG_DEFAULTS,
  twitter: TWITTER_DEFAULTS,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Uncapped snippet, image and video previews. The defaults are already
      // uncapped; stating them stops a future `max-image-preview: none` from
      // being inherited by accident, and is what gets the OG image into a
      // Discover card.
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "design",
  // Not an SEO field. It names the shortcut when the site is added to an iOS
  // home screen, next to the touch icon `pipeline/build-brand.mjs` generates.
  // Without it the label is whatever the page title happened to be.
  appleWebApp: { title: SET_TITLE },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            {/*
              Outside the flex column below rather than inside it, because it is
              fixed and the note on that element explains what happens to a
              fixed child of anything that gets a transform or a filter. Here it
              is a sibling and cannot be caught by one.
            */}
            <RouteProgress />
            {/*
              A floor under every page, so the footer can be pushed to the
              bottom of the window whenever the content is too short to reach
              it (`mt-auto` in `site-footer.tsx`). Without it the footer simply
              ends where the content ends and the rest of the window is blank —
              most visible after the grid widens from a narrow layout to a wide
              one, where the same 360 icons occupy a fraction of the height.

              Plain flex, deliberately: a `transform`, `filter` or
              `will-change` here would become the containing block for the
              fixed site bar and confine every panel's `backdrop-filter` to
              this element.
            */}
            <div className="flex min-h-svh flex-col">{children}</div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
