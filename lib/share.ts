import { SET_LICENSE, SET_TITLE } from "@/lib/site-chrome"

/**
 * What gets posted when someone shares the set, and where it can be posted to.
 *
 * Kept out of `components/share-menu.tsx` for the same reason `SITE_LINKS` is
 * kept out of the bar: this is a list of destinations, and a list of
 * destinations is data. The menu decides how a row looks, this file decides
 * what a row is.
 *
 * No React in here, so `lib/site-chrome.ts`'s rule holds one level down: a
 * module that only names strings can be imported by anything, including the
 * server, without dragging a component tree behind it.
 */

/**
 * What the set actually is, in numbers, counted rather than typed.
 *
 * The share copy used to claim nothing countable, on the reasoning that this is
 * a constant read by a client component and a posted number outlives the page
 * it was written on by years. That was the wrong trade. A post saying "a free
 * icon set" is a post nobody stops scrolling for; the size of the thing *is*
 * the hook, and it is the first line of the site's own landing page for exactly
 * that reason.
 *
 * So the numbers arrive as a prop instead. `SiteNav` is a server component and
 * already awaits `loadIcons()`, which is the same memoised read the landing
 * page, the browser and the sitemap use, so no figure here can disagree with
 * the set and none of them is typed into a string. That is the site's standing
 * rule about counts in prose, honoured one component deeper than usual.
 *
 * The number in an already-posted tweet does go stale, and that is accepted:
 * it was true when posted, it undersells the set afterwards rather than
 * overselling it, and no icon set has ever shrunk.
 */
export type ShareCounts = {
  /** Drawings in the set. The headline figure. */
  icons: number
  /**
   * SVG files across both corner treatments, which is not `icons * 6`.
   *
   * Stroke is complete by definition, duotone and fill are not: they need a
   * region to paint, and an open drawing like `bar-chart` has no interior. The
   * gap between the two numbers is the honest version of a "three styles"
   * claim, which is why both are in the copy rather than just the first.
   *
   * Coverage is a fact about a drawing and squaring its corners does not change
   * it, so the treatments do double this figure exactly. It is still counted
   * rather than doubled, for the reason every number on this site is: a third
   * treatment then needs no arithmetic anywhere.
   */
  files: number
}

/** Both figures grouped, so a composer's `text` and `title` stay in step. */
export type ShareCopy = {
  /** The sentence for the four networks that take one. */
  text: string
  /** The headline for the one that takes a title instead. */
  title: string
}

/** `1353` as `1,353`, matching how the landing page prints the same figure. */
const format = (value: number) => value.toLocaleString("en-US")

/**
 * The words a share carries, built from the counts.
 *
 * **Numbers first, and the licence last.** The old line opened with "a free,
 * MIT-licensed icon set" and spent its most-read words on a licence, which is
 * the reason to *use* the set once found and no reason at all to click. The
 * count is what earns the click; MIT is what closes it, so it goes at the end
 * where a reader who is already interested will still reach it.
 *
 * Neither string includes a URL. Every network places the link differently,
 * some in their own parameter and some appended to the text, and a URL baked in
 * here would be duplicated by the four that take one separately.
 */
export function shareCopy({ icons, files }: ShareCounts): ShareCopy {
  return {
    text:
      `${SET_TITLE}: ${format(icons)} free icons for shadcn/ui, in stroke, ` +
      `duotone and fill, rounded or sharp, on one 24×24 grid. ` +
      `${format(files)} SVGs in all, ${SET_LICENSE} licensed.`,
    /*
      Reddit submits a link with a headline rather than a post with a link in
      it, so the sentence above is the wrong shape: one ending in a full stop
      reads as a comment, and Reddit titles do not end in one. Short enough to
      survive the 300-character limit with room for whoever edits it.
    */
    title:
      `${SET_TITLE}: ${format(icons)} free ${SET_LICENSE}-licensed icons for ` +
      `shadcn/ui, in stroke, duotone and fill, rounded or sharp`,
  }
}

/** One network the set can be handed to. */
export type ShareTarget = {
  /** Stable key. Also what the menu looks a logo up by. */
  id: "x" | "threads" | "bluesky" | "linkedin" | "reddit"
  /** The network's name, as its own row's label. */
  label: string
  /**
   * The mark's colour on hover, as a `light dark` pair.
   *
   * X's and Threads' marks are black, which is their actual brand and not a
   * placeholder, so both take the page's own ink and invert with it. The other
   * three carry a real colour, and the second value is that colour lifted for a
   * dark background: LinkedIn's `#0a66c2` in particular is close enough to
   * black that it disappears against one.
   */
  ink: readonly [light: string, dark: string]
  /** Builds the composer URL, given the page and the words to carry. */
  href: (url: string, copy: ShareCopy) => string
}

/**
 * The five networks, in the order the menu lists them.
 *
 * Instagram is deliberately absent and cannot be added: it publishes no web
 * intent, so no page can open its composer with a link already in it. Every
 * "share to Instagram" button on the web is either a deep link that drops the
 * text or the OS share sheet doing the work. A row that silently loses what it
 * was given is worse than no row.
 *
 * Ordered by where a link to this set actually travels rather than by audience
 * size: X and Threads are where the shadcn/ui and design-tooling conversation
 * happens, Bluesky is where a good part of it moved, Reddit is where an icon
 * set gets found months later, and LinkedIn is last because it is the one that
 * strips the sentence.
 */
export const SHARE_TARGETS: readonly ShareTarget[] = [
  {
    id: "x",
    label: "X",
    ink: ["#0f1419", "#e7e9ea"],
    // `intent/post`, not the older `intent/tweet`. That path still redirects,
    // but it redirects through a hop that drops the parameters on some clients.
    href: (url, copy) =>
      `https://x.com/intent/post?text=${encodeURIComponent(copy.text)}&url=${encodeURIComponent(url)}`,
  },
  {
    id: "threads",
    label: "Threads",
    ink: ["#0f1419", "#e7e9ea"],
    // `threads.net` rather than `threads.com`. The intent is documented on the
    // original host and the new one redirects to it, so this is the address
    // that works on both.
    href: (url, copy) =>
      `https://www.threads.net/intent/post?text=${encodeURIComponent(copy.text)}&url=${encodeURIComponent(url)}`,
  },
  {
    id: "bluesky",
    label: "Bluesky",
    ink: ["#0285ff", "#4aa8ff"],
    // One parameter only: Bluesky's composer takes `text` and nothing else, so
    // the link has to ride inside the sentence. It is detected and linkified by
    // the client on post, which is why this is a plain space and not markup.
    href: (url, copy) =>
      `https://bsky.app/intent/compose?text=${encodeURIComponent(`${copy.text} ${url}`)}`,
  },
  {
    id: "reddit",
    label: "Reddit",
    ink: ["#ff4500", "#ff5a1f"],
    // A link submission with a headline, so `title` rather than `text`. No
    // subreddit in the path: `/submit` lets the poster choose, and guessing one
    // for them is how a link lands in a community that did not ask for it.
    href: (url, copy) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(copy.title)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    ink: ["#0a66c2", "#4fa3e3"],
    // The only one that takes no text at all. LinkedIn retired the `title`,
    // `summary` and `source` parameters on this endpoint and now builds the
    // post from the target page's own Open Graph tags, so the whole post is
    // `app/opengraph-image.tsx` plus the root's `og:title` and
    // `og:description`. That makes this row the one that depends entirely on
    // the homepage's metadata being right, and nothing here can check it.
    //
    // It is also the row that argued hardest for sharing the root rather than
    // the page in hand: with no sentence of its own to fall back on, a route
    // whose card does not resolve leaves LinkedIn with nothing at all to show.
    href: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
]
