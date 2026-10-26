import { track as vercelTrack } from "@vercel/analytics"

import type { CustomSource } from "@/lib/custom"
import type { Format, PackageManager } from "@/lib/icon-code"
import type { Style } from "@/lib/icons"

/**
 * One place that says what this site counts, and one function that sends it.
 *
 * The data lives in Vercel Web Analytics. Custom events are a Pro feature
 * there, and the team has been on Pro since 5 Sep 2026, so every event below is
 * recorded under Events in the project's Analytics tab, beside the page views.
 * Reading one means exporting it from that panel: the event, then one property,
 * then CSV. Vercel breaks an event down by a single property at a time, so a
 * property that only means something crossed with another cannot be read off
 * the export; that is worth knowing before adding one.
 *
 * GA4 is a second provider behind the same call, and it is off. `track()` sends
 * to `window.gtag` when it exists, and it exists only when `NEXT_PUBLIC_GA_ID`
 * is set, which it is not. It was wired in while the site was on Hobby and
 * Vercel discarded these events, and the plan changed before it was switched
 * on. It stays because turning it on is then one variable rather than an edit
 * to every call site, and stays off because it brings cookies, and with them a
 * consent question, to a site that has neither. `components/google-analytics.tsx`
 * has the rest.
 *
 * Page views do not come through here. `<Analytics />` in the layout records
 * those on any plan; this module is only the layer above it, so the call sites
 * never need to know which providers are listening.
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
   * style, `hidden` how many the shape or category filter kept off the grid,
   * and `suggestion` the spelling correction offered. All three separate the
   * two ways this event happens: the set has the drawing and the filters hid
   * it, or the set does not have the drawing at all. Only the second is a
   * request for work.
   *
   * `hidden` was added after the first month's export, when a search under
   * a shape filter was found to report `elsewhere: 0` over drawings the set
   * has, because that count only looks across styles. Without it the list of
   * what to draw next is padded with drawings the set already has.
   */
  search_empty: {
    query: string
    style: Style
    shape: string
    category: string
    elsewhere: number
    hidden: number
    suggestion: string | null
  }
  /**
   * The share dialog was opened.
   *
   * Counted separately from the click, because the two answer different
   * questions: how many readers reach for it at all, against how many follow
   * through once they see the five networks. A dialog opened and abandoned is
   * the more common outcome and the one a click-only count cannot see.
   */
  share_open: { page: string }
  /**
   * A network was followed out to its composer.
   *
   * `network` is the target's own id, so the counts line up with
   * `SHARE_TARGETS` rather than with a label someone may reword. `page` is
   * where the reader was when they shared, not what they shared: every network
   * is handed the site's front door whatever page the dialog is opened from, so
   * the pathname says which page persuaded them.
   */
  share_click: { network: string; page: string }
  /**
   * The link went to the clipboard from the share dialog.
   *
   * A sixth outcome beside the five networks, and the one that cannot be seen
   * anywhere else: a link pasted into a group chat leaves no referrer worth
   * reading, so without this the share dialog looks abandoned every time it
   * worked. `page` only, for the reason `share_click` carries it, and nothing
   * about what was copied, because what was copied is a constant.
   */
  share_copy: { page: string }
  /** An install command was copied, from the install page or the landing one. */
  install_copy: {
    manager: PackageManager
    /** Which command: the whole set, one icon, or the page's shell block. */
    target: string
  }
  /**
   * `/custom` was opened.
   *
   * A page view already counts this, under Pages. It is an event as well so
   * that the week's visits and inquiries sit side by side in one panel, and so
   * that each carries `from`: which of our links, or which site, brought the
   * reader. That is the question the links on the READMEs, the install page
   * and the plugin listing were added to answer, and a page view cannot say it
   * for a reader who came by a link inside the site.
   */
  custom_view: { from: CustomSource }
  /**
   * The custom icons button was pressed, which opens the reader's mail app.
   *
   * An inquiry started, not one sent: nothing can see whether the message
   * went. Sales are not counted here either; they are the replies. `place`
   * says which copy of the one button, the hero's or the closing card's.
   */
  custom_click: { place: "hero" | "close"; from: CustomSource }
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
    // The queue `<Analytics />` would have made, made here if it has not mounted
    // yet: the same function its own `initQueue` installs, which its script
    // drains on load. Vercel's `track` sends through `window.va?.()`, so an
    // event fired before the layout's component mounts (a page's own effect on
    // first load, `custom_view`) was dropped without a word.
    window.va ??= (...params: [string, unknown?]) => {
      ;(window.vaq ??= []).push(params)
    }
    // Lands under Events in the Vercel Analytics tab. That needs Pro: on Hobby
    // the same call is accepted and silently discarded, so a plan change would
    // show up as an empty panel rather than as an error anywhere.
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
