import { CORNERS } from "@/components/glyph"
import { treatmentFile } from "@/lib/icon-treatments"

/**
 * The browser's copy of one corner treatment, `regular.json` or `sharp.json`.
 * See `lib/icon-treatments.ts` for why it exists.
 *
 * Both are built at deploy and nothing else is served here, so a made-up name
 * is a 404 from the router rather than a render.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return CORNERS.map((corners) => ({ file: `${corners}.json` }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params
  const corners = CORNERS.find((known) => `${known}.json` === file)
  if (!corners) return new Response(null, { status: 404 })

  const { body } = await treatmentFile(corners)
  return new Response(body, {
    headers: {
      "Content-Type": "application/json",
      // A year and immutable, which is only safe because the browser always
      // asks with `?v=<hash of this body>`: a changed file is a new URL.
      "Cache-Control": "public, max-age=31536000, immutable",
      // Data for the browser, not a page: nothing here belongs in an index.
      "X-Robots-Tag": "noindex",
    },
  })
}
