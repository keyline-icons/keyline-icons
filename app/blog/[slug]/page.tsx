import Link from "next/link"
import { notFound } from "next/navigation"

import {
  BLOG_POSTS,
  findPost,
  postDateLabel,
  postHeadline,
  postHref,
  postVersionLabel,
} from "@/lib/blog"
import { blogPostJsonLd, pageMetadata } from "@/lib/seo"
import { RAIL_ASIDE, RAIL_COLUMN, RAIL_PAGE } from "@/lib/site-chrome"
import { BlogBody } from "@/components/blog-body"
import { PageContents } from "@/components/page-contents"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

/**
 * One post.
 *
 * Statically generated from `BLOG_POSTS`, so there is no route here for a slug
 * that does not exist and no database behind it: the posts are source, the
 * same way the icons are.
 */

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = findPost(slug)

  if (!post) return {}

  return pageMetadata({
    path: postHref(post.slug),
    /* `postHeadline`, not `post.title`: it carries the version once the tag
       exists, and this string has to be the `h1` word for word. */
    title: postHeadline(post),
    description: post.description,
    /*
      The card headline drops the "· Keyline Icons" that `pageMetadata` would
      otherwise append, and it is the one place on the site that should.

      A search result has to say whose page it is, because the brand may be the
      thing someone typed; the `<title>` keeps the suffix for exactly that. A
      feed card does not: X, Slack and LinkedIn all render `og:site_name`
      beside the headline already, and this post's card *draws* the mark and
      the words "Keyline Icons" across its top. The suffix would be the third
      copy in one unfurl, and it would spend characters a 62-character headline
      has better uses for.
    */
    socialTitle: postHeadline(post),
    /*
      The card takes the post's standfirst rather than its description. The
      description is written for a search result and says what is inside; the
      standfirst is written for someone who has already clicked, and it is
      shorter, which is what survives being cut off on a feed card.
    */
    socialDescription: post.standfirst,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated,
    },
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = findPost(slug)

  if (!post) notFound()

  const version = postVersionLabel(post)
  /*
    The post's headings, for the rail. Read off the body the headings render
    from, so a heading added, renamed or given a new id moves the rail with
    it; there is no second list to keep in step. A post with fewer than two
    has nothing to navigate between and draws no rail.
  */
  const headings = post.body.flatMap((block) =>
    block.kind === "h2" ? [{ id: block.id, title: block.text }] : []
  )

  return (
    <>
      <SiteNav />

      {/*
        The prose measure. This is the one page on the site that is genuinely
        prose end to end, and prose past about 75 characters a line stops being
        readable however much width the window offers. `RAIL_PAGE` keeps that
        measure and adds the margin rail the changelog and the install page
        have, from `xl`; the reasoning is on the constant.
      */}
      <main className={RAIL_PAGE}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              blogPostJsonLd({
                title: postHeadline(post),
                description: post.description,
                path: postHref(post.slug),
                datePublished: post.date,
                dateModified: post.updated,
                keywords: post.keywords,
              })
            ),
          }}
        />

        {/*
          The trail the `BreadcrumbList` node describes, drawn from the same two
          links. Structured data claiming a breadcrumb the page does not render
          is the violation, and it is what happens the moment the two are
          written separately.
        */}
        <div className={RAIL_COLUMN}>
          <Breadcrumb className="pt-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/blog" />}>
                  Blog
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  {postHeadline(post)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <header className="flex flex-col gap-4 pt-5 pb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {postHeadline(post)}
            </h1>
            <p className="text-lg leading-relaxed text-balance text-muted-foreground">
              {post.standfirst}
            </p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              {/*
              The version badge the index entry carries, repeated here so a
              reader arriving from a search rather than from the index gets the
              same fact in the same shape. "Unreleased" while no tag covers it.
            */}
              {version && (
                <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] tracking-tight text-foreground">
                  {version}
                </span>
              )}
              {/*
              No byline. There was one, carrying Zafar's name and linking his
              handle, and it claimed something untrue: he did the work these
              posts are about, and did not write them. The set is the author,
              which is what the structured data now says too.
            */}
              <time dateTime={post.date}>{postDateLabel(post.date)}</time>
              <span aria-hidden="true"> · </span>
              {post.readingMinutes} min read
            </p>
          </header>
        </div>

        {/*
          The post's headings in the left margin, the same rail as the install
          page's contents (Zafar, 24 Sep 2026: "the blog should also get one").
          It starts level with the article rather than the heading, like the
          changelog's ticks start at the first release, and there is no chip
          version below `xl`: a post is read top to bottom, and a row of
          headings over its first paragraph would be a contents page in front
          of an essay.
        */}
        {headings.length > 1 && (
          <aside className={RAIL_ASIDE}>
            <div className="sticky top-24">
              <PageContents entries={headings} />
            </div>
          </aside>
        )}

        <article className={RAIL_COLUMN}>
          <BlogBody post={post} />
        </article>
      </main>

      <SiteFooter />
    </>
  )
}
