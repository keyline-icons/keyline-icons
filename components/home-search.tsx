"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { startRouteProgress } from "@/components/route-progress"
import { IconSearch, type SearchSuggestion } from "@/components/icon-search"

/**
 * The hero's search field, which searches a page that is not this one.
 *
 * The browser owns the grid and the filtering; this is the doorway to it. So
 * the field holds its own text, does nothing while you type, and hands the
 * query to `/icons` on submit, where the grid narrows on arrival. That is the
 * whole component: the same field, the same placeholder animation and the same
 * ⌘K, wired to a navigation instead of to a filter.
 *
 * **It emits no link.** `?icon=` seeds the browser's search and is deliberately
 * not an address for anything: the route policy gives every icon `/icons/<name>`
 * and canonicalises the query form away, and it holds because nothing on the
 * site *links* to it. A form submit is a navigation the reader asks for, not an
 * `<a href>` in the markup, so there is nothing here for a crawler to follow
 * into a query-string URL. Writing this as a link would break that rule; a
 * `router.push` keeps it.
 *
 * An empty field still submits, and lands on the browser unfiltered. Pressing
 * Enter on an empty search reading as broken is worse than a redundant trip to
 * a page that was one button away.
 */
export function HomeSearch({
  suggestions,
  className,
}: {
  /**
   * What the field spells out, with the drawing behind each name. Resolved on
   * the server by `app/page.tsx`, which has the set loaded already; this
   * component never sees the library.
   */
  suggestions: readonly SearchSuggestion[]
  className?: string
}) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")

  /*
    The destination is prefetched on mount rather than on hover, because this
    field is the fastest path off the landing page and the grid is the heaviest
    page on the site. By the time anyone has typed a name, it is already there.
  */
  React.useEffect(() => {
    router.prefetch("/icons")
  }, [router])

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault()
        const term = query.trim()
        // No link was clicked, so the top bar has nothing to read this
        // navigation from and has to be told. See `route-progress.tsx`.
        startRouteProgress()
        router.push(term ? `/icons?icon=${encodeURIComponent(term)}` : "/icons")
      }}
    >
      <IconSearch
        value={query}
        onValueChange={setQuery}
        suggestions={suggestions}
        // Left-aligned inside a centred hero. A text input whose caret starts
        // in the middle reads as broken rather than as composed, which is the
        // same exception the browser's own hero makes.
        className="text-left"
      />
    </form>
  )
}
