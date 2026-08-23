"use client"

import { ArrowUpRight, Share } from "@/components/icons"
import {
  BlueskyLogo,
  LinkedInLogo,
  RedditLogo,
  ThreadsLogo,
  XLogo,
} from "@/components/brand-logos"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SITE_URL } from "@/lib/seo"
import {
  shareCopy,
  SHARE_TARGETS,
  type ShareCounts,
  type ShareTarget,
} from "@/lib/share"
import { cn } from "@/lib/utils"

/**
 * A mark per network, keyed by `ShareTarget["id"]`.
 *
 * Here rather than in `lib/share.ts` for the reason `MENU_ICONS` in
 * `site-nav-bar.tsx` gives: that file is plain data and a plain-data module has
 * no business importing React components. The `Record` is typed against the id
 * union, so adding a network to the list without a mark is a type error rather
 * than an `<undefined />` at runtime, which is the failure mode the category
 * rail shipped once and took the whole page down with.
 */
const LOGOS: Record<
  ShareTarget["id"],
  // The marks' own prop type, rather than the `{ className }` the bar's
  // `MENU_ICONS` narrows to. These take a `style` as well, which is how the
  // hover tint reaches them, and a narrowed type would reject it.
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  x: XLogo,
  threads: ThreadsLogo,
  bluesky: BlueskyLogo,
  linkedin: LinkedInLogo,
  reddit: RedditLogo,
}

/**
 * What every row posts: the site's front door, on every page.
 *
 * **Deliberately not the page the reader is on.** This shared the current
 * route first, on the reasoning that someone opening the menu from
 * `/icons/bell-x` means to post that drawing, and that every route has its own
 * card art anyway. In practice the deep links previewed badly: the composers
 * fell back to a small generic thumbnail instead of the card, so a shared icon
 * page arrived looking like a broken link rather than like an icon set.
 *
 * A link that previews badly is worse than a link that goes one level up. The
 * root is the one route whose card is known good, and it is also the page that
 * makes the case for the set, which is what a share is for. Someone who wants
 * a specific drawing can search for it in two seconds from here.
 *
 * `SITE_URL` rather than `window.location.origin`, and rather than the same
 * address typed out again: the origin has to be the canonical one, or a share
 * fired from a preview deployment or from `localhost` posts an address nobody
 * else can open. No trailing slash, for the reason `absoluteUrl` strips it,
 * so what gets posted is character-for-character the URL the homepage declares
 * canonical.
 */
const SHARE_URL = SITE_URL

/**
 * The bar's share control: a button, and five networks under it.
 *
 * It sits outside the bar's `md:` link group, so it is on screen at every
 * width. The three marks beside it are follow links and fold into the phone's
 * menu when the row does; this is an action, and an action that only exists on
 * a desktop is an action missed by every reader who found the set on a phone.
 *
 * **No primary treatment, deliberately.** The bar carries no primary button at
 * all, and this does not become the exception: it takes the same `--muted`
 * hover as the outbound marks, no ring and no shadow, which is the one fill
 * idiom the bar has. Nothing here is louder than the page.
 *
 * **And no motion of its own.** This was built with a sprung glyph on the
 * trigger, a staggered cascade on the rows, and each mark scaling and its label
 * sliding on hover. All of it came out at the user's request. What is left is
 * the site's ordinary `transition-colors`, the same as every other control in
 * the bar.
 *
 * The popup still fades and zooms as it opens. That belongs to
 * `dropdown-menu.tsx` and is shared with the Examples menu and the phone's
 * menu, so it is not this component's to remove: taking it out here would mean
 * either overriding one menu into behaving unlike the other two, or changing
 * every menu on the site.
 */
export function ShareMenu({ counts }: { counts: ShareCounts }) {
  /*
    Built once per render rather than per row, because five rows asking for the
    same sentence is five identical strings and the two that differ are already
    split inside `shareCopy`.
  */
  const copy = shareCopy(counts)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Share Keyline Icons"
        className={cn(
          // The same 36px square, the same radius and the same hover as the X
          // and Figma marks three places to the left. It carried a "Share" word
          // and a wider box at `md` and up, which made it the one control in the
          // bar shouting; icon-only, it is a fourth mark in a row of marks.
          //
          // Icon-only also means the `aria-label` is the whole accessible name,
          // which is why it names the set rather than saying "Share this page":
          // every row posts the site's front door, whatever page it is opened
          // from.
          "flex size-9 items-center justify-center rounded-lg",
          "text-muted-foreground transition-colors",
          "hover:bg-muted hover:text-foreground",
          // The trigger stays lit while its popup is open, which is the idiom
          // every other menu trigger on the site uses. `button.tsx` hangs it
          // off `aria-expanded`; this is a bare button rather than a `Button`,
          // so it states the same thing itself.
          "data-[popup-open]:bg-muted data-[popup-open]:text-foreground"
        )}
      >
        <Share className="size-4" />
      </DropdownMenuTrigger>

      {/*
        The group is not decoration. `DropdownMenuLabel` is Base UI's
        `Menu.GroupLabel`, and that part throws outright if it cannot find a
        `Menu.Group` above it: "MenuGroupContext is missing", which takes the
        whole page down rather than degrading to an unlabelled row. A label
        names a group, so a label with no group is a contract violation and Base
        UI treats it as one. It also earns its keep, since the rows below get
        `role="group"` with this label as their accessible name.
      */}
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Spread the word</DropdownMenuLabel>

          {SHARE_TARGETS.map((target) => {
            const Logo = LOGOS[target.id]

            return (
              <DropdownMenuItem
                key={target.id}
                render={
                  <a
                    href={target.href(SHARE_URL, copy)}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                style={
                  {
                    // The two halves of the tint, as a light/dark pair. An
                    // inline value cannot carry a media query, so both are set
                    // here and the classes below pick one.
                    "--brand": target.ink[0],
                    "--brand-dark": target.ink[1],
                  } as React.CSSProperties
                }
                className={cn(
                  "group/share gap-2.5 px-2 py-1.5",
                  // The mark's ink, swapped here rather than on the mark itself,
                  // and this is the whole reason the tint works at all.
                  //
                  // `dropdown-menu.tsx`'s item carries
                  // `focus:**:text-accent-foreground`, which repaints *every*
                  // descendant of a highlighted row. That selector is a class
                  // plus an attribute plus a pseudo-class, so it outranks any
                  // `text-…` utility on the mark, and the brand colour was being
                  // applied and then overwritten with no warning at all.
                  //
                  // A custom property is not in that fight. Nothing repaints
                  // `--mark-ink`, the mark reads it through an inline `color`
                  // which beats every class rule in the cascade, and the value
                  // itself is what changes on hover.
                  //
                  // `focus` as well as `hover`, and it is the load-bearing one:
                  // Base UI moves real DOM focus onto the row the pointer is
                  // over, which is how `dropdown-menu.tsx`'s own
                  // `focus:bg-accent` lights a hovered row. Keyboard arrows land
                  // on the same state, so a reader stepping down the list gets
                  // the same colour the mouse does.
                  "[--mark-ink:var(--color-muted-foreground)]",
                  "hover:[--mark-ink:var(--brand)] focus:[--mark-ink:var(--brand)]",
                  "dark:hover:[--mark-ink:var(--brand-dark)] dark:focus:[--mark-ink:var(--brand-dark)]"
                )}
              >
                {/*
                  The mark takes its own brand colour, which is only possible
                  because all five are single-ink paths on `currentColor`.
                  Figma's and Paper's marks could not do this.

                  `color` inline rather than a `text-…` utility: see the row's
                  `--mark-ink` note above for why a class loses here.
                */}
                <Logo style={{ color: "var(--mark-ink)" }} className="size-4" />
                {target.label}
                {/*
                  Every row opens a composer on someone else's site, and this is
                  what says so before the click rather than after it.

                  On hover and on focus only, so five arrows do not sit in the
                  menu at rest competing with five brand marks for the same
                  glance. It appears and disappears with no transition and no
                  travel: it slid in from `-translate-x-1` originally, and that
                  went with the rest of the motion.

                  `aria-hidden` by way of the shared `Icon` wrapper, with the
                  sentence below carrying the fact in words. An arrow is a
                  picture of "this leaves the site", and a picture reaches a
                  screen reader as nothing at all.
                */}
                <ArrowUpRight
                  className={cn(
                    "ml-auto size-3.5 text-muted-foreground opacity-0",
                    "group-hover/share:opacity-60 group-focus/share:opacity-60"
                  )}
                />
                <span className="sr-only">{" (opens in a new tab)"}</span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
