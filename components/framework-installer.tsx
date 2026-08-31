"use client"

import * as React from "react"
import Link from "next/link"

import { ReactLogo, SvelteLogo, VueLogo } from "@/components/brand-logos"
import { InstallTerminal } from "@/components/install-terminal"
import { Glyph } from "@/components/glyph"
import { Segmented, SegmentedItem } from "@/components/segmented"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  ICONIFY_PREFIX,
  ICONIFY_URL,
  REACT_PACKAGE,
  SVELTE_PACKAGE,
  VUE_PACKAGE,
} from "@/lib/icon-code"
import type { FrameworkHintArt } from "@/lib/home"
import { cn } from "@/lib/utils"

/**
 * The framework row, the terminal under it, and the note that keeps both
 * honest.
 *
 * The shape is Font Awesome's "works where you work" block: the stack you are
 * in, chosen at the top, then a terminal showing what that choice costs you.
 * The section was two cards side by side before this, one for pasting an SVG
 * and one for installing the package, which asked the reader to compare two
 * things instead of picking the one that applies to them.
 *
 * **Only what ships is named**, and three things ship now. The row carried Vue,
 * Svelte and Angular as disabled chips, then as chips with "Soon" badges, and
 * both versions promised three specific packages that nobody had started. Vue
 * and Svelte are back as real chips because the set is on Iconify, which is a
 * different promise: not a package of ours, an install that works today. Angular
 * is not here, because Iconify reaches it through the `iconify-icon` web
 * component rather than a framework package, and a chip whose command is a
 * different shape from the two beside it belongs on `/install`, not in a picker.
 */

/**
 * What the set can be installed into, what installing it costs, and what you
 * type afterwards. Three entries, and the third column is the point: the chips
 * do not select a label, they select a command and the snippet under it.
 *
 * **Only React installs something of ours.** Vue and Svelte install Iconify's
 * component for their framework, which reads the set from
 * `ICONIFY_PREFIX` over Iconify's API. That is why `pkg` is here rather than
 * derived: two of these three are somebody else's package, and a table that
 * assumed the scope would quietly emit `@keyline-icons/vue`, which does not
 * exist and is not planned. See the note on `ICONIFY_PREFIX` in
 * `lib/icon-code.ts` for why it is not going to.
 *
 * `ready` stays, and all three are true today. It is a fact about what a reader
 * can run rather than a plan: a name here with `ready: true` is a command on the
 * landing page that has to work, so anything added before its install resolves
 * goes in as `false` and arrives disabled.
 *
 * The Vue and Svelte imports differ on purpose and are not a typo to tidy:
 * `@iconify/vue` exports `Icon` as a named export and `@iconify/svelte` exports
 * it as its default. Both were read off the packages' own type definitions.
 */
const FRAMEWORKS = [
  {
    value: "react",
    label: "React",
    logo: ReactLogo,
    ready: true,
    pkg: REACT_PACKAGE,
    mark: "circle-check",
    markClass: "text-green-400 dark:text-green-600",
    hint: "This project's own package",
    note: "Every icon, as React components",
    usage: `import { Bell, Check, Search } from "${REACT_PACKAGE}"

<Bell className="size-4" />
<Check size={16} />
<Search strokeWidth={1.5} />`,
  },
  {
    value: "vue",
    label: "Vue",
    logo: VueLogo,
    ready: true,
    pkg: VUE_PACKAGE,
    mark: "triangle-alert",
    markClass: "text-orange-400 dark:text-orange-600",
    hint: "Served by Iconify, not a package of ours",
    note: "Every icon, through Iconify's Vue component",
    usage: `import { Icon } from "${VUE_PACKAGE}"

<Icon icon="${ICONIFY_PREFIX}:bell" class="size-4" />
<Icon icon="${ICONIFY_PREFIX}:check" width="16" />
<Icon icon="${ICONIFY_PREFIX}:search-duotone" />`,
  },
  {
    value: "svelte",
    label: "Svelte",
    logo: SvelteLogo,
    ready: true,
    pkg: SVELTE_PACKAGE,
    mark: "triangle-alert",
    markClass: "text-orange-400 dark:text-orange-600",
    hint: "Served by Iconify, not a package of ours",
    note: "Every icon, through Iconify's Svelte component",
    usage: `import Icon from "${SVELTE_PACKAGE}"

<Icon icon="${ICONIFY_PREFIX}:bell" class="size-4" />
<Icon icon="${ICONIFY_PREFIX}:check" width="16" />
<Icon icon="${ICONIFY_PREFIX}:search-duotone" />`,
  },
] as const

type Framework = (typeof FRAMEWORKS)[number]["value"]

export function FrameworkInstaller({
  /** The drawing the terminal's `cli add` line names. See `lib/home.ts`. */
  example,
  /**
   * The tooltips' two fill marks, resolved on the server.
   *
   * They arrive as art rather than as components because `@/components/icons`
   * is stroke only, and these have to be fill to survive 14px. See
   * `pickFrameworkHintIcons` in `lib/home.ts`.
   */
  marks,
}: {
  example: string
  marks: FrameworkHintArt
}) {
  const [framework, setFramework] = React.useState<Framework>("react")
  const current =
    FRAMEWORKS.find((entry) => entry.value === framework) ?? FRAMEWORKS[0]

  return (
    <div>
      {/*
        The picker sits in the terminal's header, not above the card. What you
        install into and what you type to do it are one decision, and two
        surfaces made the chips read as a section heading rather than a control.

        There was a fourth chip here, disabled, reading "More coming soon". It
        went when Vue and Svelte became real: with three working chips in the
        row, a reader on Solid or Angular reads it as "not yet", when the honest
        answer is "today, from the same Iconify set". A vague chip that has
        become wrong is worse than a concrete sentence, so that answer moved
        down to the note under the snippet, which can carry the link that
        settles it. The picker now holds only what it can switch the terminal
        to.
      */}
      {/*
        `max-w-3xl` and centred, not the full page column. A terminal is lines
        of text: run to 1376px and the commands sit alone at the left of an
        enormous grey field, with the copy button a hand's width away from what
        it copies.

        768px is set by the content rather than picked: the longest thing in the
        block is the comment "# Or copy one drawing in, with nothing left in
        your lockfile" at about 60 characters of 13px mono, which lands near
        470px. Everything still fits on one line, and the copy button now sits
        within reach of the command it takes.

        There was an icon preview beside it, a column showing the drawing that
        `cli add bell` puts in your project. It is gone: it made the block a
        two-column layout whose left half repeated something the page has
        already said three sections running, and the terminal is the subject
        here.
      */}
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg bg-muted p-2">
          <InstallTerminal
            example={example}
            leading={
              <Segmented role="group" aria-label="Framework">
                {FRAMEWORKS.map((entry) => {
                  const Logo = entry.logo
                  // Hoisted rather than indexed inside the JSX: an index
                  // access keyed by a union does not narrow across a ternary,
                  // so `marks[entry.mark]` stays `StyleArt | undefined` in the
                  // branch that has already tested it.
                  const mark = marks[entry.mark]

                  return (
                    /*
                      `hint` is a tooltip rather than anything on the face of
                      the chip, and it answers the question the row raises
                      before a reader clicks: two of these three install
                      somebody else's package, and a chip reading "Vue" cannot
                      say so on its own. In the chip it would be a second line
                      of text in a 32px control, or a badge, and the badge slot
                      is spoken for.

                      It repeats nothing. The terminal's own comment line says
                      what you are installing once you have picked; this says
                      whose package it is before you do, which is the moment
                      somebody would otherwise go looking on npm for a
                      `@keyline-icons/vue` that does not exist.

                      **The hint is also the accessible name, and that is not
                      belt and braces.** This repo's `TooltipContent` renders a
                      popup with no `role="tooltip"` and sets no
                      `aria-describedby` on the trigger, checked in the DOM
                      rather than assumed: the tooltip is paint, and a screen
                      reader is told nothing by it. So the fact rides
                      `aria-label`, which is exactly what `design-file-links`
                      does with the same primitive. Hover is then an echo of the
                      name rather than the only place the name's content lives,
                      which also covers the phone, where there is no hover at
                      all.

                      `TooltipProvider` is already in `app/layout.tsx`, so there
                      is none to add here.
                    */
                    <Tooltip key={entry.value}>
                      <TooltipTrigger
                        render={
                          <SegmentedItem
                            active={framework === entry.value}
                            disabled={!entry.ready}
                            onClick={() => setFramework(entry.value)}
                            aria-label={`${entry.label}. ${entry.hint}`}
                            className="gap-2"
                          />
                        }
                      >
                        {/*
                          The mark is in its own brand colour rather than the
                          chip's ink, which is most of what makes a logo legible
                          at 16px. See `components/brand-logos.tsx`.
                        */}
                        <Logo className="size-4 shrink-0" />
                        {entry.label}
                      </TooltipTrigger>
                      <TooltipContent>
                        {/*
                          The mark carries the verdict and the sentence explains
                          it, which is the order a tooltip is read in. The popup
                          is already `inline-flex items-center gap-1.5`, so it
                          needs no layout of its own.

                          **The pair of colours is per theme because the pill
                          inverts.** `bg-foreground` is near-black in light and
                          near-white in dark, so one green cannot sit on both:
                          the 400s read on the dark pill, the 600s on the light
                          one. These are raw palette utilities rather than
                          tokens deliberately — the theme is neutral by design
                          and has no status colours in it, and inventing `--ok`
                          and `--warn` for two glyphs in one tooltip is a bigger
                          commitment than the need. If a third status mark shows
                          up anywhere on the site, that is the moment they
                          become tokens.

                          14px against the popup's 12px text. `Glyph` skips
                          `strokeWidth` when the drawing's root carries no
                          `stroke-width`, which a pure-fill drawing does not, so
                          the 2 here is passed and ignored rather than painting
                          an outline over the knockouts.

                          Guarded, because `pickFrameworkHintIcons` returns a
                          partial: a renamed drawing costs the tooltip its mark
                          and nothing else.
                        */}
                        {mark ? (
                          <Glyph
                            art={mark}
                            size={14}
                            stroke={2}
                            className={cn("shrink-0", entry.markClass)}
                          />
                        ) : null}
                        {entry.hint}
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </Segmented>
            }
            install={{ note: current.note, pkg: current.pkg }}
          />

          {/*
            `pt-2` rather than `p-4`: the snippet and the note below it line up
            with the terminal above, which is inset by the panel's own `p-2`.
            Padded on all four sides they sat a step further in than the block
            they belong to, which reads as a nested card without a card.

            The top pad matches that same `p-2`, so the gap between the terminal
            and the snippet is the gap between the panel and its edge. One
            spacing value for the whole block rather than two.
          */}
          <div className="pt-2">
            {/*
            The usage, under the install rather than beside it: what you type
            after the command has run. `bg-background` because the panel around
            it is muted.

            It follows the picker, because an install line and the import it
            enables are one answer. This block was React's snippet hardcoded
            while the row had one chip, and leaving it that way would have put a
            React import under a Vue install, which is the exact failure the
            terminal above is written to avoid.
          */}
            <pre className="overflow-x-auto rounded-md bg-background p-4 font-mono text-[13px] leading-relaxed">
              <code>{current.usage}</code>
            </pre>

            {/*
            One note, carrying the two answers the picker above cannot: the SVG
            path, which needs no framework at all and is the other half of the
            section's own heading, and Iconify, which is where a framework that
            has no chip gets the set. It was a whole pane beside the terminal and
            reads better as this line.

            **What came out.** This paragraph opened with "Not published yet."
            for as long as the package was not on npm, on the argument that a
            terminal is the most convincing thing on the page and therefore the
            worst place to imply an install that fails. It came out early, on
            the basis that the package was coming, and the claim went on living
            in the two places that owned it: the callout on `/install` and the
            answers in `lib/faq.ts`. All three packages published at v0.1.0, so
            both of those are gone too and the install this terminal shows now
            works. Nothing here needs the warning back.
          */}
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Or skip the install entirely: every icon in the{" "}
              {/* Links inside a sentence, so no prefetch. */}
              <Link
                href="/icons"
                prefetch={false}
                className="underline underline-offset-2 hover:text-foreground"
              >
                browser
              </Link>{" "}
              copies as plain SVG that works in any framework, or none. Beyond
              the three above, the whole set is on{" "}
              {/*
                External, so a real anchor rather than `Link`: this is the one
                pointer on the block that leaves the site, and it is here because
                the picker stopped answering it. See the note by the picker.
              */}
              <a
                href={ICONIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                Iconify
              </a>{" "}
              as <code>{ICONIFY_PREFIX}</code>, which covers Solid, Angular and
              plain web components.{" "}
              <Link
                href="/install"
                prefetch={false}
                className="underline underline-offset-2 hover:text-foreground"
              >
                How to install
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
