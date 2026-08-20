import Link from "next/link"

import { BrandMark } from "@/components/brand-mark"
import { FigmaLogo, XLogo } from "@/components/brand-logos"
import {
  SET_FIGMA_PROFILE_URL,
  SET_LICENSE_NAME,
  SET_LICENSE_URL,
  SET_REPO_URL,
  SET_SPONSOR_URL,
  SET_TITLE,
  SET_X_URL,
  SITE_LINKS,
} from "@/lib/site-chrome"

/**
 * The destinations that leave the site, in the order the bar puts them.
 *
 * Written as a list because they differ only by a URL and a name; four copies
 * of the same anchor is four places to forget the `rel` or the new-tab warning.
 *
 * Two of them draw a mark instead of their name, and the rule is whether the
 * name survives being read on its own. "GitHub" and "Sponsor" do. "X" does not:
 * one letter in a row of words is a typo, not a company, which is the whole
 * reason that mark exists. Figma is a mark for the same reason the bar's are,
 * plus one of its own — five brand colours say "design file" at a glance in a
 * row that is otherwise all grey.
 *
 * A mark's name still goes to screen readers, so nothing is lost by dropping
 * the visible word.
 *
 * Not shared with the bar, which draws every one of these as a mark and spends
 * its primary button on the sponsor link. The shared part is the URLs, and
 * those already are shared.
 */
const OUTBOUND: {
  href: string
  label: string
  logo?: (props: { className?: string }) => React.ReactElement
}[] = [
  { href: SET_REPO_URL, label: "GitHub" },
  { href: SET_X_URL, label: "X", logo: XLogo },
  // The profile, not `SET_FIGMA_URL`. See the note on both constants: this row
  // says where the drawings come from, while that one is the published file and
  // is still empty.
  { href: SET_FIGMA_PROFILE_URL, label: "Figma", logo: FigmaLogo },
  { href: SET_SPONSOR_URL, label: "Sponsor" },
]

/**
 * The page's bottom edge: the mark, the same links the bar carries, and the
 * year.
 *
 * shadcn/ui has no footer — not a component and not a block — so this is built
 * out of the primitives rather than installed. That is worth saying here
 * because the obvious next move on any missing piece of chrome is `npx shadcn
 * add`, and for this one it silently pulls a third-party registry's house style
 * into a site that has its own.
 *
 * It is a server component: nothing here reacts, and the year comes from the
 * server so no client ever has to correct it. That also means the routes that
 * prerender bake their build year — right for as long as the site is deployed
 * more than once a year, which it is.
 *
 * No rules and no fill. The bar has the same nothing along its bottom edge: the
 * page is meant to run clean, and the space above the mark separates the footer
 * from the content by itself. Its box is the page
 * container repeated exactly — padding inside `max-w-360` — because anything
 * else drifts from the content above it past 1440px.
 */
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    // `mt-auto` against the layout's `min-h-svh` column: the gap above the
    // footer is padding, so a short page pushes it to the bottom of the window
    // instead of leaving the rest of the viewport empty beneath it.
    <footer className="mt-auto pt-20 lg:pt-28">
      {/*
        No sponsor block here. It was rendered from the footer for a while,
        which put it on every page that has one, and that is the wrong shape for
        an ask: repeated at the foot of the browser, of `/install` and of all
        414 icon pages, it stops being a request and becomes furniture. It lives
        on `app/page.tsx` alone now — the page someone reads to decide what this
        set is, which is where the case for keeping it free belongs.

        The footer still carries a plain "Sponsor" link in the row below, which
        is the right weight for a link that has to be on every page.
      */}
      <div className="mx-auto w-full max-w-360 px-6 lg:px-8">
        <div className="flex flex-col gap-8 pb-10 md:flex-row md:items-center md:justify-between">
          {/*
            The mark and the year as one block, so the line reads as the
            wordmark's own small print rather than as a separate band.
          */}
          <div>
            {/* The bar's brand without its panel — same mark, same 28px, and
                the same destination: the landing page, now that `/` renders
                one rather than forwarding to the browser. */}
            <Link href="/" className="flex items-center gap-2">
              <BrandMark className="size-7" />
              <span className="text-sm font-medium tracking-tight">
                {SET_TITLE}
              </span>
            </Link>

            {/*
              "All rights reserved" was the line here, and it was the only
              legal statement on the site, which made "free icons" in the
              search copy a promise the page then contradicted in its own
              small print.

              A copyright notice is not in tension with MIT; MIT requires one.
              It works by the holder keeping copyright and granting permission,
              and its own text says the notice travels with every copy. So the
              © stays, the holder is the same name `LICENSE` carries, and the ™
              stays because MIT grants rights in the code and none in what the
              set is called.

              The licence still links to the canonical text rather than to this
              repo's own `LICENSE`, because that is the actual grant. The repo
              itself now has a link of its own in the row opposite, which it
              could not have while its URL carried a personal handle instead of
              the organisation's name.
            */}
            <p className="mt-3 text-xs text-muted-foreground">
              © {year} {SET_TITLE}™. Free under the{" "}
              {/*
                No new-tab arrow, here or in the row opposite. Every outbound
                link in this footer leaves the site, so the glyph marked all of
                them and distinguished none, and four of them in one short band
                read as decoration.

                The warning stays for screen readers, which is the part that
                was ever doing work: sighted readers get it from the browser,
                and the arrow only ever repeated it.
              */}
              <a
                href={SET_LICENSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-foreground"
              >
                {SET_LICENSE_NAME}
                {/*
                  The leading space is written as an expression because JSX
                  strips whitespace that sits against a newline, and without it
                  the accessible name runs together as
                  "MIT License(opens in a new tab)".
                */}
                <span className="sr-only">{" (opens in a new tab)"}</span>
              </a>
              .
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
          >
            {SITE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            {/*
              Deliberately not rows in `SITE_LINKS`. That list is also what
              `app/sitemap.ts` reads, and a sitemap is only allowed to name URLs
              on its own origin: adding the repo there would put a github.com
              entry in it and invalidate the file. External destinations belong
              in the markup that renders them.

              Plain anchors rather than `Link`s for the same reason, and the
              screen-reader warning matches the licence link above.

              The same three the bar carries, in the same order, because a
              footer that offers less than the chrome above it is the reason
              people scroll back up.
            */}
            {OUTBOUND.map(({ href, label, logo: Logo }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-muted-foreground transition-colors hover:text-foreground"
              >
                {/*
                  `size-4` against a 14px row: a mark reads at the size of the
                  words beside it rather than at their cap height, or it sits in
                  the line looking shrunken. The Figma mark is taller than it is
                  wide and keeps its aspect inside that box, so it comes out
                  narrower than the square, which is correct for the mark.
                */}
                {Logo ? <Logo className="size-4" /> : label}
                {/*
                  The name a mark does not say out loud, plus the new-tab
                  warning both kinds need. Written as one string so the
                  accessible name cannot run its words together.
                */}
                <span className="sr-only">
                  {Logo
                    ? `${label} (opens in a new tab)`
                    : " (opens in a new tab)"}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
