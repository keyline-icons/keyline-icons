import {
  loadIcons,
  NEW_FOR_DAYS,
  SET_RELEASES,
  SET_UNRELEASED,
  toStyleArt,
  type Icon,
  type Redraw,
  type StyleArt,
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
 * "1 drawing", not "1 drawings".
 *
 * The page shipped `{n} drawings` for every count including one, which reads as
 * a machine talking. A release that adds a single icon is the common case, so
 * this is not an edge.
 */
const plural = (n: number, one: string, many = one + "s") =>
  `${n} ${n === 1 ? one : many}`

/**
 * The drawings themselves, at grid size.
 *
 * They are being identified rather than admired, and 24px is the size the set
 * is built at and used at. Shared by the released entries and the unreleased
 * one so the two cannot drift apart.
 */
function Tiles({ icons }: { icons: Icon[] }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-2 not-prose">
      {icons.map((icon) => (
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
  )
}

/**
 * A redrawn drawing, taken apart ready to render.
 *
 * The two documents are parsed once in `release()` rather than in the markup,
 * so the component below is a layout and nothing else.
 */
type Pair = { name: string; before: StyleArt | null; after: StyleArt | null }

/**
 * What was redrawn, shown as the change rather than as a claim.
 *
 * A changelog that only names a corrected drawing is asking the reader to
 * remember what it used to look like, and nobody can — which is the whole
 * reason the icon was worth correcting. So the entry carries both drawings out
 * of the refs that bound the release and prints them side by side.
 *
 * Both at the same size, in the same ink, on the same ground: the difference
 * between them is the only thing that should differ, so anything the layout
 * does to one of them it does to both. The pair falls back to whichever half
 * exists, which is the resting state for a drawing that was committed without
 * visibly moving.
 */
function Redrawn({ pairs }: { pairs: Pair[] }) {
  const face = (art: StyleArt | null, label: string) =>
    art && (
      <span className="flex flex-col items-center gap-1.5">
        <span className="text-foreground">
          <Glyph art={art} size={24} stroke={2} />
        </span>
        <span className="text-[10px] leading-none text-muted-foreground">
          {label}
        </span>
      </span>
    )

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(148px,1fr))] gap-2 not-prose">
      {pairs.map((pair) => (
        <li
          key={pair.name}
          className="flex flex-col items-center gap-2 rounded-lg bg-muted p-3"
        >
          <span className="flex items-center gap-3">
            {face(pair.before, "Before")}
            {pair.before && pair.after && (
              <span aria-hidden="true" className="text-muted-foreground">
                →
              </span>
            )}
            {face(pair.after, "After")}
          </span>
          <span className="w-full truncate text-center text-[11px] leading-tight">
            {pair.name}
          </span>
        </li>
      ))}
    </ul>
  )
}

/**
 * The stored documents, parsed, with today's drawing as the fallback.
 *
 * A redraw that the generator could not find a visible change for carries no
 * pair, and the honest thing to show for it is the drawing as it stands rather
 * than nothing at all — the icon was still touched in that release.
 */
const pairs = (redraws: Redraw[], byName: Map<string, Icon>): Pair[] =>
  redraws.map((redraw) => ({
    name: redraw.name,
    before: redraw.before ? toStyleArt(redraw.before) : null,
    after: redraw.after
      ? toStyleArt(redraw.after)
      : byName.get(redraw.name)?.art.stroke ?? null,
  }))

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
    /*
      What has been drawn since the newest tag, if anything. Its own section
      rather than a row inside the newest release: that entry is headed
      "Released" over the tag's own date, and a drawing made after it was never
      in it. `grip-vertical` was drawn twelve hours after v0.1.4 and the page
      announced it as part of v0.1.4, which npm would have contradicted.
    */
    unreleased: SET_UNRELEASED && {
      ...SET_UNRELEASED,
      icons: SET_UNRELEASED.names
        .map((name) => byName.get(name))
        .filter(Boolean) as Icon[],
      redrawn: pairs(SET_UNRELEASED.updated, byName),
    },
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
      redrawn: pairs(entry.updated ?? [], byName),
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
  const { entries, unreleased } = await release()

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
            Releases, new drawings and announcements, newest first. A drawing
            carries a <span className="text-foreground">New</span> badge for its
            first {NEW_FOR_DAYS} days, whatever ships in between.
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
        {/*
          Work since the newest tag. It leads the page because it is what a
          returning reader is looking for, and it is headed "Unreleased"
          rather than by a version, because it does not have one: an install of
          the newest release does not contain it.
        */}
        {unreleased && (
          <section className="border-t pt-8 pb-8">
            <h2 className="text-xl font-semibold tracking-tight">Unreleased</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Drawn since {unreleased.since}
              <span aria-hidden="true"> · </span>
              not in a release yet
            </p>

            <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
              {/*
                The hand-written note leads, where there is one. A release that
                added drawings describes itself out of the counts below; one
                that added an axis without adding a name has nothing for them to
                count, and the sentence is the whole announcement.
              */}
              {unreleased.note && (
                <p className="text-foreground">{unreleased.note}</p>
              )}
              <p>
                {/*
                  Both halves, always. The sentence used to name whichever list
                  was non-empty and drop the other, so a stretch that added
                  three drawings and corrected six announced the three.
                */}
                {unreleased.icons.length > 0 && unreleased.redrawn.length > 0
                  ? `${plural(unreleased.icons.length, "drawing")} added and ` +
                    `${unreleased.redrawn.length} redrawn since ${unreleased.since}`
                  : unreleased.icons.length > 0
                    ? `${plural(unreleased.icons.length, "drawing")} added since ${unreleased.since}`
                    : `${plural(unreleased.redrawn.length, "drawing")} redrawn since ${unreleased.since}`}
                , in the repository and the design files but not on npm until
                the next release. The set holds {unreleased.count}:
              </p>
              {unreleased.icons.length > 0 && (
                <Tiles icons={unreleased.icons} />
              )}
              {unreleased.redrawn.length > 0 && (
                <Redrawn pairs={unreleased.redrawn} />
              )}
            </div>
          </section>
        )}

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
              {entry.note && <p className="text-foreground">{entry.note}</p>}
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
                    No new drawings. {plural(entry.redrawn.length, "redrawn", "redrawn")}{" "}
                    since {entry.previous}, so the set still holds {entry.count}:
                  </p>
                ) : entry.redrawn.length === 0 ? (
                  <p>
                    {plural(entry.icons.length, "drawing")} added since{" "}
                    {entry.previous}, bringing the set to {entry.count}:
                  </p>
                ) : (
                  /* A release that both adds and corrects used to announce
                     only the additions, and then draw only their tiles. Every
                     redrawn icon in a release like that went out unmentioned. */
                  <p>
                    {plural(entry.icons.length, "drawing")} added since{" "}
                    {entry.previous}, bringing the set to {entry.count}, and{" "}
                    {plural(entry.redrawn.length, "redrawn", "redrawn")}:
                  </p>
                )
              )}
              {/*
                Drawn at grid size, not at display size. These are being
                identified rather than admired, and 24px is the size the set is
                built at and the size they will be used at.
              */}
              {!entry.initial && entry.icons.length > 0 && (
                <Tiles icons={entry.icons} />
              )}
              {!entry.initial && entry.redrawn.length > 0 && (
                <Redrawn pairs={entry.redrawn} />
              )}
            </div>
          </section>
        ))}

      </main>

      <SiteFooter />
    </>
  )
}
