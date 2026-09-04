"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import * as React from "react"

import {
  BlueskyLogo,
  LinkedInLogo,
  RedditLogo,
  ThreadsLogo,
  XLogo,
} from "@/components/brand-logos"
import { Check, Link as LinkIcon, Share } from "@/components/icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { track } from "@/lib/analytics"
import { homeCardDescription, homeCardTitle } from "@/lib/seo"
import {
  shareCopy,
  SHARE_DOMAIN,
  SHARE_TARGETS,
  SHARE_URL,
  type ShareCopy,
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
  // brand tint reaches them, and a narrowed type would reject it.
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  x: XLogo,
  threads: ThreadsLogo,
  bluesky: BlueskyLogo,
  linkedin: LinkedInLogo,
  reddit: RedditLogo,
}

/**
 * The card art, at the address the networks themselves fetch it from.
 *
 * `app/opengraph-image.tsx` is a file convention, and the route it generates is
 * this path. Pointing the preview at it rather than at a picture of it is the
 * whole reason the preview can be trusted: change the card and this changes
 * with it, and a card that has stopped rendering shows up here as a hole rather
 * than as a stale PNG that keeps looking right.
 */
const CARD_IMAGE = "/opengraph-image"

/**
 * How wide the art is actually painted, for `next/image` to size against.
 *
 * The panel is `max-w-md`, less its own padding and the mock card's, which
 * lands a little under 400. One value rather than a breakpoint list, because
 * below that width the panel is the viewport and the difference is a few dozen
 * pixels of a picture nobody is measuring.
 */
const CARD_SIZES = "(max-width: 28rem) 100vw, 400px"

/** The column: a circle, a word under it, and the focus ring around both. */
const SHARE_BUTTON = cn(
  "flex flex-col items-center gap-1.5 rounded-lg py-2 outline-none",
  "focus-visible:ring-3 focus-visible:ring-ring/50",
  // The fill of the circle below, as a property rather than a class, so the
  // button's own `hover:` and its active branch can both reach inside it
  // without a `group/` variant on every child.
  "[--share-circle:var(--color-muted)] hover:[--share-circle:var(--color-muted-hover)]"
)

const SHARE_CIRCLE =
  "flex size-11 items-center justify-center rounded-full bg-(--share-circle) transition-colors"

const SHARE_LABEL = "text-[11px] whitespace-nowrap text-muted-foreground"

/**
 * The share control: a button in the bar, and a modal behind it.
 *
 * It sits outside the bar's `md:` link group, so it is on screen at every
 * width. The three marks beside it are follow links and fold into the phone's
 * menu when the row does; this is an action, and an action that only exists on
 * a desktop is an action missed by every reader who found the set on a phone.
 *
 * **A dialog rather than the dropdown it was.** The menu was five rows of
 * label and mark, which is a list of destinations and says nothing about what
 * arrives at one. The five networks do not render a link alike, and the
 * differences are not small: X prints the card image with the address on it and
 * no headline at all, LinkedIn takes no sentence from us and builds the whole
 * post out of the page's own tags, Reddit's headline *is* the post. A row in a
 * menu cannot show any of that. A panel with room for the post in it can, which
 * is what the preview above the row is.
 *
 * **No primary treatment, deliberately.** The bar carries no primary button at
 * all, and the trigger does not become the exception: it takes the same
 * `--muted` hover as the outbound marks, no ring and no shadow, which is the
 * one fill idiom the bar has. Nothing here is louder than the page.
 */
export function ShareDialog({ counts }: { counts: ShareCounts }) {
  /*
    Built once per render rather than per network, because five buttons asking
    for the same sentence is five identical strings and the two that differ are
    already split inside `shareCopy`.
  */
  const copy = shareCopy(counts)

  /*
    Where the reader was, not what they shared. Every network posts the site's
    front door whatever page the dialog is opened from, so the URL is a constant
    and the only thing worth recording is which page persuaded them to reach for
    this.
  */
  const page = usePathname()

  /*
    Which network the preview is showing.

    The id rather than the target itself: it is the stable key, it is what the
    analytics already count by, and holding the object would mean two things in
    state that have to agree. First in the list is the default, so the panel
    opens on a real preview rather than on an empty frame asking to be hovered.
  */
  const [previewing, setPreviewing] = React.useState<ShareTarget["id"]>(
    SHARE_TARGETS[0].id
  )
  const target =
    SHARE_TARGETS.find((t) => t.id === previewing) ?? SHARE_TARGETS[0]

  const [copied, setCopied] = React.useState(false)

  /*
    Awaited, and both the tick and the event wait on the write resolving. A copy
    the clipboard refused is the one case where the reader wanted the link and
    did not get it, and a button that says "Copied" over an empty clipboard is
    worse than one that does nothing.

    A refusal is silent rather than reported, which is `install-terminal.tsx`'s
    answer to the same question and is here for the same reason: `Toaster` is
    mounted on the browser and the icon pages, and this control is in the bar on
    every route there is. A toast fired from the homepage would be swallowed
    with nothing logged, so the choice is not between silence and a message, it
    is between silence everywhere and a message on the two routes that happen to
    mount one.

    The tick returns to the link glyph on its own, because a button stuck on
    "Copied" cannot say it a second time, and the second time is exactly when
    someone doubts the first.
  */
  const copyLink = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
      track("share_copy", { page })
    } catch {
      setCopied(false)
    }
  }, [page])

  return (
    <Dialog
      /*
        Only the opening. Base UI fires this on both edges, and a close is not a
        second act of interest: counting it would double every share and make
        the click-through rate read as half what it is.
      */
      onOpenChange={(open) => {
        if (open) track("share_open", { page })
      }}
    >
      <DialogTrigger
        aria-label="Share Keyline Icons"
        className={cn(
          // The same 36px square, the same radius and the same hover as the X
          // and Figma marks three places to the left. It carried a "Share" word
          // and a wider box at `md` and up, which made it the one control in the
          // bar shouting; icon-only, it is a fourth mark in a row of marks.
          //
          // Icon-only also means the `aria-label` is the whole accessible name,
          // which is why it names the set rather than saying "Share this page":
          // every network is handed the site's front door, whatever page the
          // dialog is opened from.
          "flex size-9 items-center justify-center rounded-lg",
          "text-muted-foreground transition-colors",
          "hover:bg-muted hover:text-foreground",
          // The trigger stays lit while its panel is open, which is the idiom
          // every other popup trigger on the site uses. Base UI hangs it off
          // `data-popup-open` on a dialog trigger exactly as it does on a menu
          // one, so the class is the same in both places.
          "data-[popup-open]:bg-muted data-[popup-open]:text-foreground"
        )}
      >
        <Share className="size-4" />
      </DialogTrigger>

      {/*
        Three bands rather than one padded box, which is why the panel keeps
        neither padding nor gap of its own: each band carries its own, and the
        grey one has to reach both edges to read as a surface rather than as a
        panel inside a panel.

        No rules between them either. The fill is the division: white, grey,
        white is already three bands, and a hairline on both sides of the grey
        would be a second way of saying the same thing, on a page that has no
        rules anywhere else.
      */}
      <DialogContent className="gap-0 p-0">
        <DialogHeader className="px-4 py-3">
          <DialogTitle>Share Keyline Icons</DialogTitle>
          {/*
            The one line that says what the panel above the buttons is, and the
            reason the mock itself needs no caption and its image no alt text:
            this names the network whose post is being drawn, it is the dialog's
            accessible description, and it changes with the preview.
          */}
          <DialogDescription>
            How the link arrives on {target.label}
          </DialogDescription>
        </DialogHeader>

        {/*
          The preview sits on the panel's one recessed surface.

          It is doing the job the mock's own border used to do alone: what is
          inside the grey is a picture of somewhere else, and what is white
          above and below it is this site's own chrome. The band is `--muted`,
          which is the fill every recessed surface on this site takes, so the
          preview reads the same way the browser's filter row and icon tiles do.

          Padding only, no reserved height. The five posts are different heights
          and the panel is therefore a different height for each, which is the
          trade for a body that hugs what is in it rather than sitting in a hole
          the tallest of them left behind.
        */}
        <div className="bg-muted p-4">
          <PostPreview
            target={target}
            copy={copy}
            cardTitle={homeCardTitle(counts.icons)}
            cardDescription={homeCardDescription(counts.icons)}
          />
        </div>

        {/*
          Six on one row where there is room and two rows of three where there
          is not. A grid rather than a wrap, so the columns line up under each
          other on a phone instead of centring a widow under five siblings.

          White, like the header, and for the same reason: everything in this
          band is a control of ours, and the grey between them is the only part
          of the panel that belongs to somebody else.
        */}
        <div className="grid grid-cols-3 gap-1 p-3 sm:grid-cols-6">
          {/*
            The one button here that is not a network and not a link. It leaves
            the preview alone: a clipboard has no card to show, and swapping the
            panel for an empty frame on the way past would be a flicker rather
            than an answer.
          */}
          <button
            type="button"
            onClick={copyLink}
            className={cn(SHARE_BUTTON, "[--mark-ink:var(--color-foreground)]")}
          >
            <span className={SHARE_CIRCLE}>
              {copied ? (
                <Check
                  className="size-4.5"
                  style={{ color: "var(--mark-ink)" }}
                />
              ) : (
                <LinkIcon
                  className="size-4.5"
                  style={{ color: "var(--mark-ink)" }}
                />
              )}
            </span>
            <span className={SHARE_LABEL}>
              {copied ? "Copied" : "Copy link"}
            </span>
          </button>

          {SHARE_TARGETS.map((t) => {
            const Logo = LOGOS[t.id]
            const active = t.id === previewing

            return (
              <a
                key={t.id}
                href={t.href(SHARE_URL, copy)}
                target="_blank"
                rel="noopener noreferrer"
                /*
                  Safe on an anchor here because the button opens a new tab:
                  this document is not going anywhere, so there is no unload
                  racing the beacon. A same-tab link would need `sendBeacon` or
                  it would lose events on the slower networks.
                */
                onClick={() => track("share_click", { network: t.id, page })}
                /*
                  The preview follows the pointer and the focus ring both, which
                  is the same pair the marks' brand tint hangs off and is here
                  for the same reason: a reader stepping through the row with
                  the keyboard should be shown what a reader with a mouse is
                  shown. `pointerenter` rather than `mouseenter` so a pen and a
                  trackpad behave alike.

                  Nothing puts it back on the way out. Reverting to the default
                  network on `pointerleave` means the panel flickers through a
                  card nobody asked to see every time the pointer crosses the
                  row, and leaving the last one up reads as a choice rather than
                  as a hover, which is what it should read as by the time the
                  reader is deciding.
                */
                onPointerEnter={() => setPreviewing(t.id)}
                onFocus={() => setPreviewing(t.id)}
                style={
                  {
                    // The two halves of the tint, as a light/dark pair. An
                    // inline value cannot carry a media query, so both are set
                    // here and the classes below pick one.
                    "--brand": t.ink[0],
                    "--brand-dark": t.ink[1],
                  } as React.CSSProperties
                }
                className={cn(
                  SHARE_BUTTON,
                  // The mark's ink, swapped on the button rather than on the
                  // mark itself. A custom property is the one value nothing
                  // else in the cascade repaints: the marks read it through an
                  // inline `color`, which beats every class rule there is, and
                  // the property is what changes underneath them. The menu this
                  // replaced needed that to escape a `**:` variant on its rows;
                  // the same shape is kept here because the tint has three
                  // states now rather than two and one property carries all of
                  // them.
                  "[--mark-ink:var(--color-muted-foreground)]",
                  "hover:[--mark-ink:var(--brand)] focus-visible:[--mark-ink:var(--brand)]",
                  "dark:hover:[--mark-ink:var(--brand-dark)] dark:focus-visible:[--mark-ink:var(--brand-dark)]",
                  // The network whose post is on show keeps its colour without
                  // being pointed at, which is what says which of the six the
                  // panel above is drawing.
                  active && [
                    "[--mark-ink:var(--brand)] dark:[--mark-ink:var(--brand-dark)]",
                    "[--share-circle:var(--color-muted-hover)]",
                  ]
                )}
              >
                <span className={SHARE_CIRCLE}>
                  <Logo
                    style={{ color: "var(--mark-ink)" }}
                    className="size-4.5"
                  />
                </span>
                <span className={cn(SHARE_LABEL, active && "text-foreground")}>
                  {t.label}
                </span>
                {/*
                  Every network opens a composer on someone else's site, and
                  this is what says so to a reader who cannot see that the mark
                  is a brand mark. The menu carried an arrow for the same job
                  and this row has no width for one.
                */}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

/**
 * The post as the chosen network will draw it: the words, then the card.
 *
 * Both halves come off `target.preview` in `lib/share.ts` rather than off a
 * switch here, so the one place that knows what a network is handed is also the
 * one place that says what it does with it.
 *
 * Drawn in the site's own tokens and not in each network's colours. The thing
 * worth previewing is *what* survives the trip, which of our two sentences and
 * which of the page's tags get drawn at all, and that is a fact about the
 * networks. A wrapper in LinkedIn blue would be a guess at their stylesheet
 * that goes stale on their schedule, and it would be a light rectangle sitting
 * in a dark panel the first time someone opens this at night.
 */
function PostPreview({
  target,
  copy,
  cardTitle,
  cardDescription,
}: {
  target: ShareTarget
  copy: ShareCopy
  cardTitle: string
  cardDescription: string
}) {
  const { words, headline, card } = target.preview
  const said = words?.(SHARE_URL, copy) ?? null

  return (
    <div className="flex flex-col gap-2.5 rounded-xl border bg-card p-3">
      {said && (
        <p
          className={cn(
            "text-[13px] leading-snug text-card-foreground",
            // Reddit's words are a submission's headline rather than a post's
            // body, and a headline set at body weight is the one detail that
            // would make this preview wrong about the network it is drawing.
            headline && "font-medium"
          )}
        >
          {said}
        </p>
      )}

      <figure className="overflow-hidden rounded-lg border bg-muted">
        <div className="relative aspect-[1200/630]">
          {/*
            `alt=""` on purpose. The dialog's description names the network and
            the caption below carries whatever text the card carries, so the
            image is the one part of this mock that is genuinely decoration: it
            is the same art in all six states, and the state is what the reader
            is here to compare.
          */}
          <Image
            src={CARD_IMAGE}
            alt=""
            fill
            sizes={CARD_SIZES}
            className="object-cover"
          />
          {/*
            X stamps the address over the art and prints nothing else, so the
            domain sits on the image rather than under it.
          */}
          {card === "domain" && (
            <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[11px] text-white">
              {SHARE_DOMAIN}
            </span>
          )}
        </div>

        {card !== "domain" && (
          <figcaption className="flex flex-col gap-0.5 border-t bg-background p-2.5">
            <span className="line-clamp-1 text-[13px] font-medium text-foreground">
              {cardTitle}
            </span>
            {/* Only Bluesky's embed draws the description as well. */}
            {card === "full" && (
              <span className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                {cardDescription}
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              {SHARE_DOMAIN}
            </span>
          </figcaption>
        )}
      </figure>
    </div>
  )
}
