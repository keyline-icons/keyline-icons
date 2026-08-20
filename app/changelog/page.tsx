import { loadIcons, SET_VERSION, STYLES } from "@/lib/icons"
import { pageMetadata } from "@/lib/seo"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"

/**
 * What has shipped, release by release.
 *
 * There is one release, so there is one entry, and that is the whole page. An
 * earlier version of it grouped every drawing by the day it was committed and
 * printed all 484 of them as tiles: a second icon browser, filed by date,
 * answering a question `/icons` and the icon pages already answer better. A
 * changelog is for the release, not for the inventory.
 *
 * The Figma file carries the same page, written by hand. The two are meant to
 * say the same thing, so an edit here is an edit there.
 *
 * Everything countable is counted. `loadIcons` memoises, so the numbers cost
 * nothing the page was not already paying, and a number typed into a string is
 * a claim with an expiry date. This repo has already shipped one: three counts
 * on the install page, stale by 27 icons before anyone noticed.
 */

/** The date the release is dated by: the last day any drawing moved. */
async function release() {
  const icons = await loadIcons()
  const dated = icons.filter((icon) => icon.history)

  const newest = dated.reduce(
    (latest, icon) =>
      !latest || icon.history!.updated > latest.history!.updated
        ? icon
        : latest,
    dated[0]
  )

  return {
    count: dated.length,
    // Formatted by `pipeline/build-history.mjs`, not here. A date formatted at
    // render is formatted on both sides of hydration, and the two disagree for
    // a visitor in another locale.
    date: newest?.history?.updated.slice(0, 10) ?? "",
    label: newest?.history?.updatedLabel ?? "",
    styles: STYLES.map((style) => ({
      style,
      count: icons.filter((icon) => icon.art[style]).length,
    })),
  }
}

export async function generateMetadata() {
  const { count } = await release()

  return pageMetadata({
    path: "/changelog",
    // Word for word the `h1`, which is the whole point: Google rewrites a
    // title that disagrees with what the page visibly leads with. The root
    // layout's template appends the set name, so this is the page's own name
    // and nothing else.
    title: "Changelog",
    description:
      `Every release of Keyline Icons and what went into it. ${count} ` +
      `drawings on one 24×24 grid, in stroke, duotone and fill, free under ` +
      `the MIT licence.`,
    socialDescription:
      "Every release of Keyline Icons and what went into it, newest first.",
  })
}

export default async function Page() {
  const { count, date, label, styles } = await release()

  return (
    <>
      <SiteNav />

      {/*
        The install page's prose measure. This page is a heading and three
        sentences; the icon grid's full-width box would set them across
        1,400px.
      */}
      <main className="mx-auto w-full max-w-3xl px-6 pb-16 lg:px-8">
        <header className="pt-6 pb-12">
          <h1 className="text-4xl font-semibold tracking-tight">Changelog</h1>
          <p className="mt-3 text-base text-balance text-muted-foreground">
            Releases, new drawings and announcements, newest first.
          </p>
        </header>

        {/*
          One entry, and the markup says so: a `section` per release, so the
          second one is a copy of this block rather than a rewrite of the page.
        */}
        <section className="border-t pt-8">
          <h2 className="text-xl font-semibold tracking-tight">
            Initial release
          </h2>

          {/*
            Version and date on one line under the heading, which is where a
            changelog is read from. The machine-readable date is the ISO one;
            the printed one is the label baked at build.
          */}
          <p className="mt-2 text-sm text-muted-foreground">
            Version {SET_VERSION}
            <span aria-hidden="true"> · </span>
            <time dateTime={date}>{label}</time>
          </p>

          <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              The first cut of the set: {count} drawings on one 24×24 grid, at a
              2px keyline, built for shadcn/ui and free under the MIT licence.
              Every icon is drawn in{" "}
              {/*
                Per style rather than one number, because the three are not the
                same size and a reader deciding whether to adopt the set is
                deciding on the style they will actually use.
              */}
              {styles.map(({ style, count: n }, i) => (
                <span key={style}>
                  {i > 0 && (i === styles.length - 1 ? " and " : ", ")}
                  {style} ({n})
                </span>
              ))}
              , and ships as an SVG, a JSX snippet and a React component.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
