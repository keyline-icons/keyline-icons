"use client"

import type { CSSProperties, ReactNode } from "react"
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

/**
 * A post's picture, which opens at its own size when clicked.
 *
 * The pictures are comparison sheets drawn 1,000 or 1,200 pixels across and
 * shown in a 704-pixel column, so their small type and 24px icons land at
 * well under their real size. The dialog undoes that: on a wide screen it
 * shows the sheet at its 1x width, and on a phone it keeps that width and
 * scrolls sideways instead of fitting the sheet to the screen, which would
 * only repeat what the page already did.
 *
 * The caption comes along, because a reader who opened the picture to study
 * it is the reader the caption's credit and footnote are for.
 */
export function BlogImage({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string
  alt: string
  width: number
  height: number
  caption: ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger className="block w-full cursor-zoom-in rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 720px, 100vw"
          className="h-auto w-full rounded-lg border"
        />
        <span className="sr-only">Open full size</span>
      </DialogTrigger>
      <DialogContent
        style={{ "--w": `${width}px` } as CSSProperties}
        className="max-w-[calc(var(--w)+2rem+2px)] gap-3 p-4 pt-12"
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <div className="overflow-x-auto">
          <Image
            src={src}
            alt=""
            width={width}
            height={height}
            sizes={`${width}px`}
            className="h-auto w-(--w) max-w-none rounded-md border sm:w-full sm:max-w-full"
          />
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {caption}
        </p>
      </DialogContent>
    </Dialog>
  )
}
