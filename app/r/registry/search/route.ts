import type { NextRequest } from "next/server"
import { CACHE_CONTROL, searchCatalog } from "@/lib/registry"

/**
 * The catalog a page at a time, for shadcn 4.17.0 and later.
 *
 * Nothing links here. `next.config.ts` sends `/r/registry.json?q=…` and its
 * siblings to this route, and leaves the bare address to the prerendered file.
 * It answers direct requests too, as a first page when it is given nothing.
 */
export async function GET(request: NextRequest) {
  return Response.json(await searchCatalog(request.nextUrl.searchParams), {
    headers: {
      // The same hour, told to the CDN as well. This is a function response
      // rather than a prerendered file, and Vercel's cache keeps one only when
      // `s-maxage` asks it to. Without it every `shadcn search` would run the
      // search again, though every CLI that sends parameters asks for the same
      // first page, `limit=100&offset=0`, when it is given no query.
      "Cache-Control": `${CACHE_CONTROL}, s-maxage=3600`,
    },
  })
}
