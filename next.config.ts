import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  images: {
    /*
      Contributor avatars, which are `github.com/<handle>.png`. One host, and
      only the avatar path on it: `remotePatterns` is an allow-list, and the
      point of listing a pathname is that this app can never be turned into an
      image proxy for the rest of github.com.
    */
    remotePatterns: [
      { protocol: "https", hostname: "github.com", pathname: "/*.png" },
    ],
  },
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  /*
    `/shadcn` became `/install` when the page outgrew its name. A rename with no
    redirect is the one way to actually lose what a URL has earned: a link into
    the old address 404s, and a 404 tells a crawler to drop the page rather than
    to follow it somewhere.

    `permanent: true` is a 308, which is the strongest signal there is that the
    address moved — stronger than the canonical on the new page, and the reason
    the canonical alone is not enough here. The old URL is not listed anywhere:
    `SITE_LINKS` carries the new one, so the nav, the footer and the sitemap all
    moved with it.
  */
  /*
    `/` was the second entry here, and it is gone. The browser moved to `/icons`
    so that every icon URL would sit under one folder, and the origin forwarded
    to it with a 308, which left the site with nothing at its own address. The
    cost of that was written down at the time along with the way back: take the
    entry out and put `app/page.tsx` in. `app/page.tsx` is the landing page, so
    the entry is out.

    Nothing needs forwarding in its place. A redirect exists to keep a *moved*
    address alive, and `/` did not move: it is a real page again, with its own
    canonical and its own content, and `/icons` keeps everything it earned while
    it stood in for it. The one thing that would break the arrangement is
    rendering the grid at both addresses, which is the duplication the route
    policy exists to prevent, and neither page does.
  */
  async redirects() {
    return [{ source: "/shadcn", destination: "/install", permanent: true }]
  },
}

export default nextConfig
