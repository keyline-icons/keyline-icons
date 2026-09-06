import Link from "next/link"
import { notFound } from "next/navigation"

import {
  BLOG_AUTHOR,
  BLOG_POSTS,
  findPost,
  postDateLabel,
  postHeadline,
  postHref,
  postVersionLabel,
} from "@/lib/blog"
import { blogPostJsonLd, pageMetadata } from "@/lib/seo"
import { SET_X_HANDLE, SET_X_URL } from "@/lib/site-chrome"
import { BlogBody } from "@/components/blog-body"
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
      The card takes the post's standfirst rather than its description. The
      description is written for a search result and says what is inside; the
      standfirst is written for someone who has already clicked, and it is
      shorter, which is what survives being cut off on a feed card.
    */
    socialDescription: post.standfirst,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [BLOG_AUTHOR],
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

  return (
    <>
      <SiteNav />

      {/*
        The prose measure. This is the one page on the site that is genuinely
        prose end to end, and prose past about 75 characters a line stops being
        readable however much width the window offers.
      */}
      <main className="mx-auto w-full max-w-3xl px-6 pb-16 lg:px-8">
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
                author: BLOG_AUTHOR,
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
              The byline links to the handle the set posts from, which is the
              one place a reader can check who wrote this. `rel="author"` is a
              hint rather than a ranking signal and costs nothing.
            */}
            <a
              href={SET_X_URL}
              rel="author noopener noreferrer"
              target="_blank"
              className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
            >
              {BLOG_AUTHOR}
            </a>
            <span aria-hidden="true"> · </span>
            <time dateTime={post.date}>{postDateLabel(post.date)}</time>
            <span aria-hidden="true"> · </span>
            {post.readingMinutes} min read
          </p>
        </header>

        <article>
          <BlogBody post={post} />
        </article>

        {/*
          A way back and a way to say something. Not a comment form: there is
          no server here to hold one, and the set already has two places
          feedback goes.
        */}
        <footer className="mt-12 flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground">
          <p>
            <Link
              href="/blog"
              className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
            >
              All posts
            </Link>
          </p>
          <p>
            Questions, or a drawing you want and cannot find? Say so at{" "}
            <a
              href={SET_X_URL}
              rel="noopener noreferrer"
              target="_blank"
              className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
            >
              @{SET_X_HANDLE}
            </a>
            .
          </p>
        </footer>
      </main>

      <SiteFooter />
    </>
  )
}
