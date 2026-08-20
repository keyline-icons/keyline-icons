import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"

import { snippet } from "@/lib/icon-code"
import { listOf, stylesOf } from "@/lib/icon-pages"
import { loadIcons } from "@/lib/icons"
import { SET_LICENSE, SET_TITLE } from "@/lib/site-chrome"

/**
 * The card an icon page unfurls into: the drawing itself, big, with its name.
 *
 * A file convention rather than a route you link to, and it covers **this
 * segment only** — which is the whole reason it exists. Without it every icon
 * page would share the homepage's card, so 414 links pasted into Slack would
 * unfurl into the same picture of the word "Keyline Icons", and the one fact
 * worth showing, which drawing this is, would be missing from all of them.
 *
 * Rendered by Satori, and the drawing is the thing Satori cannot do: there is
 * no `dangerouslySetInnerHTML` and no inline `<path>` support in its element
 * set. It does resolve an `<img>` whose `src` is a data URI, so the icon goes
 * in as its own SVG document, base64'd — the same markup the page's Copy button
 * hands you, with `currentColor` resolved, because a data URI has no cascade to
 * inherit ink from.
 *
 * Not prerendered. 414 PNGs at build would cost minutes for images that are
 * only ever fetched when a link is actually shared; Next generates and caches
 * each on first request instead.
 *
 * The other Satori constraints are the homepage card's, and for the same
 * reasons: flexbox only, an explicit `display: "flex"` on anything with more
 * than one child, no CSS variables and no Tailwind. The colours below are the
 * light theme's tokens resolved to hex.
 */
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const INK = "#0a0a0a"
const PRIMARY = "#171717"
const ON_PRIMARY = "#fafafa"
const MUTED = "#737373"
const HAIRLINE = "#e5e5e5"
const SURFACE = "#f5f5f5"

const find = async (name: string) =>
  (await loadIcons()).find((icon) => icon.name === name)

/**
 * `alt` is a static export and cannot see the params, so the per-icon alt has
 * to come from here instead. One entry: this segment has one card, it just
 * needs to be able to name the icon on it. Some platforms read this aloud.
 */
export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params

  return [
    {
      id: "card",
      alt: `The ${name} icon from ${SET_TITLE}, drawn on a 24×24 grid`,
      size,
      contentType,
    },
  ]
}

export default async function Image({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const icon = await find(name)

  if (!icon) notFound()

  const styles = stylesOf(icon)
  const style = styles[0]!
  const art = icon.art[style]!

  /*
    The drawing as a standalone document, through the same builder the page's
    SVG tab uses, so the card can never show a different shape from the one you
    copy. `currentColor` is resolved on the way in: inside a data URI there is
    nothing above it to inherit from, and Satori paints an unresolved keyword as
    black by luck rather than by rule.
  */
  const markup = snippet("svg", icon.name, style, art, {
    size: 320,
    stroke: 2,
    pm: "npm",
  }).replace(/currentColor/g, INK)

  const drawing = `data:image/svg+xml;base64,${Buffer.from(markup).toString("base64")}`

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* The mark at the proportions `components/brand-mark.tsx` draws it:
              a flat --primary tile carrying the pennant. */}
        <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
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
        <div style={{ fontSize: 32, color: MUTED }}>{SET_TITLE}</div>
      </div>

      {/* The drawing and its name, side by side. The tile is the site's own
            muted surface, so the card looks like the page it came from. */}
      <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 320,
            height: 320,
            borderRadius: 32,
            background: SURFACE,
          }}
        >
          {/* A bare `img`: Satori renders this, not a browser, so
                `next/image` has no meaning here. */}
          <img src={drawing} width={200} height={200} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, color: INK, letterSpacing: -2 }}>
            {icon.name}
          </div>
          <div style={{ fontSize: 32, color: MUTED, marginTop: 20 }}>
            {listOf(styles)}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          paddingTop: 28,
          borderTop: `2px solid ${HAIRLINE}`,
          fontSize: 28,
          color: MUTED,
        }}
      >
        <span>24 × 24</span>
        <span style={{ color: HAIRLINE }}>|</span>
        <span>{`${SET_LICENSE} licensed`}</span>
        <span style={{ color: HAIRLINE }}>|</span>
        <span>SVG, JSX and React</span>
      </div>
    </div>,
    size
  )
}
