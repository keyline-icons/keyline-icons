"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

/**
 * The mockup's own header, which is the app's chrome and not the site's.
 *
 * This carried the site's links for a while, on the grounds that the demo was
 * somewhere you could get into and not back out of. That was true when the
 * dashboard was the whole page. It now sits inside a browser frame on an
 * ordinary site page, so `SiteNav` is on screen above it and the links here
 * would be this site's navigation drawn inside a mockup of somebody else's
 * product — which reads as a mistake rather than as a way out.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) supports-[backdrop-filter]:bg-background/80 md:rounded-t-xl">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        {/*
          `sr-only sm:not-sr-only`, not `hidden sm:block`. The two look
          identical: `sr-only` takes the heading out of flow by making it
          absolute, so it occupies no space and the flex gap closes exactly as
          `display: none` would.

          The difference is who can still see it. `hidden` is `display: none`,
          which removes the element from the accessibility tree as well as the
          page. This is no longer the page's only heading — the showcase around
          it carries the `h1` now — but a heading that vanishes from the tree at
          one breakpoint and not another is still the wrong way to hide it.
        */}
        <p className="sr-only text-base font-medium sm:not-sr-only">Dashboard</p>
      </div>
    </header>
  )
}
