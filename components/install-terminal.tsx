"use client"

import * as React from "react"

import { Check, Copy, Terminal } from "@/components/icons"
import { Segmented, SegmentedItem } from "@/components/segmented"
import { Button } from "@/components/ui/button"
import {
  installIcon,
  installSet,
  PACKAGE_MANAGERS,
  type PackageManager,
} from "@/lib/icon-code"

/**
 * Every way of installing the set, in a terminal, for whichever package manager
 * the reader uses.
 *
 * The landing page had one hardcoded `npm i` line inside a code block. That is
 * a screenshot of an install rather than an install: it does not say what the
 * CLI is for, and it silently assumes npm on a site whose own preview dock has
 * offered pnpm, yarn and bun for months. Both commands come from
 * `lib/icon-code.ts`, which is the same source the dock copies from, so the
 * page cannot drift from what the packages are actually called.
 *
 * **Two commands, because they are two different things.** `add` is a
 * dependency: every icon, as React components, updated when you update it.
 * `exec` runs the CLI once and leaves a drawing in your project with nothing in
 * your lockfile. Every manager spells the second one differently, which is the
 * whole reason `PACKAGE_MANAGERS` carries a pair of verbs rather than a name.
 *
 * The picker is `Segmented`, the site's one-of-many control, and its choice is
 * component state rather than the settings cookie: the cookie is for how the
 * set is drawn, not for facts about the reader's machine. The dock makes the
 * same call for the same reason.
 */
export function InstallTerminal({
  /** The drawing the `add` example names. Checked by `check-demos`. */
  example,
  /**
   * Rendered at the left of the header, where the terminal glyph would be.
   *
   * The framework picker lives there. It was a row of its own above the card
   * and belongs inside it: what you are installing into and what you type to do
   * it are one decision, and splitting them across two surfaces made the chips
   * look like a section header rather than a control on this block.
   */
  leading,
}: {
  example: string
  leading?: React.ReactNode
}) {
  const [pm, setPm] = React.useState<PackageManager>("npm")
  const [copied, setCopied] = React.useState(false)

  const lines = [
    { note: "Every icon, as React components", command: installSet(pm) },
    {
      note: "Or copy one drawing in, with nothing left in your lockfile",
      command: installIcon(pm, example, "stroke"),
    },
  ]

  /*
    The copy takes the commands and not the comments. What lands on a clipboard
    should be runnable when it is pasted, and a `#` line pasted into a shell is
    at best noise and at worst the reason someone thinks the snippet failed.

    Awaited, and the tick only appears if the write resolved. `writeText` is
    refused outright in some contexts, and a button that says "Copied" over an
    empty clipboard is worse than one that does nothing. This page has no
    `Toaster` — that lives on `/icons` — so a refusal is silent here rather than
    reported, which is the one difference from `components/copy-name.tsx`.

    The tick returns to a copy glyph on its own, because a button stuck on
    "Copied" cannot say it a second time, and the second time is exactly when
    someone doubts the first.
  */
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        lines.map((line) => line.command).join("\n")
      )
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    /*
      `p-3` with a matching `pb-3` on the header, so the three gaps inside this
      card are the same 12px: above the chips, between the chips and the block,
      and below it. At `p-2` with no top pad of its own the row sat 8px under
      the card's edge with 32px chips in it, which reads as a control jammed
      into a corner rather than one sitting in a header.
    */
    <div className="rounded-md bg-background p-3">
      <div className="flex flex-wrap items-center gap-2 px-1 pb-3">
        {/*
          The framework picker, or the set's own terminal glyph when there is
          none. The glyph is the one piece of chrome saying "this is a shell":
          there is no fake window bar and no traffic lights, because this site
          draws real interfaces or none.
        */}
        {leading ?? (
          <Terminal className="size-4 shrink-0 text-muted-foreground" />
        )}

        {/*
          Pushed right only from `sm`. Below that the header wraps, and an
          `ml-auto` on a wrapped row throws this track to the far edge of its
          own line while the framework track sits at the left of the one above:
          two controls in one header, on two different axes. Left-aligned on a
          phone they read as one stack.
        */}
        <Segmented className="sm:ml-auto">
          {PACKAGE_MANAGERS.map((manager) => (
            <SegmentedItem
              key={manager.value}
              active={pm === manager.value}
              onClick={() => setPm(manager.value)}
              // Only the horizontal padding, so these chips are the same
              // 14px sans as the framework chips beside them and as the dock's
              // own package-manager switcher. They were `font-mono text-xs`,
              // which is right for a command in a code block and wrong for a
              // label on a control: two tracks in one row at two type sizes.
              className="px-2.5"
            >
              {manager.value}
            </SegmentedItem>
          ))}
        </Segmented>

        {/*
          36px, like the tracks beside it. `icon-sm` is 28 and sat visibly low
          in a row of 36px controls — the same mismatch the `site-ui` skill
          flags for the preview dock.
        */}
        <Button
          size="icon-lg"
          variant="ghost"
          onClick={copy}
          aria-label={`Copy the ${pm} commands`}
        >
          {copied ? <Check /> : <Copy />}
        </Button>
      </div>

      {/*
        Scrolls rather than wraps. A wrapped command reads as two commands, and
        the one thing a terminal line has to be is runnable by eye.
      */}
      <pre className="overflow-x-auto rounded-sm bg-muted px-3 py-3 font-mono text-[13px] leading-relaxed">
        <code>
          {lines.map((line, index) => (
            <React.Fragment key={line.command}>
              {index > 0 && "\n\n"}
              <span className="text-muted-foreground">{`# ${line.note}\n`}</span>
              {/*
                The prompt is not part of the command and is not selectable,
                so dragging across the line copies something that runs.
              */}
              <span
                aria-hidden="true"
                className="pointer-events-none text-muted-foreground select-none"
              >
                {"$ "}
              </span>
              {line.command}
            </React.Fragment>
          ))}
        </code>
      </pre>
    </div>
  )
}
