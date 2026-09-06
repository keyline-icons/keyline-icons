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
 * The fade that makes the panel below a picture rather than a box with icons
 * in it.
 *
 * Top and bottom only. The field is laid out taller than the panel and centred
 * in it, so the first and last rows are already running off the edges; the mask
 * is what turns a cut into a fade. Horizontal fading was tried and taken out:
 * it thins the drawings at the ends of every row, which reads as a rendering
 * fault rather than as depth.
 *
 * A mask and not a gradient overlay, for the reason `icon-wall.tsx` gives: an
 * overlay has to know the colour behind it, so it is a white rectangle that
 * stays a white rectangle on a dark page unless someone remembers to theme it.
 * Both the prefixed and unprefixed properties, same as there.
 */
const PANEL_MASK =
  "linear-gradient(to bottom, transparent 0%, #000 20%, #000 80%, transparent 100%)"

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
 * cropped by height alone and faded out at both ends, which is exactly what
 * `components/icon-wall.tsx` does behind the landing page's headline. Nothing
 * encloses it. The hairline above each entry is the only chrome on this page,
 * and it is the same rule `/changelog` separates its releases with.
 *
 * Decoration, so it is inert: `aria-hidden`, because the entry's heading and
 * standfirst already say what the post is and a screen reader reading forty
 * drawings before them would make the index unusable.
 *
 * Stroke at 30px, with the gaps tight. Both numbers are measurements against
 * the panel rather than tastes, and they have been wrong in both directions:
 *
 * - **Too large and the field stops being a field.** At 36px in a 270px
 *   column this became three drawings a row with air around them, which reads
 *   as a scatter of icons rather than a set.
 * - **Too small, or too generously spaced, and nothing bleeds.** The effect
 *   depends on the list wrapping to *more rows than the panel is tall*, so the
 *   first and last are genuinely cut and the mask has a cut to turn into an
 *   edge. An earlier version fitted inside the frame and left a ragged last
 *   row sitting in the middle of it with nothing to fade.
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
 * Check it rather than trusting the classes: the block's `scrollHeight` has to
 * be larger than the frame's height, at every width.
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
      className="relative my-1 h-32 overflow-hidden sm:h-40"
    >
      {/*
        Vertically the block is allowed to be taller than the frame and is
        centred in it, so what runs off the top and bottom is what the mask
        fades out. Horizontally it fills the column exactly: with no frame
        drawn there is no edge for a drawing to be cut against, and the inset
        that used to keep them clear of one now only makes the field narrower
        than the space it has.
      */}
      <div
        className="absolute inset-x-0 inset-y-0 flex flex-wrap content-center justify-start gap-x-6 gap-y-6 text-foreground/70 transition-colors group-hover:text-foreground"
        style={{ maskImage: PANEL_MASK, WebkitMaskImage: PANEL_MASK }}
      >
        {icons.map((icon) => (
          <Glyph
            key={icon.name}
            art={icon.art.stroke!}
            size={32}
            stroke={2}
            className="shrink-0"
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

        {/*
          The pointer at the generated record. Every post here is about a set
          of commits, and a reader who wants the commits rather than the
          commentary should not have to find the changelog from the bar.
        */}
        <p className="border-t pt-6 text-sm text-muted-foreground">
          For the record rather than the account, see the{" "}
          <Link
            href="/changelog"
            className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
          >
            changelog
          </Link>
          , which is generated from the commits themselves.
        </p>
      </main>

      <SiteFooter />
    </>
  )
}
