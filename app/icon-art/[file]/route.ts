import { CORNERS, STYLES } from "@/components/glyph"
import { styleFile, treatmentFile } from "@/lib/icon-treatments"

/**
 * The browser's copy of one corner treatment, `regular.json` or `sharp.json`,
 * or of one style in it, `regular.stroke.json`. See `lib/icon-treatments.ts`
 * for why they exist.
 *
 * All are built at deploy and nothing else is served here, so a made-up name
 * is a 404 from the router rather than a render.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return CORNERS.flatMap((corners) => [
    { file: `${corners}.json` },
    ...STYLES.map((style) => ({ file: `${corners}.${style}.json` })),
  ])
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params
  const [first, second, ...rest] = file.replace(/\.json$/, "").split(".")
  const corners = CORNERS.find((known) => known === first)
  const style = STYLES.find((known) => known === second)
  if (!corners || rest.length > 0 || (second && !style)) {
    return new Response(null, { status: 404 })
  }

  const { body } = await (style
    ? styleFile(corners, style)
    : treatmentFile(corners))
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
