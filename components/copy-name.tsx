"use client"

import * as React from "react"
import { toast } from "sonner"

import { Check, Copy } from "@/components/icons"
import { cn } from "@/lib/utils"

/**
 * An icon's name, which copies itself when you click it.
 *
 * The name is the thing most often wanted on its own: it is what goes in an
 * issue, a message, a CLI argument or an import written by hand, and taking it
 * any other way means selecting it out of a code block with six other things in
 * it.
 *
 * One component for both places that show a name, because they are the same
 * affordance and "active is white, names copy on click" only stays one idiom
 * while there is one definition of it. The dock had it first; the icon page
 * needed it and this is the extraction rather than the second copy.
 *
 * It renders a bare `<button>` and inherits its type from whatever wraps it, so
 * the dock's `<h2>` and the page's `<h1>` each keep their own size and weight
 * and this stays out of the heading question entirely. The negative margin is
 * what keeps the text optically flush with the block above it while the hover
 * target still has padding.
 */
export function CopyName({
  name,
  className,
  iconClassName,
}: {
  name: string
  /** Layout and type. The font comes from the heading this sits in. */
  className?: string
  /** The tick and the clipboard, which have to scale with the text. */
  iconClassName?: string
}) {
  const [copied, setCopied] = React.useState(false)

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(name)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      toast.error("Couldn't copy", {
        description: "Clipboard access was refused.",
      })
    }
  }, [name])

  return (
    <button
      type="button"
      onClick={copy}
      /* The label says what the click does, because the button's own text is
         the name and reads as a heading rather than as an action. */
      aria-label={`Copy the name ${name}`}
      className={cn(
        // `text-left` because a button centres its text by UA default, which
        // is invisible until a name is long enough to wrap — and then the two
        // lines sit centred under each other with the clipboard adrift at the
        // right, which reads as a broken heading rather than a long name.
        "-mx-2 flex items-center gap-2 rounded-lg px-2 py-1 text-left transition-colors hover:bg-muted",
        className
      )}
    >
      {name}
      {copied ? (
        <Check className={cn("size-4 text-muted-foreground", iconClassName)} />
      ) : (
        <Copy className={cn("size-4 text-muted-foreground", iconClassName)} />
      )}
    </button>
  )
}
