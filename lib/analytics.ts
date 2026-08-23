import { track as vercelTrack } from "@vercel/analytics"

import type { Format, PackageManager } from "@/lib/icon-code"
import type { Style } from "@/lib/icons"

/**
 * One place that says what this site counts, and one function that sends it.
 *
 * Two providers sit behind this, for one reason: page views and events are on
 * different plans. Vercel Web Analytics is free on Hobby and answers how many
 * people arrived and from where, but custom events are a Pro feature, so the
 * calls below reach it and are dropped. GA4 counts events for nothing, so it is
 * the one that will actually hold this data once its script is on the page.
 *
 * Nothing here is required for either to work. `<Analytics />` in the layout is
 * what records a page view; this module is only the layer above it, so a site
 * with no GA property and a Hobby plan still gets its traffic, and the call
 * sites do not have to know that.
 *
 * ## What is worth counting
 *
 * The set's own questions are not page views. They are which drawing was taken,
 * in which style and which format, and above all what was searched for and not
 * found: an empty search is a request for an icon from someone who will not
 * file one, and it is the only signal in the product that says what to draw
 * next. That is why `search_empty` carries the query itself.
 *
 * ## What may not go in a property
 *
 * Nothing about the reader. Every event below is a fact about the *set*: an
 * icon name, a style, a format, a query typed into a box that searches a public
 * list of icon names. No identifiers, no addresses, nothing typed anywhere else
 * on the site, which is what keeps the analytics as cookieless as the page view
 * it hangs off.
 */

/** What a property may be. Both providers take scalars and nothing else. */
type Value = string | number | boolean | null

/**
 * Every event the site sends, with the shape of its properties.
 *
 * A union rather than a loose string, so a call site cannot invent a fourth
 * spelling of "copy" and split a count three ways six months from now. Adding
 * an event means adding it here first, which is also the only list to read when
 * someone asks what the site collects.
 */
export type Events = {
  /** A snippet went to the clipboard. */
  icon_copy: {
    icon: string
    style: Style
    format: Format
    /** Which surface it was taken from: the dock over the grid, or the page. */
    surface: "dock" | "page"
  }
  /** An SVG file was saved. */
  icon_download: {
    icon: string
    style: Style
    surface: "dock" | "page"
  }
  /** An icon's name was copied, from the dock's title or the page's. */
  icon_name_copy: { icon: string }
  /**
   * A search that matched nothing, once the typing stopped.
   *
   * `elsewhere` is how many icons the same words would have found in another
   * style, and `suggestion` the spelling correction offered. Both separate the
   * two ways this event happens: the set has the drawing and the filters hid
   * it, or the set does not have the drawing at all. Only the second is a
   * request for work.
   */
  search_empty: {
    query: string
    style: Style
    shape: string
    category: string
    elsewhere: number
    suggestion: string | null
  }
  /** An install command was copied, from the install page or the landing one. */
  install_copy: {
    manager: PackageManager
    /** Which command: the whole set, one icon, or the page's shell block. */
    target: string
  }
}

type EventName = keyof Events

/**
 * GA4's global, if its script is on the page.
 *
 * Typed here rather than in a `.d.ts` so that the one file that touches it is
 * the one that declares it. It is optional at every call: the site ships
 * without a GA property today and must not throw when there is none.
 */
declare global {
  interface Window {
    gtag?: (
      command: "event",
      name: string,
      params?: Record<string, Value>
    ) => void
  }
}

/**
 * Send one event to whichever providers are present.
 *
 * Never throws. An analytics call sits inside a copy handler and a blocked
 * script, a refused request or a provider that is simply not configured must
 * not be the reason the clipboard write fails to report itself. Ad blockers
 * make that a normal condition rather than an edge case: a fair share of this
 * audience runs one, which is also why the counts here are worth reading as
 * proportions and not as totals.
 */
export function track<E extends EventName>(event: E, props: Events[E]) {
  if (typeof window === "undefined") return

  try {
    // Dropped on Hobby, where custom events are a Pro feature. The call is
    // harmless there and starts working the day the plan changes, which is the
    // whole reason it is here rather than waiting for that day.
    vercelTrack(event, props as Record<string, Value>)
  } catch {
    // Ignored on purpose: see above.
  }

  try {
    window.gtag?.("event", event, props as Record<string, Value>)
  } catch {
    // Ignored on purpose: see above.
  }
}

/**
 * How long a query must sit still before a miss is counted.
 *
 * A search runs on every keystroke, so "arrow" passes through "a", "ar" and
 * "arr", and each of those matches nothing in a set whose shortest name is four
 * characters. Counting the render would fill the report with prefixes of real
 * words and bury the one query that matters. Waiting for the typing to stop is
 * what turns "did this render empty" into "did someone look for this".
 */
export const SEARCH_SETTLE_MS = 900

/** Shorter than any icon name in the set, so a first letter is never a miss. */
export const SEARCH_MIN_LENGTH = 3
