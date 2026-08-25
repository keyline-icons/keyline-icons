import { ImageResponse } from "next/og"

import { loadIcons, STYLES } from "@/lib/icons"
import { SET_LICENSE, SET_TITLE } from "@/lib/site-chrome"

/**
 * The card every link to this site unfurls into.
 *
 * A file convention, not a route you link to: Next generates the PNG and emits
 * `og:image` plus its dimensions, for **this segment only**. It does not reach
 * `/demo` or `/demo/mobile`, which is why each of those carries a one-line
 * re-export of this file. Without them a shared link to a demo unfurls as a
 * title beside a blank rectangle, and nothing anywhere says so. `twitter-image`
 * exists per segment for the same reason: `opengraph-image` covers Open Graph
 * and X wants its own tag.
 *
 * Rendered by Satori, which is not a browser. Two constraints follow, and both
 * of them are throw-at-build rather than look-wrong-later:
 *
 * - **Flexbox only.** No grid. Any element with more than one child needs an
 *   explicit `display: "flex"`. Satori refuses to guess, and JSX makes that
 *   count deceptive: `{A} · {B}` is three children, on what is obviously one
 *   line of text.
 * - **No CSS variables and no Tailwind classes.** The colours below are the
 *   light theme's tokens resolved to hex: `--background` #ffffff, `--primary`
 *   #171717, `--primary-foreground` #fafafa, `--foreground` #0a0a0a,
 *   `--muted-foreground` #737373. This theme's greys are Tailwind's neutral
 *   scale, so those are exact and not approximations.
 *
 * Light only, deliberately. A card is a static image; there is no viewer theme
 * to read, and every platform that renders one puts it on its own surface.
 *
 * Typography is the Satori default (Noto Sans) rather than the site's Geist.
 * Geist reaches the browser through `next/font`, which resolves at build into
 * `.next/`. There is no `.ttf` in this repo to hand Satori, and fetching one
 * at build would make the card depend on someone else's network. Hierarchy is
 * carried by size and colour instead of by weight.
 *
 * **It says what the hero says.** The card led with `SET_TITLE` at 92px over the
 * tagline, which is a business card: the brand is the one thing a reader already
 * has from the link's own domain and title, and the two-thirds of the image under
 * it went on repeating it. The headline is the page's `h1` instead, word for
 * word, in the same two inks the hero sets it in.
 *
 * That is the same rule the titles follow, one level down: the card, the `<title>`
 * and what the page visibly leads with all describe the same thing, so a reader
 * who clicks arrives at the sentence they were shown. Change the `h1` and this
 * file changes with it.
 *
 * The clause breaks onto its own line here, which the hero explicitly does not do.
 * That is a measurement rather than a second opinion: the whole sentence at a size
 * worth reading on a feed card runs about 1400px against 1040px of content width,
 * so it wraps either way, and the only choice is whether the break lands at the
 * comma or somewhere inside "shadcn/ui". Two rows put it at the comma.
 */
export const alt = `${SET_TITLE}: free icons for shadcn/ui, refined with AI`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const INK = "#0a0a0a"
const PRIMARY = "#171717"
const ON_PRIMARY = "#fafafa"
const MUTED = "#737373"
const HAIRLINE = "#e5e5e5"

export default async function Image() {
  // Same read the pages do, same reason: the count is the fact worth putting
  // on the card, and it has to come off disk or it goes stale silently.
  const total = (await loadIcons()).length

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
        padding: 80,
        fontFamily: "sans-serif",
      }}
    >
      {/* The mark and the name on one line, which is the whole brand block now
            that the headline below carries the message. It is the site bar's
            arrangement at card scale, and it is where a reader looks for who is
            speaking rather than what is being said.

            Two children, so `display: flex` is stated. Satori refuses to guess,
            and this is the element the rule bites on most often. */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {/* The mark, at the same proportions `components/brand-mark.tsx` draws
              it: a flat --primary tile carrying the pennant, so it needs nothing
              behind it. */}
        <svg width="88" height="88" viewBox="0 0 40 40" fill="none">
          <path
            d="M31.916 0H8.07899C3.61455 0 0 3.615 0 8.08V31.925C0 36.385 3.61455 40 8.07899 40H31.921C36.3805 40 40 36.385 40 31.92V8.08C39.995 3.615 36.3805 0 31.916 0Z"
            fill={PRIMARY}
          />
          <path
            d="M13 28.3445V11.6597C13 11.3284 13.3162 11.0887 13.6351 11.1783L26.6351 14.8269C26.8509 14.8874 27 15.0842 27 15.3083V24.7811C27 25.0064 26.8494 25.2038 26.6322 25.2634L13.6322 28.8267C13.314 28.9139 13 28.6745 13 28.3445Z"
            fill={ON_PRIMARY}
            stroke={ON_PRIMARY}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <div style={{ fontSize: 40, color: INK, letterSpacing: -1 }}>
          {SET_TITLE}
        </div>
      </div>

      {/* The page's own headline, in the page's own two inks: the claim in full
            strength, the smaller half of it in muted. Two rows rather than one
            wrapping line, for the reason the note at the top of this file gives.

            `SET_TAGLINE` and `SET_CREDIT` used to sit under the name here and are
            gone from the card. "Built for shadcn/ui" is the headline's first
            clause in other words, and the credit is a line for a footer rather
            than for a feed. Both are still in `lib/site-chrome.ts` and still on
            the site. */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, color: INK, letterSpacing: -2 }}>
          Free icons for shadcn/ui,
        </div>
        <div style={{ fontSize: 76, color: MUTED, letterSpacing: -2 }}>
          refined with AI
        </div>
      </div>

      {/* The specifics, on their own line above a hairline: what you get, in
            the fewest words that are still true. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          paddingTop: 32,
          borderTop: `2px solid ${HAIRLINE}`,
          fontSize: 30,
          color: INK,
        }}
      >
        <span>{`${total} free icons`}</span>
        <span style={{ color: HAIRLINE }}>|</span>
        <span style={{ color: MUTED }}>{STYLES.join(" · ")}</span>
        <span style={{ color: HAIRLINE }}>|</span>
        <span style={{ color: MUTED }}>24 × 24</span>
        <span style={{ color: HAIRLINE }}>|</span>
        <span style={{ color: MUTED }}>{SET_LICENSE}</span>
      </div>
    </div>,
    size
  )
}
