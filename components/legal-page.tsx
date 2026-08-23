import Link from "next/link"

import { SITE_LEGAL_LINKS } from "@/lib/site-chrome"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { ArrowUpRight } from "@/components/icons"

/**
 * The frame the three legal pages share: `/legal/terms`, `/legal/privacy` and
 * `/legal/license`.
 *
 * They are one shape written once rather than three pages that happen to look
 * alike, because the thing that actually matters about them is consistency. A
 * reader arriving at a privacy policy is checking whether the site is straight
 * with them, and three near-identical pages laid out three slightly different
 * ways is the first thing that says it is not.
 *
 * It is the install page's measure and section rhythm, `max-w-3xl` with
 * `border-t pt-10` sections in a `gap-10` column, because these are the same
 * kind of page: prose someone reads a paragraph of and then leaves. The one
 * addition is the date, which prose pages do not carry and legal ones must.
 */

/**
 * "23 Aug 2026", in the same words `pipeline/build-history.mjs` prints for an
 * icon's dates, so the site speaks one date language.
 *
 * Formatted here rather than in the browser, and with the locale and time zone
 * both named: `toLocaleDateString` answers differently per machine, which is a
 * hydration mismatch waiting for the first reader outside `en-GB`. These pages
 * are server components and prerender, so this runs at build and the string is
 * simply in the HTML.
 */
function legalDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso))
}

/**
 * One heading and its prose. Identical to the install page's `Section`, kept
 * separate rather than shared because that one is local to a page about code
 * and this one is about to grow a list style that page has no use for.
 */
export function LegalSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t pt-10">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

/**
 * A bulleted list inside a `LegalSection`, at the section's own ink.
 *
 * `list-disc` on its own indents the marker outside the text column and hangs
 * it in the page's left margin, which reads as a broken indent against prose
 * that starts at the container edge. `pl-5` puts the text where the paragraphs
 * above it start and the marker inside the measure.
 */
export function LegalList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-muted-foreground/60">
      {children}
    </ul>
  )
}

/**
 * A link in legal prose, internal or outbound, decided by the href.
 *
 * These three pages link out more than any other page on the site: to the
 * canonical licence text, to the repo, to the issue tracker, to every platform
 * the set is also published on. Written as anchors at each call site, that is
 * roughly twenty chances to forget the `rel`, the new-tab warning or the arrow,
 * and the failure is invisible in a screenshot.
 *
 * The arrow and the warning are the install page's pattern, not a new one. The
 * footer deliberately drops the arrow because every link in that row leaves the
 * site; here they are mixed in with internal ones, so the mark is the only thing
 * distinguishing them.
 */
export function LegalLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        className="underline underline-offset-2 hover:text-foreground"
      >
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-foreground"
    >
      {children}
      <ArrowUpRight className="size-3" />
      {/*
        Written as an expression because JSX strips whitespace against a
        newline, and without it the accessible name reads
        "repository(opens in a new tab)".
      */}
      <span className="sr-only">{" (opens in a new tab)"}</span>
    </a>
  )
}

export function LegalPage({
  path,
  title,
  /** ISO date these terms last *changed*, not when the file was last touched. */
  updated,
  children,
}: {
  path: string
  title: string
  updated: string
  children: React.ReactNode
}) {
  /*
    The other two legal pages, so each one is a click from the others. A reader
    who wants to know what happens to their data usually wants to know what
    they may do with the drawings in the same sitting, and the footer's row is
    small print at the bottom of a long page.

    Derived from `SITE_LEGAL_LINKS` rather than listed, for the same reason the
    sitemap derives from `SITE_LINKS`: a fourth legal page would otherwise be
    linked from the footer and invisible from its own siblings.
  */
  const siblings = SITE_LEGAL_LINKS.filter((link) => link.href !== path)

  return (
    <>
      <SiteNav />

      <main className="mx-auto w-full max-w-3xl px-6 pb-16 lg:px-8">
        <header className="pt-6 pb-12">
          <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
          {/*
            No standing paragraph under the heading, unlike `/changelog` and
            `/install`, which both carry one. Removed at the author's request
            after all three had one, and the reason it works here is that a
            legal page's first section is already its summary: "What this
            covers" says what the page is in a sentence, so a lead above it was
            the same sentence twice in two sizes.
          */}
          {/*
            The date is a fact about the document and belongs at the top of it,
            where a reader checking whether this was written before or after
            something they read elsewhere will look for it. `dateTime` carries
            the ISO form for anything parsing the page.
          */}
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated <time dateTime={updated}>{legalDate(updated)}</time>
          </p>
        </header>

        <div className="flex flex-col gap-10">{children}</div>

        <nav
          aria-label="Legal"
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-8 text-sm"
        >
          {siblings.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </main>

      <SiteFooter />
    </>
  )
}
