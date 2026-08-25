import {
  loadIcons,
  SET_RELEASES,
  type Icon,
} from "@/lib/icons"
import { pageMetadata } from "@/lib/seo"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { Glyph } from "@/components/glyph"

/**
 * What has shipped, release by release.
 *
 * One entry per release, newest first, every release that has ever been cut.
 * An earlier version of it grouped every drawing by the day it was committed
 * and printed all 484 of them as tiles: a second icon browser, filed by date,
 * answering a question `/icons` and the icon pages already answer better. A
 * changelog is for the release, not for the inventory.
 *
 * **Entries are never removed and never rewritten.** The page is generated, so
 * every cut rebuilds it from scratch, and for two releases it was built from
 * `SET_RELEASED_*` and `SET_PREVIOUS_RELEASED_*` — which describe two releases
 * and therefore silently deleted the third. Cutting v0.1.2 dropped v0.1.0 off
 * the bottom and relabelled v0.1.1 "Initial release". Anything added here must
 * read `SET_RELEASES`, which holds all of them, rather than the two scalars.
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
  const byName = new Map(icons.map((icon) => [icon.name, icon]))

  return {
    count: dated.length,
    /*
      One entry per release, newest first, straight off the generated list.
      Counts and membership are as of each tag rather than as of today: the
      entry under "The first cut of the set" used to print the current total,
      so the number grew every time a drawing landed and the sentence described
      a release that never contained them.
    */
    entries: SET_RELEASES.map((entry, i) => ({
      ...entry,
      previous: SET_RELEASES[i + 1]?.version ?? null,
      /* Newest first, so the entry after this one in the array is the release
         before it in time, and the newest entry is the only one still current. */
      current: i === 0,
      // The drawings, not their names. A changelog that only names them makes
      // the reader go and look them up, which is the one thing this page is
      // placed to save them.
      icons: entry.names
        .map((name) => byName.get(name))
        .filter(Boolean) as Icon[],
      /* A release is not always drawings added. One that is entirely
         corrections could only say "0 drawings added", which is true and tells
         a reader nothing about why they would upgrade. */
      redrawn: (entry.updatedNames ?? [])
        .map((name) => byName.get(name))
        .filter(Boolean) as Icon[],
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
  const { entries } = await release()

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
          A `section` per entry, newest first — every release, not the two the
          old scalars could describe.

          It names the drawings and stops there. An earlier version of this page
          printed every icon in the set as a tile and became a second browser
          filed by date; a list of what is new is the part that browser could
          not give you, because `/icons` cannot show you what you have already
          seen.
        */}
        {entries.map((entry) => (
          <section key={entry.version} className="border-t pt-8 pb-8">
            {/*
              Headed by the version it shipped as. "New drawings" named the
              contents rather than the release, which is a heading a reader
              cannot place against anything.
            */}
            <h2 className="text-xl font-semibold tracking-tight">
              {entry.version}
            </h2>

            {/*
              Name and date on one line under the heading, which is where a
              changelog is read from. The machine-readable date is the ISO one;
              the printed one is the label baked at build.

              "Initial release" belongs to the oldest tag and to nothing else.
              It used to be printed over whichever entry happened to be second
              on the page, which made every release after the second one
              announce its predecessor as the first cut of the set.
            */}
            <p className="mt-2 text-sm text-muted-foreground">
              {entry.initial ? "Initial release" : "Released"}
              <span aria-hidden="true"> · </span>
              <time dateTime={entry.date.slice(0, 10)}>{entry.label}</time>
            </p>

            <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
              {entry.initial ? (
                <p>
                  The first cut of the set: {entry.count} drawings on one 24×24
                  grid, at a 2px keyline, built for shadcn/ui and free under the
                  MIT licence, shipping as SVGs, JSX snippets and React
                  components.
                </p>
              ) : (
                entry.icons.length === 0 && entry.redrawn.length === 0 ? (
                  <p>
                    No drawing changes since {entry.previous}. The set still
                    holds {entry.count}.
                  </p>
                ) : entry.icons.length === 0 ? (
                  <p>
                    No new drawings. {entry.redrawn.length} redrawn since{" "}
                    {entry.previous}, so the set still holds {entry.count}:
                  </p>
                ) : (
                  <p>
                    {entry.icons.length} drawings added since {entry.previous},
                    {entry.current ? (
                      <>
                        {" "}each marked with a dot in the grid, and{" "}
                        <span className="text-foreground">New</span> in its
                        preview, until the next release:
                      </>
                    ) : (
                      <>
                        {" "}bringing the set to {entry.count}:
                      </>
                    )}
                  </p>
                )
              )}
              {/*
                Drawn at grid size, not at display size. These are being
                identified rather than admired, and 24px is the size the set is
                built at and the size they will be used at.
              */}
              {!entry.initial && (entry.icons.length > 0 || entry.redrawn.length > 0) && (
                <ul className="grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-2 not-prose">
                  {(entry.icons.length ? entry.icons : entry.redrawn).map((icon) => (
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
              )}
            </div>
          </section>
        ))}

      </main>

      <SiteFooter />
    </>
  )
}
