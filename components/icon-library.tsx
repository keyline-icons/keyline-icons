"use client"

import * as React from "react"

import type { BrowserIcon, Container, Corners, Style } from "@/components/glyph"
import type { BrowserSettings } from "@/lib/browser-settings"
import type { searchSuggestions } from "@/lib/search-suggestions"
import { IconBrowser } from "@/components/icon-browser"
import { SiteHero } from "@/components/site-hero"
import { useTreatments } from "@/hooks/use-treatments"

/**
 * The hero and the browser, with the search between them.
 *
 * The field is the hero's loudest element and the grid is what it filters, so
 * the query is owned here rather than by either of them. Everything else the
 * browser knows stays inside the browser.
 */
export function IconLibrary({
  icons: initialIcons,
  treatments: pendingTreatments,
  suggestions,
  initialSettings,
  initialQuery = "",
  initialStyle,
  initialShape,
  initialIcon,
  initialIconStyle,
  initialIconCorners,
  initialPage,
}: {
  /** Every icon, in the corner treatments the page carried. */
  icons: BrowserIcon[]
  /** Where each treatment the page did not carry can be fetched. */
  treatments: Partial<Record<Corners, string>>
  /**
   * The names the search field offers, with their drawings. Resolved on the
   * server, which has the whole set: the icons here may be missing the
   * rounded treatment these are always drawn in.
   */
  suggestions: ReturnType<typeof searchSuggestions>
  initialSettings: BrowserSettings
  /** Seeded from `?search=`, so a link can open the grid already narrowed. */
  initialQuery?: string
  /** Seeded from `?style=`, so a link can open on one weight. */
  initialStyle?: Style
  /** Seeded from `?shape=`, so a link can open on one container form. */
  initialShape?: Container
  /** Seeded from `?icon=`, so a link can open with the dock on one drawing. */
  initialIcon?: string
  /** Seeded from `?icon-style=` / `?icon-corners=`: how the dock shows it. */
  initialIconStyle?: Style
  initialIconCorners?: Corners
  /** Seeded from `?page=`, so each page of the grid has its own address. */
  initialPage?: number
}) {
  /**
   * Deliberately not persisted: a search that survives a reload greets you with
   * a library that looks half-built. See `lib/browser-settings.ts`.
   *
   * The seed is the exception, and it arrives as a prop rather than being read
   * here. `?search=circle+arrow` gives a narrowed grid an address that can be
   * sent to someone, and the page already renders per request for the settings
   * cookie, so the server can read the parameter and hand it down.
   *
   * The first attempt read `window.location.search` in an effect and called
   * `setQuery`. That works and is wrong twice over: the React Compiler rejects
   * a synchronous `setState` in an effect body, and it renders the unfiltered
   * grid before replacing it, which is a visible flash of the wrong content.
   * Reading it on the server means the first paint is already filtered.
   *
   * Typing *does* write back to the URL, but from inside the browser rather
   * than from here. `IconBrowser` owns the other half of what the address says,
   * which icon the dock is on, and one writer for the two keys is what stops
   * them overwriting each other. It replaces rather than pushes, so a hundred
   * keystrokes still leave one entry in the back button.
   */
  const [query, setQuery] = React.useState(initialQuery)

  /*
    The set, owned here so the grid and the dock read one copy, and a corner
    treatment fetched by either lands in both.
  */
  const { icons, treatments } = useTreatments(initialIcons, pendingTreatments)

  return (
    <>
      {/* The count comes from the icons this component was handed, so the
          heading cannot claim a number the grid below it does not have. */}
      <SiteHero
        total={icons.length}
        suggestions={suggestions}
        query={query}
        onQueryChange={setQuery}
      />

      {/* The nav's "Get started" lands here. */}
      {/* scroll-mt clears the site bar, so the anchor doesn't land under it.
          The bar is 52px below `lg` and 68 above; the margin steps with it. */}
      <div id="icons" className="scroll-mt-15 lg:scroll-mt-19">
        <IconBrowser
          icons={icons}
          treatments={treatments}
          initialSettings={initialSettings}
          initialStyle={initialStyle}
          initialShape={initialShape}
          initialIcon={initialIcon}
          initialIconStyle={initialIconStyle}
          initialIconCorners={initialIconCorners}
          initialPage={initialPage}
          query={query}
          onQueryChange={setQuery}
        />
      </div>
    </>
  )
}
