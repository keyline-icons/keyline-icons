import { pageMetadata } from "@/lib/seo"
import { RAIL_ASIDE, RAIL_COLUMN, RAIL_PAGE } from "@/lib/site-chrome"
import { ChangelogHash } from "@/components/changelog-hash"
import {
  release,
  ReleaseEntry,
  UnreleasedEntry,
} from "@/components/changelog-release"
import { ContentsLabel } from "@/components/page-contents"
import { ReleaseTicks, type ReleaseTick } from "@/components/release-ticks"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"

/*
  The list of releases: the newest in full and the rest as a sentence and a
  link to their own page. What a release draws is in
  `components/changelog-release.tsx`, which both routes render.
*/

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
      `Every release of Keyline Icons and what went into it. ${count.toLocaleString("en-US")} ` +
      `drawings on one 24×24 grid, in stroke, two-tone, duotone and fill, free under ` +
      `the MIT licence.`,
    socialDescription:
      "Every release of Keyline Icons and what went into it, newest first.",
  })
}

export default async function Page() {
  const data = await release()
  const { entries, unreleased } = data

  /* The ticks, in page order, labelled the way each entry labels itself. */
  const ticks: ReleaseTick[] = [
    ...(unreleased
      ? [
          {
            id: "unreleased",
            version: "Unreleased",
            date: `Since v${unreleased.since}`,
            title: unreleased.title ?? null,
          },
        ]
      : []),
    ...entries.map((entry) => ({
      id: `v${entry.version}`,
      version: `v${entry.version}`,
      date: entry.label,
      title: entry.title ?? null,
    })),
  ]

  return (
    <>
      <SiteNav />

      {/*
        The prose measure `/blog` and `/install` keep, so the three pages that
        read as writing about the set sit in one column (Zafar, 17 Sep 2026:
        "keep the same container width as blog and install, but just place the
        list on the left, leaving the right side empty"). The page's own box
        was tried first, and the grids filled it at nine a row with the
        sentences stranded at the left of a very wide page.
      */}
      <main className={RAIL_PAGE}>
        <header className={`${RAIL_COLUMN} pt-6 pb-16 sm:pb-24`}>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Changelog
          </h1>
          <p className="mt-4 max-w-xl text-lg text-balance text-muted-foreground">
            Releases, new drawings and announcements, newest first.
          </p>
        </header>

        {/*
          The ticks hang in the left margin, outside the column, so the column
          stays centred where the blog's is and the right margin stays empty.
          The margin is the left track of `RAIL_PAGE`, which runs from the site
          container's edge to the column, so the ticks line up with the logo in
          the bar; the reasoning is on the constant. Its padding is the gap
          between the labels and the text.

          It starts at the first release rather than at the top of the page,
          so the first tick stands level with the first entry it marks (a
          line drawn under the header: "alignment issue"). `top-24` is the
          entries' own `scroll-mt-24`, and the 5px is half a tick row against
          half the version badge's 20px: a tick clicked lands its entry's
          badge on the same line the tick stands on.

          From `xl`: the margin beside a 768px column is 256px of room only
          from 1280 up, and a tick column without room for its labels is a
          control nobody can read. Every entry names its own version above
          its title either way.

          "On this page" is the label the install page's and the blog's rails
          wear (Zafar, 24 Sep 2026). It hangs above the ticks, out of the flow,
          so the first tick still stands level with the first entry and a
          clicked tick still lands its badge on its own line; in the flow it
          would have pushed the column down a label's height and broken both.
        */}
        <aside className={RAIL_ASIDE}>
          <div className="sticky top-24 pt-[5px]">
            <ContentsLabel className="absolute bottom-full pb-2" />
            <ReleaseTicks releases={ticks} />
          </div>
        </aside>

        <div className={RAIL_COLUMN}>
          {/*
          Work since the newest tag leads the page because it is what a
          returning reader is looking for, and it is badged "Unreleased" rather
          than by a version, because it does not have one yet: an install of the
          newest release does not contain it.
        */}
          <UnreleasedEntry data={data} />

          {entries.map((entry, i) => (
            <ReleaseEntry
              key={entry.version}
              entry={entry}
              data={data}
              mode={i === 0 && !unreleased ? "open" : "row"}
            />
          ))}
        </div>
      </main>

      <ChangelogHash />
      <SiteFooter />
    </>
  )
}
