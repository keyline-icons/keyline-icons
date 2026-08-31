"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Camera,
  Check,
  ChevronDown,
  Menu,
  PanelLeft,
  Smartphone,
} from "@/components/icons"

import { BrandMark } from "@/components/brand-mark"
import { FigmaLogo, GitHubLogo, XLogo } from "@/components/brand-logos"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShareMenu } from "@/components/share-menu"
import type { ShareCounts } from "@/lib/share"
import { ThemeToggle } from "@/components/theme-toggle"
import { formatStars } from "@/lib/github"
import {
  currentHref,
  SET_FIGMA_PROFILE_URL,
  SET_REPO_URL,
  SET_TITLE,
  SET_X_URL,
  SITE_BAR_LINKS,
  SITE_BAR_MENUS,
  SITE_NAV_LINKS,
} from "@/lib/site-chrome"
import { cn } from "@/lib/utils"

/**
 * Every destination in the bar — and, from the same constant, in the footer.
 * Add a row in `lib/site-chrome.ts` to add a link to both.
 *
 * The bar reads it in two pieces: the routes that stand on their own, and the
 * ones gathered under a menu name. The footer and the sitemap still read the
 * whole flat list, which is the point of grouping in the data rather than here.
 */
const links = SITE_BAR_LINKS
const menus = [...SITE_BAR_MENUS]

/**
 * A glyph per grouped route, keyed by href.
 *
 * It lives here rather than in `lib/site-chrome.ts` because that file is read
 * by `app/sitemap.ts`, and a sitemap has no business importing React
 * components. The mapping is small enough that the indirection costs nothing;
 * an href with no entry simply gets no glyph.
 */
const MENU_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "/demo": PanelLeft,
  "/demo/mobile": Smartphone,
  "/examples": Camera,
}

/**
 * The bar itself. `site-nav.tsx` is the server half that feeds it the count.
 *
 * Split in two because the star count has to be fetched on the server and this
 * half cannot be: it reads `usePathname` and owns a menu. Rather than every
 * page fetching a number and passing it in, the server component wraps this
 * one, so the four pages that render a bar still render `<SiteNav />` and know
 * nothing about GitHub.
 */
export function SiteNavBar({
  stars,
  counts,
}: {
  stars: number | null
  counts: ShareCounts
}) {
  const pathname = usePathname()
  const active = currentHref(pathname)
  const isCurrent = (href: string) => href === active

  return (
    <>
      {/*
        One bar the full width of the window, filled with the page's own
        background.

        It was two floating panels on a transparent rail, frosted over whatever
        scrolled beneath them (`.chrome-panel`, now gone from `globals.css`).
        This is the plainer arrangement: the bar is a surface rather than glass,
        so nothing shows through it and there is no blur to confine to a
        stacking context.

        No bottom border, and no scrim either — the rail never had one and this
        does not gain one. The bar and the page are the same fill, so a rule
        between them would be the only line on a page that has none, and what
        separates them is that content scrolls under the bar and stops.

        `bg-background` rather than a literal white for that reason: it is the
        page's own fill, so the two stay the same material and in dark mode both
        invert together.

        The whole header takes pointer events now. The rail needed
        `pointer-events-none` with `auto` on each panel, because a transparent
        full-width element over the top of the page swallows every click that
        lands between the two pieces. A filled bar is genuinely there, so it
        should catch them.
      */}
      <header className="fixed inset-x-0 top-0 z-30 bg-background">
        {/* The page's exact box, so the two ends line up with the content. */}
        {/*
          The padding collapses with the sidebar's breakpoint: below `lg` the
          browser's controls fold into the Browse drawer and its row sticks
          under this bar, so the bar gives back 16px of the height it spends on
          air. `NAV_HEIGHT` / `NAV_HEIGHT_NARROW` are these two paddings around
          the 44px panel; change one side without the other and everything
          that offsets against the bar lands wrong.
        */}
        <div className="mx-auto flex w-full max-w-360 items-center justify-between px-6 py-1 lg:px-8 lg:py-3">
          {/*
            No panel around the brand any more, but the same 44px: `p-2` around
            a 28px mark is what holds this side of the bar to the height the
            controls opposite set, and `NAV_HEIGHT` still reads 68 because of
            it.
          */}
          {/*
            Home, now that there is one. It pointed at `/icons` for as long as
            the origin was a redirect, which made the brand the only mark on the
            site that did not go to the site's own address.
          */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl p-2 pr-3"
          >
            <BrandMark className="size-7" />
            <span className="text-sm font-medium tracking-tight">
              {SET_TITLE}
            </span>
          </Link>

          {/*
            The group keeps its 4px of padding so the controls in it stay 36px
            inside a 44px row, matching the brand opposite. What it no longer
            has is a fill of its own: on a bar that is already a surface, a
            second surface inside it reads as a panel on a panel.
          */}
          <nav className="flex items-center gap-1 rounded-xl p-1 text-sm">
            <div className="hidden items-center gap-0.5 md:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className={cn(
                    // py-2 rather than a height, so the row matches the CTA's
                    // 36px without either of them being told a number.
                    "rounded-lg px-3 py-2 transition-colors",
                    // A grey chip, not a white one. White was the active fill
                    // while the bar was a tinted panel and the page behind it
                    // was white; on a bar that is now `bg-background` itself,
                    // a white chip is invisible.
                    //
                    // The chip is the only fill among these four, which is why
                    // hovering one of them changes ink and nothing else: give a
                    // hover the same `--muted` and every link you pass over
                    // looks like the page you are on. The marks to their right
                    // do take a fill on hover, because they have no text to
                    // change and nothing else would say where the target is.
                    //
                    // Fill only either way, and no ring or shadow on anything in
                    // this bar.
                    isCurrent(link.href)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/*
                The grouped routes, one menu each. Today that is "Examples" over
                the two demos.

                The trigger lights as the current page whenever anything inside
                it is, so the bar still says where you are with the menu shut,
                and `button.tsx`'s `aria-expanded` styling lights it while open
                — the same idiom every other menu trigger on the site uses.

                The menu is wider than its trigger, which is the one thing to
                know if another is added: `DropdownMenuContent` defaults to
                `w-(--anchor-width)`, so a popup carrying descriptions has to say
                a width or it comes out as narrow as the word "Examples".
              */}
              {menus.map(([name, entries]) => {
                const inMenu = entries.some((entry) => isCurrent(entry.href))

                return (
                  <DropdownMenu key={name}>
                    <DropdownMenuTrigger
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-3 py-2 transition-colors",
                        inMenu
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground data-[popup-open]:text-foreground"
                      )}
                    >
                      {name}
                      <ChevronDown className="size-3.5 opacity-60" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-72">
                      {entries.map((entry) => {
                        const Icon = MENU_ICONS[entry.href]

                        return (
                          <DropdownMenuItem
                            key={entry.href}
                            render={<Link href={entry.href} />}
                            // `items-start` and the padding: a row with two
                            // lines in it is no longer a menu item's default
                            // shape, and centred glyphs float beside the gap
                            // between the lines rather than sitting with the
                            // name.
                            className="items-start gap-3 p-2"
                          >
                            {Icon && (
                              <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                            )}
                            {/*
                              `min-w-0`, or the description does not wrap: a
                              flex child sizes to its max-content by default, so
                              the sentence runs past the popup's edge and is
                              clipped instead of breaking onto a second line.
                            */}
                            <span className="flex min-w-0 flex-col gap-0.5">
                              <span className="flex items-center gap-2 leading-none">
                                {entry.label}
                                {isCurrent(entry.href) && (
                                  <Check
                                    aria-hidden="true"
                                    className="size-3.5 text-muted-foreground"
                                  />
                                )}
                              </span>
                              {entry.description && (
                                <span className="text-xs leading-snug text-muted-foreground">
                                  {entry.description}
                                </span>
                              )}
                            </span>
                          </DropdownMenuItem>
                        )
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              })}

              {/*
                A hairline, not a gap: the pages and the two outbound links are
                different kinds of destination, and without something between
                them the X mark reads as a fifth page. `h-5` against 36px
                controls leaves the rule clearly shorter than what it separates,
                which is what stops it reading as a border.
              */}
              <span
                aria-hidden="true"
                className="mx-1.5 h-5 w-px shrink-0 bg-border"
              />

              {/*
                The outbound links are icon-only, so the accessible name is the
                only name they have. It states the destination and the new tab,
                because the marks carry `aria-hidden` and contribute nothing.

                All three take a `--muted` fill on hover, unlike the page links
                to their left. A colour change alone left the target ambiguous,
                because these buttons carry no label and no border, so nothing
                said where one ended and the next began until the cursor was on
                it. The fill is also the only hover the Figma mark can take: its
                five brand colours cannot shift with the row, but the box behind
                them can.

                Note that `--accent` and `--secondary` are both the same value
                as `--muted` in this theme, so the stock `hover:bg-accent` would
                be a no-op here and is not what these use.
              */}
              <a
                href={SET_X_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on X (opens in a new tab)"
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <XLogo className="size-4" />
              </a>

              {/*
                The count sits inside the link rather than beside it, so the
                number is part of the same target and the pair cannot be split
                across a wrap.

                `stars` is null whenever GitHub does not answer, which since
                the repo went public is a rate limit rather than the 404 a
                private repo used to return. It is common in `next dev` and
                rare in production; see the note on `repoStars`.

                The link stays either way, and with the count gone the padded
                box measures exactly 36px, the same square as the X mark next
                to it. So the null state is a layout the bar already wears
                rather than a hole in it.
              */}
              <a
                href={SET_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  stars === null
                    ? "View the source on GitHub (opens in a new tab)"
                    : `Star on GitHub, ${stars} stars (opens in a new tab)`
                }
                className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <GitHubLogo className="size-4" />
                {stars !== null && (
                  // `tabular-nums` so a count ticking over from 999 to 1k does
                  // not resize the bar under the cursor.
                  <span aria-hidden="true" className="tabular-nums">
                    {formatStars(stars)}
                  </span>
                )}
              </a>

              {/*
                The Figma profile, which is where the drawings come from. Not
                `SET_FIGMA_URL`: that constant is the published Community file,
                it is still empty, and the icon page's button is what waits on
                it.

                Last in the group, and the only mark here that keeps its own
                colours — see `brand-logos.tsx` for why it cannot be drawn in
                one ink. The mark itself therefore does not respond to hover;
                the fill behind it does, which is the same fill the other two
                take, so the three read as one row of controls despite one of
                them being in colour.

                At the end of the row that spot of colour reads as a logo;
                between two grey marks it reads as the one control that is lit
                up.
              */}
              <a
                href={SET_FIGMA_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Figma profile (opens in a new tab)"
                className="flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-muted"
              >
                <FigmaLogo className="size-4" />
              </a>
            </div>

            {/*
              A second hairline, and the same one: the three marks above point
              at us, this points at whoever is reading. Only at `md` and up,
              because below it the marks are in the phone's menu and there is
              nothing on this side of the rule to separate from.
            */}
            <span
              aria-hidden="true"
              className="mx-1.5 hidden h-5 w-px shrink-0 bg-border md:block"
            />

            {/*
              Outside the `md:` group on purpose, unlike everything above it.

              That group is the bar's link row and it folds into the phone's
              menu whole. This is not a link, it is the one thing on the bar
              asking the reader to do something, and an ask that disappears
              below `md` is an ask missed by every visitor who found the set on
              a phone, which is most of them.
            */}
            <ShareMenu counts={counts} />

            {/* The link row is gone below md, so it needs a way back. */}
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Menu"
                // The same square and the same hover as the three marks above,
                // which it never shares a row with: it is the phone's version
                // of that group, so it should not be the one icon button in the
                // bar that behaves differently.
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
              >
                <Menu className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {/*
                  Every route the bar offers, flat. The grouping upstairs is a
                  way of spending horizontal room this menu does not lack:
                  nesting a submenu inside a menu to save two rows would cost a
                  tap to reach either demo.

                  `SITE_NAV_LINKS` rather than the whole list, so the home row
                  stays out of here for the same reason it stays out of the bar:
                  the brand is two inches to the left, on screen, at all times.
                */}
                {SITE_NAV_LINKS.map((link) => (
                  <DropdownMenuItem
                    key={link.href}
                    render={<Link href={link.href} />}
                  >
                    {link.label}
                    {isCurrent(link.href) && (
                      <Check
                        aria-hidden="true"
                        className="ml-auto size-4 text-muted-foreground"
                      />
                    )}
                  </DropdownMenuItem>
                ))}

                {/*
                  The outbound pair again, because the row that holds them is
                  `md:` only and this menu is the whole bar below that. Left out,
                  X and the repo would be reachable on a desktop and nowhere at
                  all on a phone.

                  Labelled here rather than icon-only: a menu row has the space
                  for a word, and "GitHub" plus a count says what the number is
                  counting, which the bar's version leaves to its aria-label.
                */}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  render={
                    <a
                      href={SET_X_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <XLogo className="size-4 text-muted-foreground" />X
                  <span className="sr-only">{" (opens in a new tab)"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={
                    <a
                      href={SET_REPO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <GitHubLogo className="size-4 text-muted-foreground" />
                  GitHub
                  {stars !== null && (
                    <span className="ml-auto text-muted-foreground tabular-nums">
                      {formatStars(stars)}
                    </span>
                  )}
                  <span className="sr-only">{" (opens in a new tab)"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={
                    <a
                      href={SET_FIGMA_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <FigmaLogo className="size-4" />
                  Figma
                  <span className="sr-only">{" (opens in a new tab)"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/*
              The end of the bar, and the only control in it that is for the
              reader rather than for us.

              A primary button stood here: "Sponsor", and "Get started" before
              that. The first pointed at the grid one scroll below the bar on
              the page most visitors are already on; the second is a real ask,
              and a one-word ask in the loudest control on the page is the
              weakest way to make it. Both are gone. Sponsorship now asks in the
              closing block of the landing page, in `app/page.tsx`, alongside
              the licence, where it has room for the sentence that explains it.

              So the bar carries no primary at all now, deliberately. Nothing
              here is trying to be clicked before anything else.
            */}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/*
        `fixed` takes the bar out of flow, so nothing below it knows it is
        there. This holds its height open on every page that renders the nav,
        rather than each of them remembering to pad its own top.

        Classes rather than `NAV_HEIGHT` inline, because the height is a media
        query now: 52px below `lg`, 68 above, matching the bar's own `py-1
        lg:py-3`. The constants still carry the numbers for everything that has
        to scroll against them.
      */}
      <div aria-hidden="true" className="h-13 lg:h-17" />
    </>
  )
}
