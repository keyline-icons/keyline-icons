"use client"

import * as React from "react"

import type { BrowserIcon, Container, Style } from "@/components/glyph"
import type { BrowserSettings } from "@/lib/browser-settings"
import { IconBrowser } from "@/components/icon-browser"
import { SiteHero } from "@/components/site-hero"
import { searchSuggestions } from "@/lib/search-suggestions"

/**
 * The hero and the browser, with the search between them.
 *
 * The field is the hero's loudest element and the grid is what it filters, so
 * the query is owned here rather than by either of them. Everything else the
 * browser knows stays inside the browser.
 */
export function IconLibrary({
  icons,
  initialSettings,
  initialQuery = "",
  initialStyle,
  initialShape,
}: {
  icons: BrowserIcon[]
  initialSettings: BrowserSettings
  /** Seeded from `?icon=`, so a link to one icon opens filtered to it. */
  initialQuery?: string
  /** Seeded from `?style=`, so a link can open on one weight. */
  initialStyle?: Style
  /** Seeded from `?shape=`, so a link can open on one container form. */
  initialShape?: Container
}) {
  /**
   * Deliberately not persisted: a search that survives a reload greets you with
   * a library that looks half-built. See `lib/browser-settings.ts`.
   *
   * The seed is the exception, and it arrives as a prop rather than being read
   * here. `?icon=circle-arrow-down` gives a single icon an address that can be
   * sent to someone, and the page already renders per request for the settings
   * cookie, so the server can read the parameter and hand it down.
   *
   * The first attempt read `window.location.search` in an effect and called
   * `setQuery`. That works and is wrong twice over: the React Compiler rejects
   * a synchronous `setState` in an effect body, and it renders the unfiltered
   * grid before replacing it, which is a visible flash of the wrong content.
   * Reading it on the server means the first paint is already filtered.
   *
   * Nothing writes back to the URL afterwards. Typing replaces the seed and
   * leaves the address alone, because rewriting it on every keystroke would put
   * a hundred entries in the back button for one visit.
   */
  const [query, setQuery] = React.useState(initialQuery)

  /**
   * The names the field suggests, matched to the drawings behind them.
   *
   * Resolved here because this is where the set already is: the hero would
   * otherwise have to be handed all 414 icons to find eight. Memoised because
   * it is eight scans of that array and this component re-renders on every
   * keystroke.
   */
  const suggestions = React.useMemo(() => searchSuggestions(icons), [icons])

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
          initialSettings={initialSettings}
          initialStyle={initialStyle}
          initialShape={initialShape}
          query={query}
          onQueryChange={setQuery}
        />
      </div>
    </>
  )
}
