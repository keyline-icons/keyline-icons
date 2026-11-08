import Link from "next/link"

import {
  BLOG_DESCRIPTION,
  BLOG_PAGE_SIZE,
  BLOG_UPCOMING,
  BLOG_POSTS,
  blogPageCount,
  blogPageHref,
  postDateLabel,
  postTileTitle,
  postHref,
  type BlogPost,
} from "@/lib/blog"
import history from "@/lib/icon-history.json"
import { loadIcons, type Icon } from "@/lib/icons"
import { blogJsonLd, pageMetadata } from "@/lib/seo"
import { SET_TITLE } from "@/lib/site-chrome"
import {
  GuidePoster,
  UpdatePoster,
} from "@/components/blog-poster"
import { BookOpen } from "@/components/icons"
import { Pager } from "@/components/pager"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"

/**
 * The blog index: guides first, each across the full width, then the updates
 * in a grid, newest first.
 *
 * It exists as its own route rather than as a section of `/changelog` because
 * the two answer different questions and a reader arrives wanting one of them.
 * The changelog is generated off git and says what moved. These say why, and
 * they are written by hand. Folding them together would mean either a
 * generated page with hand-written paragraphs wedged into it, which is the
 * arrangement that goes stale, or a hand-written page pretending to be a
 * complete record, which is worse.
 *
 * **Laid out as Apple lays out its Newsroom** (his reference, 1 Nov 2026):
 * tiles on the home page's card surface (`rounded-lg bg-muted`), the poster
 * set into it on the page's own white, then a small-capitals label, the
 * title and the date. A guide is the lead story, one tile across
 * the width; the updates follow, two to a row and then three. A guide is
 * written to be found by a search and kept current, so it stands above the
 * series rather than sinking into it as the series grows.
 *
 * The posters (`components/blog-poster.tsx`) are drawn live from `icons/`,
 * never exported: an update's is the icon wall of the release posters, its
 * new drawings in all four styles around the count, its drawings and words in a
 * colour of its own; a guide's is the projects it compares over its own sheet.
 */

/**
 * `?page=N`, the way `/icons` reads it: two digits at most, page 2 up to the
 * last. Page 1, `?page=1`, junk and anything past the end are all the bare
 * `/blog`, so the first page has one address and nothing else is a page.
 */
function pageOf(value: string | string[] | undefined) {
  if (typeof value !== "string" || !/^\d{1,3}$/.test(value)) return undefined
  const page = Number(value)
  return page >= 2 && page <= blogPageCount() ? page : undefined
}

type SearchParams = Promise<{ page?: string | string[] }>

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const page = pageOf((await searchParams).page)

  /*
    Pages 2 and on are their own pages, with their own canonical, and not
    copies of `/blog`: each lists different posts. Google's advice for a
    paged list is exactly this, the same call `/icons?page=N` makes, and
    pointing them all at page 1 would leave the older posts linked from no
    page it keeps. Each says which page it is in its title, so no two pages
    share one.
  */
  if (page) {
    const pages = blogPageCount()
    return pageMetadata({
      path: blogPageHref(page),
      title: `Latest updates, page ${page} of ${pages}`,
      description:
        `Page ${page} of ${pages} of the ${SET_TITLE} blog: what shipped in ` +
        `each update, why a drawing was redrawn, and how.`,
      socialDescription:
        "Notes on how the set gets drawn: what shipped, what was redrawn, and why.",
    })
  }

  return pageMetadata({
    path: "/blog",
    // Word for word the `h1`. A title that disagrees with what the page
    // visibly leads with is a title Google rewrites.
    /*
      "Latest updates" rather than "Blog", and the two are not
      interchangeable. The bar still says Blog, which is the word people look
      for in a nav; the page says what it is mostly made of, one entry per
      update to the set. A `SiteLink`'s label and a page's title are allowed
      to differ, and the rule that must not be broken is the other one: this
      string is the `h1` word for word.
    */
    title: "Latest updates",
    description: BLOG_DESCRIPTION,
    socialDescription:
      "Notes on how the set gets drawn: what shipped, what was redrawn, and why.",
  })
}

/** A release's new names and the set's total after it, off the git-built history. */
const HISTORY = history as {
  version: string
  releases: { version: string; names: string[]; count: number }[]
  unreleased: { names: string[]; count: number } | null
}
const RELEASES = new Map(HISTORY.releases.map((r) => [r.version, r]))

/**
 * The line above a tile's title, in Apple's small capitals: what the post is,
 * before what it says. A guide carries the set's open book, the way Apple
 * marks a quick read with a bolt.
 */
function Eyebrow({ post }: { post: BlogPost }) {
  const guide = post.kind === "guide"
  const label = guide
    ? "Guide"
    : post.version && !RELEASES.has(post.version)
      ? "Unreleased"
      : "Update"

  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
      {guide && <BookOpen aria-hidden="true" className="size-3.5" />}
      {label}
    </span>
  )
}

/**
 * The release a poster counts. A post is written ahead of its tag, and read
 * against tags alone its poster said "New free icons" with no version or total
 * until the day it was cut. The work since the last tag is what that tag will
 * hold, so a post for the version in progress counts that.
 */
const releaseOf = (post: BlogPost) => {
  if (!post.version) return undefined
  const tagged = RELEASES.get(post.version)
  if (tagged || post.version !== HISTORY.version || !HISTORY.unreleased)
    return tagged
  return { version: post.version, ...HISTORY.unreleased }
}

/**
 * The drawings the release added, in the order the post's own list puts them,
 * which leads with the strong ones; anything the list leaves out follows. A
 * post without a tagged release shows its list as it is.
 */
function drawingsOf(post: BlogPost, icons: Icon[]) {
  const release = releaseOf(post)
  if (!release) return icons
  const added = new Set(release.names)
  return [
    ...icons.filter((icon) => added.has(icon.name)),
    ...icons.filter((icon) => !added.has(icon.name)),
  ]
}

function Poster({
  post,
  icons,
  tone = 0,
  className,
}: {
  post: BlogPost
  icons: Icon[]
  /** The update's place counted from the oldest, which picks its colour. */
  tone?: number
  className?: string
}) {
  if (post.cover)
    return <GuidePoster cover={post.cover} className={className} />

  const release = releaseOf(post)
  const ordered = drawingsOf(post, icons)

  return (
    <UpdatePoster
      icons={ordered}
      tone={tone}
      eyebrow={release ? `Keyline Icons v${release.version}` : "Keyline Icons"}
      headline={
        release ? `${release.names.length} new free icons` : "New free icons"
      }
      footnote={
        release
          ? `${release.count.toLocaleString("en")} in all, MIT licensed`
          : undefined
      }
    />
  )
}

/**
 * A guide: one tile across the width, the poster taking most of it and the
 * text beside it, Apple's lead story. A guide is written to be found by a
 * search and kept current, so it stands above the series rather than sinking
 * into it as the series grows.
 */
function FeatureTile({ post, icons }: { post: BlogPost; icons: Icon[] }) {
  return (
    <li>
      <Link
        href={postHref(post.slug)}
        className="group grid overflow-hidden rounded-lg bg-muted p-2 transition-colors hover:bg-muted-hover md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
      >
        {/* `md:aspect-auto` so the poster stretches to the text's height: a
            grid item with an aspect ratio keeps it and leaves a gap below. */}
        <Poster
          post={post}
          icons={icons}
          className="md:aspect-auto md:min-h-80"
        />
        <div className="flex flex-col gap-3 p-4 md:p-6">
          <Eyebrow post={post} />
          <h2 className="text-2xl leading-tight font-semibold tracking-tight text-balance text-foreground lg:text-3xl">
            {postTileTitle(post)}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {post.standfirst}
          </p>
          <time
            dateTime={post.date}
            className="mt-auto pt-4 text-sm text-muted-foreground"
          >
            {postDateLabel(post.date)}
          </time>
        </div>
      </Link>
    </li>
  )
}

/**
 * An update: the poster over the label, the title and the date, and nothing
 * else, which is all Apple's tiles carry. The date sits on the tile's floor,
 * so dates line up along a row whatever the titles' lengths.
 */
function Tile({
  post,
  icons,
  tone,
}: {
  post: BlogPost
  icons: Icon[]
  tone: number
}) {
  const link =
    "group flex w-full flex-col overflow-hidden rounded-lg bg-muted p-2 transition-colors hover:bg-muted-hover"

  return (
    <li className="flex">
      {/*
        The whole tile is the link. An entry with a small link in it is an
        entry most of which does nothing when clicked, which on a phone is
        most of the target.
      */}
      <Link href={postHref(post.slug)} className={link}>
        <Poster post={post} icons={icons} tone={tone} />
        <div className="flex flex-1 flex-col gap-2 px-4 pt-4 pb-4">
          <Eyebrow post={post} />
          <h2 className="text-xl leading-snug font-semibold tracking-tight text-balance text-foreground">
            {postTileTitle(post)}
          </h2>
          <time
            dateTime={post.date}
            className="mt-auto pt-4 text-sm text-muted-foreground"
          >
            {postDateLabel(post.date)}
          </time>
        </div>
      </Link>
    </li>
  )
}

/**
 * The update that is coming, before its post exists: a tile in the next
 * colour with empty places where its drawings will go (his ask, 1 Nov 2026:
 * "add the third col for v2.4.0 as placeholder for now. it's coming in this
 * update"). Not a link, because there is nothing yet to link to; it goes
 * when `BLOG_UPCOMING` is cleared, which is when the post lands.
 */
function UpcomingTile({ version, tone }: { version: string; tone: number }) {
  return (
    <li className="flex">
      <div className="flex w-full flex-col overflow-hidden rounded-lg bg-muted p-2">
        <UpdatePoster
          icons={[]}
          tone={tone}
          upcoming
          eyebrow={`Keyline Icons v${version}`}
          headline="Coming soon"
        />
        <div className="flex flex-1 flex-col gap-2 px-4 pt-4 pb-4">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Unreleased
          </span>
          <h2 className="text-xl leading-snug font-semibold tracking-tight text-balance text-foreground">
            Version {version} is on its way
          </h2>
          <span className="mt-auto pt-4 text-sm text-muted-foreground">
            Coming in the next update
          </span>
        </div>
      </div>
    </li>
  )
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const page = pageOf((await searchParams).page) ?? 1
  const pages = blogPageCount()
  const icons = await loadIcons()
  const byName = new Map(icons.map((icon) => [icon.name, icon]))

  const entries = BLOG_POSTS.map((post) => ({
    post,
    icons: post.thumbnail
      .map((name) => byName.get(name))
      .filter(Boolean) as Icon[],
  }))
  /*
    Guides on page 1 only. Updates are cut into pages of `BLOG_PAGE_SIZE`,
    and each keeps its colour by its place among all of them, not on its page.
  */
  const guides =
    page === 1 ? entries.filter(({ post }) => post.kind === "guide") : []
  const all = entries.filter(({ post }) => post.kind !== "guide")
  const first = (page - 1) * BLOG_PAGE_SIZE
  const updates = all.slice(first, first + BLOG_PAGE_SIZE)
  const toneOf = (i: number) => all.length - 1 - (first + i)
  /* The coming update leads page 1. */
  const upcoming = page === 1 ? BLOG_UPCOMING : null

  return (
    <>
      <SiteNav />

      {/* Wider than the prose measure `/changelog` and `/install` use, because
          three columns of pictures need it; the heading and its sentence keep
          their own measure inside it. */}
      <main className="mx-auto w-full max-w-6xl px-6 pb-16 lg:px-8">
        {/* The index and each post declare one graph between them: this node
            names the posts by the `@id` their own pages set, rather than
            restating their bodies here for something else to keep in step.
            On page 1 only, where the blog's own `@id` lives; a later page
            repeating it would be a second node claiming the same thing. */}
        {page === 1 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                blogJsonLd({
                  posts: BLOG_POSTS.map(({ slug, title, date }) => ({
                    slug,
                    title,
                    date,
                  })),
                })
              ),
            }}
          />
        )}

        <header className="max-w-2xl pt-6 pb-10">
          {/* The page's place is part of the heading, so the `h1` and the
              title still read the same on page 2 ("Latest updates, page 2
              of 2"): the comma is there for anything reading the text,
              the line break for the eye. */}
          <h1 className="text-4xl font-semibold tracking-tight">
            Latest updates
            {page > 1 && (
              <>
                <span className="sr-only">, </span>
                <span className="mt-2 block text-base font-normal tracking-normal text-muted-foreground first-letter:uppercase">
                  page {page} of {pages}
                </span>
              </>
            )}
          </h1>
          <p className="mt-3 text-base text-balance text-muted-foreground">
            {BLOG_DESCRIPTION}
          </p>
        </header>

        {/* Apple's order: the lead story across the width, then rows of
            three, the coming update first. Three only from `xl`: at 1024 a
            third of the column is 240px and the wall's drawings fall under
            14px, which is why Apple's own page holds two to a row there. */}
        <div className="flex flex-col gap-8 lg:gap-10">
          {guides.length > 0 && (
            <ul className="flex flex-col gap-8 lg:gap-10">
              {guides.map(({ post, icons: field }) => (
                <FeatureTile key={post.slug} post={post} icons={field} />
              ))}
            </ul>
          )}
          <ul className="grid gap-8 sm:grid-cols-2 lg:gap-10 xl:grid-cols-3">
            {upcoming && (
              <UpcomingTile version={upcoming.version} tone={all.length} />
            )}
            {updates.map(({ post, icons: field }, i) => (
              <Tile
                key={post.slug}
                post={post}
                icons={field}
                tone={toneOf(i)}
              />
            ))}
          </ul>
        </div>

        <Pager
          current={page}
          total={pages}
          hrefs={Array.from({ length: pages }, (_, i) => blogPageHref(i + 1))}
          className="pt-12"
        />
      </main>

      <SiteFooter />
    </>
  )
}
