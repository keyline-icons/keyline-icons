import Image from "next/image"
import Link from "next/link"

import {
  BLOG_DESCRIPTION,
  BLOG_POSTS,
  postDateLabel,
  postHeadline,
  postHref,
  type BlogCover,
  type BlogPost,
} from "@/lib/blog"
import { loadIcons, type Icon } from "@/lib/icons"
import { blogJsonLd, pageMetadata } from "@/lib/seo"
import { Glyph } from "@/components/glyph"
import { PostLabel } from "@/components/post-label"
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
 * **Two kinds of post, laid out as two kinds of thing** (his call, 1 Nov
 * 2026, after Profound's news page). An update is one in a series, read
 * around its release and then mostly scanned past, so it is a cell in a grid
 * where the column of versions does the work. A guide is written to be found
 * by a search and kept current, so it stands on its own row above the series
 * rather than sinking into it as the series grows. The chip on each
 * (`PostLabel`) says which is which in words; the layout and the pictures say
 * it before anything is read.
 *
 * An update's picture is the post's own drawings rather than a screenshot or a
 * stock image. That is not a stylistic preference: a field drawn from `icons/`
 * at request time is one this site can guarantee is current, and an exported
 * PNG of the same drawings would be a picture of what they looked like on the
 * day somebody rasterised it. A guide is about more than this set's drawings,
 * so its picture is the projects it covers (`BlogCover`).
 */

export function generateMetadata() {
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

/**
 * The keyline of an update's drawings, matching the figures inside a post.
 *
 * Its own constant rather than an import from `components/blog-body.tsx`: a
 * number shared between a page and a component is the kind of import that
 * turns into a cycle the first time either grows. The two are meant to agree,
 * and the comment on `FIGURE_STROKE` over there is the one that explains 1.5.
 */
const PREVIEW_STROKE = 1.5

/** Six to a row, three rows: the most a grid cell holds at a size worth seeing. */
const PREVIEW_COLUMNS = 6
const PREVIEW_ROWS = 3

/**
 * An update's picture: the drawings it shipped, on the muted surface every
 * picture on this site sits on.
 *
 * Whole rows only. A post with eleven names shows six rather than six and a
 * ragged five, because a part-filled last row reads as drawings missing from
 * the picture rather than as a picture of fewer drawings.
 *
 * The cells size the drawings rather than a fixed pixel size, up to 32px: a
 * grid cell is 360px across on a wide screen and under 300 in the two-column
 * band, and six fixed drawings with fixed gaps overflow the narrow one. The
 * ink is held back to 70 per cent and comes up on hover, where the whole
 * entry is the link: at full strength eighteen drawings compete with the
 * title for the same attention.
 *
 * Decoration, so it is inert: `aria-hidden`, because the title and standfirst
 * already say what the post is and a screen reader reading eighteen drawings
 * before them would make the index unusable.
 */
function UpdatePreview({ icons }: { icons: Icon[] }) {
  const whole = Math.floor(icons.length / PREVIEW_COLUMNS) * PREVIEW_COLUMNS
  const shown = icons.slice(
    0,
    Math.min(PREVIEW_COLUMNS * PREVIEW_ROWS, whole || icons.length)
  )

  return (
    <div
      aria-hidden="true"
      className="grid aspect-[16/10] place-items-center rounded-xl bg-muted px-6 sm:px-8"
    >
      <div className="grid w-full max-w-72 grid-cols-6 gap-4 text-foreground/70 transition-colors group-hover:text-foreground">
        {shown.map((icon) => (
          <Glyph
            key={icon.name}
            art={icon.art.stroke!}
            size={24}
            stroke={PREVIEW_STROKE}
            className="aspect-square h-auto w-full max-w-8 justify-self-center"
          />
        ))}
      </div>
    </div>
  )
}

/**
 * A guide's picture: the projects it covers as a row of marks, over the sheet
 * the post is built on, cropped as it runs off the corner.
 *
 * The marks sit on white tiles in both themes, which is how the post's own
 * table shows them on a dark page: they are other projects' artwork, drawn for
 * a light ground, and recolouring them would make them not their logos. The
 * sheet is the comparison itself, so the picture says "these five, side by
 * side" before the title does. Its left edge is the logos' left edge, at the
 * same inset at every width, so the two read as one column.
 */
function GuidePreview({ cover }: { cover: BlogCover }) {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted"
    >
      <div className="absolute top-5 left-5 z-10 flex gap-2 sm:top-8 sm:left-8">
        {cover.logos.map((logo) => (
          <span
            key={logo.name}
            className="grid size-9 place-items-center rounded-lg bg-white shadow-xs sm:size-12"
          >
            <Image
              src={logo.src}
              alt=""
              width={28}
              height={28}
              className="size-5 sm:size-7"
            />
          </span>
        ))}
      </div>
      <Image
        src={cover.image.src}
        alt=""
        width={cover.image.width}
        height={cover.image.height}
        sizes="(min-width: 1024px) 640px, 100vw"
        className="absolute top-[30%] left-5 w-[115%] max-w-none rounded-tl-lg border shadow-sm transition-transform duration-300 group-hover:-translate-y-1 sm:left-8"
      />
    </div>
  )
}

/**
 * The date, uppercase and letterspaced, which is the one place on this site
 * that treatment is right: it makes the date read as a label on the entry
 * rather than as the first words of it.
 */
function EntryMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-3">
      <PostLabel post={post} />
      <time
        dateTime={post.date}
        className="text-[11px] tracking-widest text-muted-foreground uppercase"
      >
        {postDateLabel(post.date)}
      </time>
    </div>
  )
}

function GuideEntry({ post, icons }: { post: BlogPost; icons: Icon[] }) {
  return (
    <li>
      {/*
        The whole entry is the link, rather than the heading being one inside
        it. An entry with a small link in it is an entry most of which does
        nothing when clicked, which on a phone is most of the target.
      */}
      <Link
        href={postHref(post.slug)}
        className="group grid items-center gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-8 lg:gap-12"
      >
        {post.cover ? (
          <GuidePreview cover={post.cover} />
        ) : (
          <UpdatePreview icons={icons} />
        )}
        <div className="flex flex-col gap-3">
          <EntryMeta post={post} />
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-foreground group-hover:underline group-hover:underline-offset-4 sm:text-3xl">
            {postHeadline(post)}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {post.standfirst}
          </p>
          {/*
            Not an anchor. The whole entry is already one, and an anchor inside
            an anchor is invalid markup that browsers repair by closing the
            outer one early, which would silently cut the clickable area down
            to the heading.
          */}
          <span className="mt-1 text-sm font-medium text-foreground underline underline-offset-4 group-hover:no-underline">
            Read the guide
          </span>
        </div>
      </Link>
    </li>
  )
}

function UpdateEntry({ post, icons }: { post: BlogPost; icons: Icon[] }) {
  return (
    <li>
      <Link href={postHref(post.slug)} className="group flex flex-col gap-4">
        <UpdatePreview icons={icons} />
        <div className="flex flex-col gap-2">
          <EntryMeta post={post} />
          <h2 className="text-lg leading-snug font-semibold tracking-tight text-balance text-foreground group-hover:underline group-hover:underline-offset-4">
            {postHeadline(post)}
          </h2>
          {/* Two lines at most: in a grid, a standfirst that runs on pushes
              its neighbour's title out of line with its own. */}
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {post.standfirst}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default async function Page() {
  const icons = await loadIcons()
  const byName = new Map(icons.map((icon) => [icon.name, icon]))

  const entries = BLOG_POSTS.map((post) => ({
    post,
    icons: post.thumbnail
      .map((name) => byName.get(name))
      .filter(Boolean) as Icon[],
  }))
  const guides = entries.filter(({ post }) => post.kind === "guide")
  const updates = entries.filter(({ post }) => post.kind !== "guide")

  return (
    <>
      <SiteNav />

      {/* Wider than the prose measure `/changelog` and `/install` use, because
          three columns of pictures need it; the heading and its sentence keep
          their own measure inside it. */}
      <main className="mx-auto w-full max-w-6xl px-6 pb-16 lg:px-8">
        <script
          type="application/ld+json"
          // The index and each post declare one graph between them: this node
          // names the posts by the `@id` their own pages set, rather than
          // restating their bodies here for something else to keep in step.
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

        <header className="max-w-2xl pt-6 pb-10">
          <h1 className="text-4xl font-semibold tracking-tight">
            Latest updates
          </h1>
          <p className="mt-3 text-base text-balance text-muted-foreground">
            {BLOG_DESCRIPTION}
          </p>
        </header>

        {guides.length > 0 && (
          <ul className="flex flex-col gap-16 border-t py-10 sm:py-12">
            {guides.map(({ post, icons: field }) => (
              <GuideEntry key={post.slug} post={post} icons={field} />
            ))}
          </ul>
        )}

        <ul className="grid gap-x-8 gap-y-12 border-t pt-10 sm:grid-cols-2 sm:pt-12 lg:grid-cols-3">
          {updates.map(({ post, icons: field }) => (
            <UpdateEntry key={post.slug} post={post} icons={field} />
          ))}
        </ul>
      </main>

      <SiteFooter />
    </>
  )
}
