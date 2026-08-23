import {
  isNewSince,
  loadIcons,
  SET_RELEASED_LABEL,
  SET_RELEASED_AT,
  SET_PREVIOUS_RELEASED_VERSION,
  SET_RELEASED_VERSION,
  SET_VERSION,
  STYLES,
} from "@/lib/icons"
import { pageMetadata } from "@/lib/seo"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { Glyph } from "@/components/glyph"

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

/**
 * The release, and anything drawn since it.
 *
 * The release entry is dated by the tag rather than by the newest drawing. It
 * used to take the latter, which was right while the two were the same day and
 * became a lie the moment anything landed afterwards: an entry headed "Initial
 * release" would have carried today's date. What landed afterwards is its own
 * entry, which is the honest place for it.
 */
async function release() {
  const icons = await loadIcons()
  const dated = icons.filter((icon) => icon.history)
  const since = dated.filter(isNewSince)

  const newest = since.reduce(
    (latest, icon) =>
      !latest || icon.history!.added > latest.history!.added ? icon : latest,
    since[0]
  )

  return {
    count: dated.length,
    // Formatted by `pipeline/build-history.mjs`, not here. A date formatted at
    // render is formatted on both sides of hydration, and the two disagree for
    // a visitor in another locale.
    date: SET_RELEASED_AT.slice(0, 10),
    label: SET_RELEASED_LABEL,
    since: {
      // The drawings, not their names. A changelog that only names them makes
      // the reader go and look them up, which is the one thing this page is
      // placed to save them.
      icons: [...since].sort((a, b) => a.name.localeCompare(b.name)),
      date: newest?.history?.added.slice(0, 10) ?? "",
      label: newest?.history?.addedLabel ?? "",
    },
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
  const { count, date, label, since, styles } = await release()

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
          A `section` per entry, newest first, exactly as the note above this
          block always said the second one would be.

          It names the drawings and stops there. An earlier version of this page
          printed every icon in the set as a tile and became a second browser
          filed by date; a list of what is new is the part that browser could
          not give you, because `/icons` cannot show you what you have already
          seen.
        */}
        {since.icons.length > 0 && (
          <section className="border-t pt-8 pb-8">
            {/*
              Headed by the version it will ship as, like the entry under it.
              "New drawings" named the contents rather than the release, which
              is a heading a reader cannot place against anything.
            */}
            <h2 className="text-xl font-semibold tracking-tight">
              {SET_VERSION}
            </h2>

            {/*
              Released, not pending. This entry used to list what had been drawn
              since the last tag and was therefore unreleased by definition; it
              now lists what the current release *added*, so saying "Unreleased"
              over it contradicts the version heading above it.
            */}
            <p className="mt-2 text-sm text-muted-foreground">
              Released
              <span aria-hidden="true"> · </span>
              <time dateTime={date}>{label}</time>
            </p>

            <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                {since.icons.length} drawings added since{" "}
                {SET_PREVIOUS_RELEASED_VERSION}, each marked with a dot in the
                grid, and{" "}
                <span className="text-foreground">New</span> in its preview,
                until the next release:
              </p>
              {/*
                Drawn at grid size, not at display size. These are being
                identified rather than admired, and 24px is the size the set is
                built at and the size they will be used at.
              */}
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-2 not-prose">
                {since.icons.map((icon) => (
                  <li
                    key={icon.name}
                    className="flex flex-col items-center gap-2 rounded-lg bg-muted p-3"
                  >
                    <span className="text-foreground">
                      <Glyph art={icon.art.stroke!} size={24} stroke={2} />
                    </span>
                    <span className="w-full truncate text-center text-[11px] leading-tight">
                      {icon.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="border-t pt-8">
          <h2 className="text-xl font-semibold tracking-tight">
            {SET_RELEASED_VERSION}
          </h2>

          {/*
            Name and date on one line under the heading, which is where a
            changelog is read from. The machine-readable date is the ISO one;
            the printed one is the label baked at build.
          */}
          <p className="mt-2 text-sm text-muted-foreground">
            Initial release
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
