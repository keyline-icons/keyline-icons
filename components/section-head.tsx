import { cn } from "@/lib/utils"

/**
 * A section's heading block: the name, then one line under it.
 *
 * Centred, and the whole page with it. Every section led from the left margin
 * while the hero above them was centred, so the page changed its mind about its
 * own axis after the first screen. The content under these headings is full
 * width and mostly symmetrical (three cards, three panels, a terminal), and a
 * heading hard against the left edge of a symmetrical block reads as a caption
 * that slipped.
 *
 * `max-w-2xl` on the lead and `mx-auto` on the pair: a centred paragraph set to
 * the full column is unreadable past about 75 characters, and centred text with
 * ragged edges on both sides needs a tighter measure than left-aligned text
 * does, not a looser one.
 *
 * The lead is optional. A section whose controls introduce themselves does not
 * need a sentence saying it is about to show them.
 *
 * Out of `app/page.tsx` once `/custom` needed the same heading: two copies of a
 * heading block are two headings that drift apart.
 */
export function SectionHead({
  title,
  lead,
  className,
}: {
  title: string
  lead?: string
  className?: string
}) {
  return (
    <div className={cn("text-center", className)}>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {lead && (
        <p className="mx-auto mt-3 max-w-2xl text-base text-balance text-muted-foreground">
          {lead}
        </p>
      )}
    </div>
  )
}
