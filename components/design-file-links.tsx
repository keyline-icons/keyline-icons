"use client"

import { FigmaLogo, PaperLogo } from "@/components/brand-logos"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { paperFileForCategory } from "@/lib/paper-files"
import { SET_FIGMA_URL } from "@/lib/site-chrome"

/**
 * The two ways out of the site to the drawing itself: the Figma Community file
 * and the paper.design file, as marks with the label in a tooltip.
 *
 * One "Open in Figma" button with the words in it was what the icon page had,
 * and adding Paper beside it in the same shape put two wide outline buttons in
 * a header whose other half is a line of grey metadata. Two square marks say
 * the same thing in a third of the width, which is what lets the pair sit in
 * the dock's chip row as well as on the page.
 *
 * Dropping the label is only affordable because the mark is a logo: Figma's
 * five shapes and Paper's blue are recognisable at 16px in a way a drawn glyph
 * is not, and the word is still there for anyone who hovers, and in
 * `aria-label` for anyone who does not point at all.
 *
 * Both links are gated on their constant being non-empty, for the reason
 * `SET_FIGMA_URL` gives: a dead link out is worse than a missing one. Neither
 * goes to a per-icon node, so both open the whole set — see the constants.
 *
 * **Paper's mark is still one link, but not always the same one.** The set
 * outgrew a single Paper file and now sits in two, split by shelf, so the file
 * to open depends on which shelf the drawing is on. That is knowable here
 * without a node id, which is what keeps this a mark rather than a menu: the
 * reader clicks Paper and lands in the file their icon is in.
 */
export function DesignFileLinks({
  /** `icon` in the dock, matching the download button beside it; `icon-lg` on
      a page, matching the row of `lg` controls it sits with. */
  size = "icon",
  /**
   * The drawing's shelf, which picks the Paper file. Omitted where the pair
   * stands for the set rather than for one icon, and the first file answers
   * for it then — the one holding the Catalog surface and the Changelog.
   */
  category,
  className,
}: {
  size?: "icon" | "icon-lg"
  category?: string
  className?: string
}) {
  const FILES = [
    { id: "figma", label: "Figma", Logo: FigmaLogo, url: SET_FIGMA_URL },
    {
      id: "paper",
      label: "Paper",
      Logo: PaperLogo,
      url: paperFileForCategory(category ?? "").url,
    },
  ] as const

  const files = FILES.filter((file) => file.url)
  if (files.length === 0) return null

  return (
    <div className={className}>
      {files.map(({ id, label, Logo, url }) => (
        <Tooltip key={id}>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                size={size}
                nativeButton={false}
                render={
                  <a href={url} target="_blank" rel="noopener noreferrer" />
                }
                aria-label={`Open in ${label} (opens in a new tab)`}
              />
            }
          >
            {/* `size-` in the class is what makes the button's own
                `[&_svg:not([class*='size-'])]:size-4` stand down. Figma's mark
                is 38:57, so it letterboxes inside the square rather than
                stretching to fill it. */}
            <Logo className="size-4" />
          </TooltipTrigger>
          <TooltipContent>{`Open in ${label}`}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
