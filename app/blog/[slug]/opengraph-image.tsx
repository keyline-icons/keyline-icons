import { readFile } from "node:fs/promises"
import path from "node:path"

import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"

import { BrandMarkFlat } from "@/components/brand-mark"
import {
  BLOG_SOCIAL_CARD_ICONS,
  findPost,
  postDateLabel,
  postHeadline,
  postKindLabel,
  postVersionLabel,
} from "@/lib/blog"

import { snippet } from "@/lib/icon-code"
import { loadIcons } from "@/lib/icons"
import { SET_TITLE } from "@/lib/site-chrome"

/**
 * The card a post unfurls into: its headline, over the drawings it is about.
 *
 * Its own card rather than the site's, for the reason the icon pages have one:
 * a link to a post shared anywhere is a link whose whole value is which post
 * it is, and the site card answers "which site". The headline is the page's
 * own `h1`, word for word, so a reader who clicks arrives at the sentence they
 * were shown.
 *
 * Rendered by Satori, which is not a browser, and the two constraints that
 * follow are the ones every card in this repo lists:
 *
 * - **Flexbox only.** No grid, and an explicit `display: "flex"` on anything
 *   with more than one child. Satori refuses to guess, and JSX makes the count
 *   deceptive: `{A} · {B}` is three children on one visible line of text.
 * - **No CSS variables and no Tailwind.** The colours are the light theme's
 *   tokens resolved to hex. This theme's greys are Tailwind's neutral scale, so
 *   they are exact rather than approximations.
 *
 * The drawings go in as `<img>` data URIs, which is the one way Satori will
 * render a path: there is no `dangerouslySetInnerHTML` in its element set.
 * `currentColor` is resolved on the way in, because a data URI has no cascade
 * above it to inherit ink from and Satori paints the unresolved keyword black
 * by luck rather than by rule.
 *
 * Not prerendered, same as the icon cards: a card is only ever fetched when a
 * link is actually shared, and Next generates and caches each on first request.
 */
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const INK = "#0a0a0a"
const PRIMARY = "#006aa5"
const MUTED = "#737373"
const HAIRLINE = "#e5e5e5"
const SURFACE = "#f5f5f5"

/**
 * `alt` is a static export and cannot see the params, so the per-post alt has
 * to come from here. Some platforms read it aloud, and a card whose alt is the
 * site's name tells a listener nothing about which post they were sent.
 */
export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = findPost(slug)

  return [
    {
      id: "card",
      alt: post ? postHeadline(post) : SET_TITLE,
      size,
      contentType,
    },
  ]
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = findPost(slug)

  if (!post) notFound()

  const version = postVersionLabel(post)
  const kind = postKindLabel(post)
  const lead = version
    ? { text: version, color: INK }
    : kind
      ? { text: kind, color: PRIMARY }
      : null

  const icons = await loadIcons()
  const byName = new Map(icons.map((icon) => [icon.name, icon]))

  /*
    The head of the post's list, through the same builder the icon pages' Copy
    button uses, so a card can never show a shape different from the one the
    site hands you. The list itself runs to forty or so, because the index
    card's panel packs all of them; a feed card has room for six at a size
    worth looking at, so it takes the six the post puts first. A name the set no longer carries drops out rather than throwing:
    a card is not the place to discover a rename, and `check-demos` fails CI on
    one long before a link gets shared.
  */
  /*
    A guide's card shows the projects it covers, as their own marks, where an
    update's shows its drawings: the index lays the two out differently, and
    a shared link should look like the entry it came from. Read off `public/`
    at render, and any `currentColor` resolved against the file's own `color`
    for the same reason the drawings resolve theirs.
  */
  const logos = post.cover
    ? await Promise.all(
        post.cover.logos.map(async (logo) => {
          const file = await readFile(
            path.join(process.cwd(), "public", logo.src),
            "utf8"
          )
          const color = file.match(/\bcolor="([^"]+)"/)?.[1] ?? INK
          const markup = file.replace(/currentColor/g, color)
          return {
            name: logo.name,
            src: `data:image/svg+xml;base64,${Buffer.from(markup).toString("base64")}`,
          }
        })
      )
    : null

  const drawings = post.thumbnail
    .slice(0, BLOG_SOCIAL_CARD_ICONS)
    .map((name) => byName.get(name))
    .filter(Boolean)
    .map((icon) => {
      const art = icon!.art.stroke
      if (!art) return null

      const markup = snippet("svg", icon!.name, "stroke", art, {
        size: 96,
        stroke: 2,
        pm: "npm",
      }).replace(/currentColor/g, INK)

      return {
        name: icon!.name,
        src: `data:image/svg+xml;base64,${Buffer.from(markup).toString("base64")}`,
      }
    })
    .filter(Boolean) as { name: string; src: string }[]

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
      {/* The mark and the name, which is where a reader looks for who is
            speaking rather than what is being said. Two children, so
            `display: flex` is stated. */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <BrandMarkFlat size={46} color={PRIMARY} />
        <div style={{ fontSize: 32, color: MUTED }}>{SET_TITLE}</div>
      </div>

      {/* The headline, at the largest size the longest title so far still fits
            on three rows. Satori wraps on its own; the size is what decides
            where.

            `post.title` rather than `postHeadline`: the version has its own
            place on the row below, and a card is 1200px of one message. The
            page's `<title>` and `og:title` still carry the prefix, which is
            where a version actually helps someone decide whether to click.

            A title past 70 characters steps down to 54: at 62, 1.0.0's 85
            fill three rows with nothing left between the last one and the
            tiles. */}
      <div
        style={{
          display: "flex",
          fontSize: post.title.length > 70 ? 54 : 62,
          color: INK,
          letterSpacing: -2,
          lineHeight: 1.15,
        }}
      >
        {post.title}
      </div>

      {/* The drawings the post is about, on their own tiles, over a hairline
            with the date. The tiles are the site's own muted surface, so the
            card looks like the page it came from. */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {(logos ?? drawings).map((drawing) => (
            <div
              key={drawing.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 132,
                height: 132,
                borderRadius: 24,
                background: SURFACE,
              }}
            >
              {/* Satori renders `img`, not `next/image`: this tree is
                    rasterised at build rather than served to a browser, so
                    there is nothing for an image component to optimise. */}
              <img src={drawing.src} width={72} height={72} alt="" />
            </div>
          ))}
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
          {/* The version leads the line where there is one, which is what a
                reader scanning a feed for "did the release land" is after. A
                guide says so in the same place, in the colour its badge wears
                on the site, so a shared guide never unfurls as a release.

                Two siblings rather than a fragment: Satori lays a fragment's
                children out without the row's `gap`, which printed the label
                hard against its bar ("v2.3.0|") on every release card. */}
          {lead && <span style={{ color: lead.color }}>{lead.text}</span>}
          {lead && <span style={{ color: HAIRLINE }}>|</span>}
          <span>{postDateLabel(post.date)}</span>
          <span style={{ color: HAIRLINE }}>|</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </div>
    </div>,
    size
  )
}
