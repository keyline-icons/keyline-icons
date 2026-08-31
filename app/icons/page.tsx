import type { Metadata } from "next"
import { cookies } from "next/headers"

import { parseSettings, SETTINGS_COOKIE } from "@/lib/browser-settings"
import { CONTAINERS } from "@/components/glyph"
import { isNewSince, loadIcons, STYLES } from "@/lib/icons"
import { CORNERS } from "@/components/glyph"
import { pageMetadata } from "@/lib/seo"
import { IconLibrary } from "@/components/icon-library"
import { SET_LICENSE, SET_TAGLINE } from "@/lib/site-chrome"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { Toaster } from "@/components/ui/sonner"

/**
 * Generated rather than declared, for one word in it: the count.
 *
 * "360 icons" is the page's headline fact and the reason someone clicks the
 * result, so it has to be in the title and the description, and it has to be
 * read off disk, because a number typed into a string is a claim with an expiry
 * date on it and nothing in the build would ever catch it going stale.
 *
 * `loadIcons` memoises for the life of the process, so calling it here and
 * again in the page body costs one read of the icon directories, not two.
 */
export async function generateMetadata(): Promise<Metadata> {
  const total = (await loadIcons()).length

  return pageMetadata({
    // The browser's own address, self-referencing as every canonical here is.
    // `/` used to 308 here and now renders the landing page instead, so the two
    // are separate pages with separate canonicals: this one is the grid, that
    // one is the set. Neither redirects to the other and neither repeats the
    // other's content, which is the whole condition for both being indexed.
    path: "/icons",
    // This page led with the brand and opted out of the layout's
    // `%s · Keyline Icons` template to do it, for as long as it was the site's
    // front door. `/` is a real page again and has taken that title, word for
    // word, because the brand belongs to the address the brand is linked by.
    //
    // What is left is the better title for what this page actually is: the one
    // someone lands on when they are looking for an icon rather than for a set.
    // Three decisions in it:
    //
    // - The verb leads. "Browse" is the intent, and Google weights the front of
    //   a title.
    // - "free" stays, because it is the first thing anyone comparing icon sets
    //   checks, and it is only sayable because there is a `LICENSE` file behind
    //   it. See `SET_LICENSE`.
    // - The count stays. "414 free icons" is the one number that separates this
    //   from every other free set in the results, and it is read off disk
    //   rather than typed, so it cannot go stale.
    //
    // And one word deliberately not in it: **SVG**. It was there, for the query
    // rather than for the reader, and it is a claim about format on a page that
    // is not about formats. The same drawings already leave here as JSX and as
    // React components, the set is also a published Figma Community file,
    // and whatever ships next would make the word narrower still. A title that
    // names one output is a title that has to be rewritten every time another
    // one is added. The description below is where formats belong, because it
    // can list them rather than pick one.
    //
    // It goes through the template rather than around it, so the result reads
    // "Browse 414 free icons · Keyline Icons": the job first, the set second,
    // and no page on the site claiming the name twice.
    title: `Browse ${total} free icons`,
    // The same phrase the hero under it carries, word for word. This page said
    // "three weights" while its own first line said "Stroke, duotone and fill,
    // rounded or sharp", which is one page describing itself two ways.
    description:
      `Search ${total} free ${SET_LICENSE}-licensed icons drawn on one 24×24 ` +
      `grid, in stroke, duotone and fill, rounded or sharp. Set the size and ` +
      `stroke you actually ship at, and copy any icon as SVG or JSX.`,
    // The card has no keyword job and less room, so it says the thing the
    // page says out loud instead.
    socialDescription: `${SET_TAGLINE}. ${total} free icons in stroke, duotone and fill, rounded or sharp.`,
  })
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    icon?: string | string[]
    "icon-style"?: string | string[]
    "icon-corners"?: string | string[]
    search?: string | string[]
    style?: string | string[]
    shape?: string | string[]
    corners?: string | string[]
  }>
}) {
  /*
   * Badged here rather than in the grid. The comparison needs the tag date out
   * of `lib/icon-history.json`, and `lib/icons.ts` reads the icon directories
   * off disk, so the client component that draws the tiles cannot import it to
   * ask. It carries the answer instead.
   */
  const icons = (await loadIcons()).map((icon) =>
    isNewSince(icon) ? { ...icon, isNew: true } : icon
  )

  // Reading the cookie is what lets the first paint already be your grid, at
  // the cost of rendering per request rather than once at build.
  const settings = parseSettings((await cookies()).get(SETTINGS_COOKIE)?.value)

  /**
   * `?search=circle+arrow` seeds the search, so a link can arrive at the grid
   * already narrowed, and `?icon=circle-arrow-down` opens the dock on one
   * drawing.
   *
   * Both are written back by the browser as you use it, which is the point:
   * the address of a search you ran and an icon you opened can be copied out
   * and sent. Neither is how an icon is *addressed* for a crawler.
   * `/icons/circle-arrow-down` is, and it is the canonical, indexed page; this
   * one canonicalises to a bare `/icons` on its own, because its canonical is
   * already absolute and self-referencing.
   *
   * Repeating a key gives an array, so only a lone string is honoured.
   *
   * The search seed is a search term and nothing else: it reaches a text input
   * and is never used to look anything up, so a junk value filters to nothing
   * and stops there. The icon seed *is* looked up, against the set itself, for
   * the reason the style and shape notes below give: an unchecked name would
   * open a panel with no drawing in it.
   *
   * `?icon=` used to be the search seed, and the fallback below is what keeps
   * every link that still spells it that way working. `/` submits its hero
   * search as `?search=`, so the only `?icon=` values that are not icon names
   * now come from links made before the split.
   */
  /**
   * `?style=duotone` seeds the style filter, on the same terms.
   *
   * The landing page's three style cards are what needed it: a card headed
   * "Duotone, 345 icons" has to arrive somewhere showing duotone, and until
   * this existed the only honest destination for all three was the unfiltered
   * grid. It is a seed and not an address — the page still declares `/icons` as
   * its canonical, so the three URLs consolidate into one indexed page.
   *
   * `?shape=square` does the same for the container filter, and the container
   * section's three cards are what needed that one: a panel about
   * `square-check` goes to the square shelf, not to that one drawing's page.
   *
   * Both are validated against their own list rather than cast. The values
   * reach `useState`, so an unknown string would put the grid in a state no
   * control can name and no icon matches: a blank library with every filter
   * looking untouched.
   */
  const params = await searchParams
  const { icon, search, style, shape, corners } = params
  const named = typeof icon === "string" ? icon.trim().slice(0, 64) : ""
  const initialIcon = icons.some((known) => known.name === named)
    ? named
    : undefined
  const initialQuery =
    typeof search === "string"
      ? search.trim().slice(0, 64)
      : // The legacy spelling: `?icon=arrow up` was a search term, and only a
        // value that is not a drawing can still be one.
        initialIcon
        ? ""
        : named
  const initialStyle = STYLES.find((known) => known === style)
  const initialShape = CONTAINERS.find((known) => known === shape)

  /*
   * How the dock is showing the drawing `?icon=` names.
   *
   * Their own keys rather than a second meaning for `?style=` and `?corners=`,
   * because the panel's picks are deliberately local: the grid can be rounded
   * stroke while the panel is sharp fill, and that screen has to survive being
   * linked to. Validated against the same two lists, for the same reason.
   */
  const initialIconStyle = STYLES.find(
    (known) => known === params["icon-style"]
  )
  const initialIconCorners = CORNERS.find(
    (known) => known === params["icon-corners"]
  )

  /*
   * `?corners=sharp` arrives as a seed like the three above, and lands one
   * level down from them: the treatment is a persisted setting rather than
   * component state, so it seeds by overriding the cookie for this render
   * instead of by a prop.
   *
   * The changelog's preview is what needs it. A link that shows you thirty
   * sharp drawings and then opens the browser on rounded is the same mismatch
   * as a snippet that does not produce what is on the screen.
   *
   * Narrowed against `CORNERS`, for the reason the note above gives: an
   * unchecked string out of the URL reaching `artOf` draws nothing at all.
   * It does not write the cookie by arriving: the reader's own preference
   * survives until they change something themselves.
   *
   * The browser writes this one back too, whenever the treatment on screen is
   * not the shipped default, so the switch produces the link that reproduces
   * it. Reading a parameter nothing can write is half a feature.
   */
  const seeded = CORNERS.find((known) => known === corners)
  const initialSettings = seeded ? { ...settings, corners: seeded } : settings

  return (
    <>
      {/*
        No structured data on this page any more, and the omission is
        deliberate. It used to emit `homeJsonLd`, the `WebSite` plus
        `SoftwareApplication` graph that describes the set, because for a while
        this page was the site's front door. `app/page.tsx` is, so the graph
        went with the title: `SoftwareApplication` describes the application,
        and this is one page inside it. Two pages declaring themselves to be the
        same entity is worse than one page declaring nothing.

        Nothing replaces it. A `CollectionPage` node here would restate what the
        markup already says, and the icon pages' `isPartOf` points at the
        `WebSite` node by `@id`, which now resolves to a page that actually
        exists.
      */}
      <SiteNav />
      <div className="mx-auto w-full max-w-360 px-6 py-10 lg:px-8">
        <IconLibrary
          icons={icons}
          initialSettings={initialSettings}
          initialQuery={initialQuery}
          initialStyle={initialStyle}
          initialShape={initialShape}
          initialIcon={initialIcon}
          initialIconStyle={initialIconStyle}
          initialIconCorners={initialIconCorners}
        />

        {/*
          There was an FAQ section under the grid here, ten questions from
          `siteFaq()`. It was the only prose on this page, which is the one
          thing worth knowing about dropping it: the page is now a grid and
          nothing else, so a search result has the title and the meta
          description to quote and no sentence off the page itself.

          Its `FAQPage` node went with it, in the same change. Structured data
          may only describe what the page actually renders, and a node quoting
          answers that are no longer on screen is the violation, not the
          shortcut. `siteFaq()` itself is gone from `lib/faq.ts` too, rather
          than left there unrendered; `/install` and the icon pages keep their
          own.
        */}
        <Toaster />
      </div>
      <SiteFooter />
    </>
  )
}
