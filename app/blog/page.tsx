import Link from "next/link"

import {
  BLOG_DESCRIPTION,
  BLOG_POSTS,
  postDateLabel,
  postHeadline,
  postHref,
  postVersionLabel,
  type BlogPost,
} from "@/lib/blog"
import { loadIcons, type Icon } from "@/lib/icons"
import { blogJsonLd, pageMetadata } from "@/lib/seo"
import { Glyph } from "@/components/glyph"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"

/**
 * The blog index: one card per post, newest first.
 *
 * It exists as its own route rather than as a section of `/changelog` because
 * the two answer different questions and a reader arrives wanting one of them.
 * The changelog is generated off git and says what moved. These say why, and
 * they are written by hand. Folding them together would mean either a
 * generated page with hand-written paragraphs wedged into it, which is the
 * arrangement that goes stale, or a hand-written page pretending to be a
 * complete record, which is worse.
 *
 * Each entry's picture is the post's own drawings rather than a screenshot or
 * a stock image. That is not a stylistic preference: a field drawn from
 * `icons/` at request time is one this site can guarantee is current, and an
 * exported PNG of the same drawings would be a picture of what they looked
 * like on the day somebody rasterised it.
 */

export function generateMetadata() {
  return pageMetadata({
    path: "/blog",
    // Word for word the `h1`. A title that disagrees with what the page
    // visibly leads with is a title Google rewrites.
    /*
      "Latest updates" rather than "Blog", and the two are not
      interchangeable. The bar still says Blog, which is the word people look
      for in a nav; the page says what it actually holds, which is one entry
      per update to the set. A `SiteLink`'s label and a page's title are
      allowed to differ, and the rule that must not be broken is the other
      one: this string is the `h1` word for word.
    */
    title: "Latest updates",
    description: BLOG_DESCRIPTION,
    socialDescription:
      "Notes on how the set gets drawn: what shipped, what was redrawn, and why.",
  })
}

/**
 * The band's keyline, matching the figures inside a post.
 *
 * Its own constant rather than an import from `components/blog-body.tsx`: a
 * number shared between a page and a component is the kind of import that
 * turns into a cycle the first time either grows. The two are meant to agree,
 * and the comment on `FIGURE_STROKE` over there is the one that explains 1.5.
 */
const BAND_STROKE = 1.5

/**
 * The band's row geometry, in pixels, because its height has to be derived
 * from this rather than picked.
 *
 * A drawing is `size-8` and the rows are `gap-y-6`, so a row occupies 32 and
 * the next starts 56 below it. `bandHeight` is the height that holds exactly
 * `rows` of them with nothing over: two rows is 32 + 24 + 32, not 2 x 56,
 * because the last row has no gap under it.
 *
 * Written out rather than a round number being chosen, because these have to
 * move together with the classes below. That is what a hard edge costs. See
 * the note on `Thumbnail`.
 */
const GLYPH = 32
const ROW_GAP = 24
const bandHeight = (rows: number) => rows * GLYPH + (rows - 1) * ROW_GAP

/**
 * The post's drawings, as a band of ink under the standfirst rather than a
 * picture in a frame.
 *
 * **Two things were tried and dropped on the way here, and both are worth
 * writing down.** The first was a row of six at 24px in a padded bar, which
 * read as a toolbar somebody had left at the top of the entry rather than as a
 * picture of anything. The second was the fix for that inside a bordered card:
 * enough drawings to fill a frame, running off its edges. The field was right;
 * the card around it was not. A rounded box with a tinted ground and a border
 * is a component, and three of them stacked down a page make an index look
 * like a settings screen.
 *
 * So the frame is gone and the field stayed. It sits on the page's own ground,
 * cropped by height alone. Nothing encloses it. The hairline above each entry
 * is the only chrome on this page, and it is the same rule `/changelog`
 * separates its releases with.
 *
 * **There was a fade over the ends and it has been dropped, which changes how
 * the height has to be chosen.** With a mask the height was free: the block
 * was centred, ran off both ends, and the gradient turned each cut into an
 * edge, so a row sliced through the middle simply faded out. With a hard edge
 * a sliced row is a row of half drawings. So the block is pinned to the top
 * and the height is `bandHeight(rows)`, which is the arithmetic that lands the
 * cut in the gap under the last visible row rather than through it. Change the
 * glyph size or the row gap and those constants change with them, or the band
 * starts slicing.
 *
 * Decoration, so it is inert: `aria-hidden`, because the entry's heading and
 * standfirst already say what the post is and a screen reader reading forty
 * drawings before them would make the index unusable.
 *
 * The drawings are 32px with tight gaps, which is a measurement against the
 * column rather than a taste: at 36px in a narrow one the field fell to three
 * a row with air around them, which reads as a scatter rather than a set.
 *
 * How many rows show is the whole of the sizing decision now. Two: enough that
 * it is a field rather than a row, few enough that an index of several entries
 * is still a list of headings rather than a wall of icons. The rest of the
 * list is cut off, which is what a band is.
 *
 * The ink is held back to 70 per cent, which is the other half of not being a
 * component: at full strength forty drawings under a heading compete with it
 * for the same attention, and the heading is what the reader came to read. It
 * comes up on hover, where the whole entry is the link.
 *
 * Left-aligned, not centred. The band sits directly under the standfirst and
 * shares its left edge, so a centred field would be the only thing in the
 * column that does not line up with the text above it.
 *
 * Check it rather than trusting the classes, and check the right thing: no
 * drawing may straddle the bottom edge. Every glyph has to be either wholly
 * inside the band or wholly outside it, at every width.
 */
function Thumbnail({ icons }: { icons: Icon[] }) {
  return (
    <div
      aria-hidden="true"
      /*
        A band, at a height in pixels rather than an aspect ratio. It sits in
        the content column under the standfirst, so its width is whatever the
        column is and an aspect would make it taller on a wide screen for no
        reason: what this wants is a constant slice through the field at every
        width.

        `overflow-hidden` is the crop and the only thing left of the frame.
        There is no background and no radius: a tinted rounded rectangle here
        is the card coming back in through the picture.
      */
      className="relative my-1 overflow-hidden"
      style={{ height: bandHeight(2) }}
    >
      {/*
        Pinned to the top and `content-start`, not centred. Centring was what
        the mask wanted: it split the overflow evenly so both ends had
        something to fade. With a hard edge the overflow has to be all at one
        end, and the edge has to land in the gap between two rows rather than
        through a drawing.
      */}
      <div className="absolute inset-x-0 top-0 flex flex-wrap content-start justify-start gap-x-6 gap-y-6 text-foreground/70 transition-colors group-hover:text-foreground">
        {icons.map((icon) => (
          <Glyph
            key={icon.name}
            art={icon.art.stroke!}
            size={24}
            stroke={BAND_STROKE}
            className="size-8 shrink-0"
          />
        ))}
      </div>
    </div>
  )
}

function Entry({ post, icons }: { post: BlogPost; icons: Icon[] }) {
  const version = postVersionLabel(post)

  return (
    /*
      A hairline above each entry and nothing else, which is how `/changelog`
      separates its releases.
    */
    <li className="border-t">
      {/*
        The whole entry is the link, rather than the heading being one inside
        it. An entry with a small link in it is an entry most of which does
        nothing when clicked, which on a phone is most of the target.

        **When it happened on the left, what happened on the right.** That is
        the arrangement every changelog worth reading uses, and it is better
        than a date tucked under the standfirst for a reason particular to this
        page: these entries are a series, so the column of dates is itself
        information, scannable down the page without reading a word of the
        posts.

        The meta column collapses above `sm`, where 150px of it would leave the
        titles nowhere to go.
      */}
      <Link
        href={postHref(post.slug)}
        className="group flex flex-col gap-3 py-10 sm:flex-row sm:gap-10"
      >
        <div className="flex shrink-0 flex-row items-center gap-3 sm:w-36 sm:flex-col sm:items-start sm:gap-2">
          {/*
            The version, or "Unreleased" while the tag does not exist. It is a
            badge rather than a line of text because it is the entry's one
            piece of hard metadata, and because "Unreleased" needs to read as a
            state rather than as a word someone typed.
          */}
          {version && (
            <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] tracking-tight text-foreground">
              {version}
            </span>
          )}
          {/*
            Uppercase and letterspaced, which is the one place on this site
            that treatment is right: it makes the date read as a label on the
            entry rather than as the first words of it.
          */}
          <time
            dateTime={post.date}
            className="text-[11px] tracking-widest text-muted-foreground uppercase"
          >
            {postDateLabel(post.date)}
          </time>
        </div>

        {/* `min-w-0` because a flex child defaults to its content's width, and
            a long unbroken title would otherwise squeeze the meta column. */}
        <div className="flex min-w-0 flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-tight text-balance text-foreground group-hover:underline group-hover:underline-offset-4 sm:text-2xl">
            {postHeadline(post)}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {post.standfirst}
          </p>

          <Thumbnail icons={icons} />

          {/*
            Not an anchor. The whole entry is already one, and an anchor inside
            an anchor is invalid markup that browsers repair by closing the
            outer one early, which would silently cut the clickable area down
            to the heading. It is styled as a link because it is one thing to
            click, just not its own.
          */}
          <span className="text-sm font-medium text-foreground underline underline-offset-4 group-hover:no-underline">
            Read more
          </span>
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

  return (
    <>
      <SiteNav />

      {/* The prose measure, matching `/changelog` and `/install`: this page is
          a heading, a sentence and a column of entries, and the icon browser's
          full-width box would set the sentence across 1,400px. */}
      <main className="mx-auto w-full max-w-3xl px-6 pb-16 lg:px-8">
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

        <header className="pt-6 pb-10">
          <h1 className="text-4xl font-semibold tracking-tight">
            Latest updates
          </h1>
          <p className="mt-3 text-base text-balance text-muted-foreground">
            {BLOG_DESCRIPTION}
          </p>
        </header>

        {/* No gap: each entry carries its own vertical padding and the
            hairline sits flush between them, so two entries share one rule
            rather than being two boxes with a gutter. */}
        <ul className="flex flex-col">
          {entries.map(({ post, icons: field }) => (
            <Entry key={post.slug} post={post} icons={field} />
          ))}
        </ul>
      </main>

      <SiteFooter />
    </>
  )
}
