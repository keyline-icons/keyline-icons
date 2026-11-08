import Link from "next/link"
import { notFound } from "next/navigation"

import { ArrowLeft, ArrowRight } from "@/components/icons"
import {
  counted,
  headline,
  release,
  releaseHref,
  ReleaseEntry,
} from "@/components/changelog-release"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { SET_RELEASES } from "@/lib/icons"
import { pageMetadata } from "@/lib/seo"
import { RAIL_COLUMN, RAIL_PAGE } from "@/lib/site-chrome"

/**
 * One release at its own address, with every drawing it added or changed.
 *
 * An address per release rather than pages of the list, because a page number
 * moves: each new release would push the old ones onto a later page and change
 * the URL Google had indexed them under. `v1.0.0` means the same thing forever.
 *
 * `dynamicParams` shuts the route to anything that was never cut, so a made-up
 * version is a real 404 rather than an empty release.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return SET_RELEASES.map(({ version }) => ({ version: `v${version}` }))
}

type Props = { params: Promise<{ version: string }> }

async function find(param: string) {
  const data = await release()
  const index = data.entries.findIndex((entry) => `v${entry.version}` === param)
  return { data, index, entry: data.entries[index] }
}

export async function generateMetadata({ params }: Props) {
  const { entry } = await find((await params).version)
  if (!entry) return {}

  return pageMetadata({
    path: releaseHref(entry.version),
    // Absolute, because the heading already leads with the set's name and the
    // layout's template would print it twice. Word for word the `h1`.
    title: { absolute: headline(entry.version, entry.title) },
    description: counted(entry),
  })
}

const NEIGHBOUR =
  "inline-flex items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:underline"

export default async function Page({ params }: Props) {
  const { data, index, entry } = await find((await params).version)
  if (!entry) notFound()

  // Newest first, so the entry before this one in the list is the newer.
  const newer = data.entries[index - 1]
  const older = data.entries[index + 1]

  return (
    <>
      <SiteNav />

      <main className={RAIL_PAGE}>
        <div className={`${RAIL_COLUMN} pt-6`}>
          <Link
            href="/changelog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All releases
          </Link>

          <div className="mt-8">
            <ReleaseEntry entry={entry} data={data} mode="page" />
          </div>

          <nav
            aria-label="Other releases"
            className="flex items-center justify-between gap-6 text-sm"
          >
            {newer ? (
              <Link
                href={releaseHref(newer.version)}
                prefetch={false}
                className={NEIGHBOUR}
              >
                <ArrowLeft aria-hidden="true" className="size-3.5" />v
                {newer.version}
              </Link>
            ) : (
              <span />
            )}
            {older && (
              <Link
                href={releaseHref(older.version)}
                prefetch={false}
                className={NEIGHBOUR}
              >
                v{older.version}
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </Link>
            )}
          </nav>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
