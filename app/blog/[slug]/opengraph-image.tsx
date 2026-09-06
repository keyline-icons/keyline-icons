import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"

import {
  BLOG_SOCIAL_CARD_ICONS,
  findPost,
  postDateLabel,
  postHeadline,
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
const PRIMARY = "#171717"
const ON_PRIMARY = "#fafafa"
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

      {/* The headline, at the largest size the longest title so far still fits
            on three rows. Satori wraps on its own; the size is what decides
            where.

            `post.title` rather than `postHeadline`: the version has its own
            place on the row below, and a card is 1200px of one message. The
            page's `<title>` and `og:title` still carry the prefix, which is
            where a version actually helps someone decide whether to click. */}
      <div
        style={{
          display: "flex",
          fontSize: 62,
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
          {drawings.map((drawing) => (
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
                reader scanning a feed for "did the release land" is after. */}
          {postVersionLabel(post) && (
            <>
              <span style={{ color: INK }}>{postVersionLabel(post)}</span>
              <span style={{ color: HAIRLINE }}>|</span>
            </>
          )}
          <span>{postDateLabel(post.date)}</span>
          <span style={{ color: HAIRLINE }}>|</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </div>
    </div>,
    size
  )
}
