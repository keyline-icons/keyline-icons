"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { X as XIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * A centred modal, over Base UI's `Dialog`.
 *
 * The sheet in `sheet.tsx` is built on the same primitive and edges itself to
 * one side of the window; this is the same parts list positioned in the middle,
 * which is the shape a short, self-contained task wants. Both stay here rather
 * than becoming one component with a `side="center"`, because the two differ in
 * every layout rule they have and share only the primitive underneath.
 *
 * Base UI, so `render` rather than `asChild`, and the enter and exit states are
 * `data-starting-style` / `data-ending-style` rather than Radix's `data-state`.
 */
function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogPortal(props: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/**
 * The scrim, identical to the sheet's so the two dim the page the same way.
 */
function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

/**
 * The panel.
 *
 * Centred with a pair of half translations rather than with `translate-1/2`,
 * and the enter animation is a `scale`, which in Tailwind v4 is a property of
 * its own rather than a second `transform`. The two therefore compose instead
 * of overwriting each other, which is what a hand-written `transform` would do.
 *
 * `w-[calc(100%-2rem)]` before `max-w-*`, so the panel keeps a margin on a
 * phone instead of running edge to edge.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & { showCloseButton?: boolean }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-xl border bg-popover bg-clip-padding p-4 text-sm text-popover-foreground shadow-lg outline-none",
          // A panel taller than the window scrolls inside itself rather than
          // running off both ends of it, which is what a centred fixed element
          // does otherwise. `100%` resolves against the viewport here, the
          // popup being fixed, and the 2rem matches the margin its width keeps.
          "max-h-[calc(100%-2rem)] overflow-y-auto",
          "transition duration-150 ease-out data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-3 right-3"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

/**
 * Title and description, stacked with no gap between them.
 *
 * The two are one block of type and their own line heights already separate
 * them; a gap on top of that reads as two unrelated lines rather than as a
 * heading and its subtitle.
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
