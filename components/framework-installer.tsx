"use client"

import * as React from "react"
import Link from "next/link"

import { ReactLogo } from "@/components/brand-logos"
import { CircleDashed } from "@/components/icons"
import { InstallTerminal } from "@/components/install-terminal"
import { Segmented, SegmentedItem } from "@/components/segmented"
import { REACT_PACKAGE } from "@/lib/icon-code"

/**
 * The framework row, the terminal under it, and the two notes that keep both
 * honest.
 *
 * The shape is Font Awesome's "works where you work" block: the stack you are
 * in, chosen at the top, then a terminal showing what that choice costs you.
 * The section was two cards side by side before this, one for pasting an SVG
 * and one for installing the package, which asked the reader to compare two
 * things instead of picking the one that applies to them.
 *
 * **Only what ships is named.** The row carried Vue, Svelte and Angular as
 * disabled chips, then as chips with "Soon" badges, and both versions promised
 * three specific packages that nobody has started. The line under the row says
 * more are coming and names none of them, which is the version that cannot come
 * back as a broken promise.
 *
 * The row is one chip today, so the state below never changes. It is here
 * rather than hardcoded because the day a second package ships, the change is
 * one row in `FRAMEWORKS` and the terminal follows.
 */

/**
 * What the set can be installed into. One entry, and that is the point.
 *
 * Vue, Svelte and Angular sat here as disabled chips for a while, which read as
 * a roadmap and was not one: nothing in this repo builds any of them, and four
 * names on a landing page is four promises. The line under the row says more
 * are coming without naming which, so the only thing that can be wrong about it
 * is the timing.
 *
 * `ready` stays for the day a second package ships. It is a fact about the repo
 * rather than a plan: `packages/react` exists and builds, and nothing else
 * does. A name here with `ready: true` before its package builds is a command
 * on the landing page that fails.
 */
const FRAMEWORKS = [
  { value: "react", label: "React", logo: ReactLogo, ready: true },
] as const

type Framework = (typeof FRAMEWORKS)[number]["value"]

export function FrameworkInstaller({
  /** The drawing the terminal's `cli add` line names. See `lib/home.ts`. */
  example,
}: {
  example: string
}) {
  const [framework, setFramework] = React.useState<Framework>("react")

  return (
    <div>
      {/*
        The picker sits in the terminal's header, not above the card. What you
        install into and what you type to do it are one decision, and two
        surfaces made the chips read as a section heading rather than a control.

        The second chip is the roadmap, and it is a chip rather than a sentence
        because that is where a reader looks for the answer: having found the
        one framework in the picker, the next question is whether theirs is
        coming, and the picker should answer it without them reading on. It is
        disabled and names nothing, so it cannot become a promise about a
        package that has not been started.
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

                  return (
                    <SegmentedItem
                      key={entry.value}
                      active={framework === entry.value}
                      disabled={!entry.ready}
                      onClick={() => setFramework(entry.value)}
                      className="gap-2"
                    >
                      {/*
                        The mark is in its own brand colour rather than the
                        chip's ink, which is most of what makes a logo legible
                        at 16px. See `components/brand-logos.tsx`.
                      */}
                      <Logo className="size-4 shrink-0" />
                      {entry.label}
                    </SegmentedItem>
                  )
                })}

                {/*
                  The roadmap chip, in the one place a reader asks the question:
                  having found the single framework in the picker, the next
                  thing they want to know is whether theirs is coming.

                  `CircleDashed` is the set's own pending mark, and it is still.
                  It turned slowly for a version, which is what a spinner does,
                  and a spinner means something is happening now: on a chip that
                  reports a plan it promised progress the reader cannot see and
                  the page cannot report. A dashed ring says unfinished without
                  claiming to be working on it.
                */}
                <SegmentedItem
                  active={false}
                  disabled
                  className="gap-2 text-muted-foreground"
                >
                  <CircleDashed className="size-4 shrink-0" />
                  More coming soon
                </SegmentedItem>
              </Segmented>
            }
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
          */}
            <pre className="overflow-x-auto rounded-md bg-background p-4 font-mono text-[13px] leading-relaxed">
              <code>{`import { Bell, Check, Search } from "${REACT_PACKAGE}"

<Bell className="size-4" />
<Check size={16} />
<Search strokeWidth={1.5} />`}</code>
            </pre>

            {/*
            One note now, and it is the escape hatch: the SVG path is the other
            half of the section's own heading, and the one that needs no
            framework at all. It was a whole pane beside the terminal and reads
            better as this line.

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
              copies as plain SVG that works in any framework, or none.{" "}
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
