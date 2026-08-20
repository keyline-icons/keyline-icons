import type { Metadata } from "next"
import { cookies } from "next/headers"

import { parseSettings, SETTINGS_COOKIE } from "@/lib/browser-settings"
import { CONTAINERS } from "@/components/glyph"
import { loadIcons, STYLES } from "@/lib/icons"
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
    description:
      `Search ${total} free ${SET_LICENSE}-licensed icons drawn on one 24×24 ` +
      `grid, in three weights: stroke, duotone and fill. Set the size and ` +
      `stroke you actually ship at, and copy any icon as SVG or JSX.`,
    // The card has no keyword job and less room, so it says the thing the
    // page says out loud instead.
    socialDescription: `${SET_TAGLINE}. ${total} free icons in stroke, duotone and fill.`,
  })
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    icon?: string | string[]
    style?: string | string[]
    shape?: string | string[]
  }>
}) {
  const icons = await loadIcons()

  // Reading the cookie is what lets the first paint already be your grid, at
  // the cost of rendering per request rather than once at build.
  const settings = parseSettings((await cookies()).get(SETTINGS_COOKIE)?.value)

  /**
   * `?icon=circle-arrow-down` seeds the search, so a link can arrive at the
   * grid already narrowed to one icon.
   *
   * It is no longer how an icon is addressed — `/icons/circle-arrow-down` is,
   * and it is the canonical, indexed page. This parameter survives because the
   * two do different jobs: the page is about one drawing, while a seeded search
   * is the grid with a starting point, which is what a link into a comparison
   * wants. It canonicalises to `/icons` on its own, because this page's
   * canonical is already absolute and self-referencing.
   *
   * Repeating the key gives an array, so only a lone string is honoured. It is
   * a search term and nothing else: it reaches a text input and is never used
   * to look anything up, so a junk value filters to nothing and stops there.
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
  const { icon, style, shape } = await searchParams
  const initialQuery = typeof icon === "string" ? icon.trim().slice(0, 64) : ""
  const initialStyle = STYLES.find((known) => known === style)
  const initialShape = CONTAINERS.find((known) => known === shape)

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
          initialSettings={settings}
          initialQuery={initialQuery}
          initialStyle={initialStyle}
          initialShape={initialShape}
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
