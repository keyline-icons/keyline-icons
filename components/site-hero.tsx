"use client"

import { IconSearch, type SearchSuggestion } from "@/components/icon-search"
import { SET_LICENSE, SET_TAGLINE } from "@/lib/site-chrome"

/**
 * The hero: what this page is, one line under it, and the field.
 *
 * The line carries three facts: what the set is for, what it ships in, and
 * what it costs, divided rather than stacked so none outranks the others. The
 * first is the one doing real work: it states the relationship to shadcn/ui as
 * compatibility rather than as authorship, which is why it is a line under the
 * heading instead of a word inside it.
 *
 * The heading was `SET_TITLE`, the set's name, for as long as this page was the
 * site's front door. It is not any more: `/` is the landing page and owns the
 * brand, its title and its `h1`. Two pages leading with the same name is how two
 * pages end up competing for one query, so this one names its own job instead,
 * word for word what its `<title>` says. The name is still on the page, in the
 * bar above it.
 *
 * `components/wordmark-field.tsx` — the wordmark cut out of the set itself —
 * is still on disk and unused, because this is where the design landed "for
 * now" rather than for good.
 */
export function SiteHero({
  total,
  suggestions,
  query,
  onQueryChange,
}: {
  /** How many icons the grid below holds. Read off disk, never typed. */
  total: number
  /** What the field spells out, with the drawings behind the names. */
  suggestions: readonly SearchSuggestion[]
  query: string
  onQueryChange: (next: string) => void
}) {
  return (
    // Centred as a block. The one thing that must opt out is the search field:
    // its placeholder and whatever you type would centre with everything else,
    // and a text input whose caret starts in the middle reads as broken rather
    // than as composed.
    <section className="pb-12 text-center lg:pb-16">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Browse {total} free icons
      </h1>

      {/*
        The divider is a real middle dot with its own spacing, not a hyphen and
        not a border between two spans — it is punctuation between clauses, so
        it belongs in the text where it wraps with them.

        Three clauses: what the set is for, what it ships in, and what it
        costs. The middle one was the AI credit, which is provenance: it belongs
        on the landing page, because whoever reaches the grid has already
        decided to browse and wants to know what the style switcher offers.

        The licence is the shortest of the three and the one carrying the most
        weight, because "free" in the heading above is a claim and this is what
        backs it. `SET_LICENSE` rather than the word, so it moves with the
        `LICENSE` file the footer and the structured data both read.
      */}
      <p className="mt-3 text-base text-balance text-muted-foreground">
        {SET_TAGLINE} · Stroke, duotone and fill · {SET_LICENSE}
      </p>

      {/*
        The field names icons rather than counting them, and draws the one it is
        naming. Which names, and why they are a constant rather than a slice of
        what was loaded, is in `lib/search-suggestions.ts`; the drawings are
        matched to them in `icon-library.tsx`, where the set is already in hand.
      */}
      <IconSearch
        value={query}
        onValueChange={onQueryChange}
        suggestions={suggestions}
        className="mx-auto mt-8 max-w-2xl text-left"
      />
    </section>
  )
}
