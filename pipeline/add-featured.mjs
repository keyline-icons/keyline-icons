#!/usr/bin/env node
/**
 * Turn an accepted post into a showcase entry.
 *
 *   node pipeline/add-featured.mjs <image> --title "Acme Console" \
 *     --post https://x.com/adareyes/status/1234567890 \
 *     --alt "An admin console: a sidebar of projects beside a table of runs." \
 *     [--url https://acme.com] [--avatar ~/Downloads/ada.jpg] \
 *     [--name "Ada Reyes"] [--x adareyes] [--slug acme-console] \
 *     [--date 2026-08-29] [--home] [--dry-run]
 *
 * Accepting a submission is a judgement and stays a person's. Everything after
 * it is bookkeeping: copy an image in under the right name, copy a face in
 * beside it, add two import lines, type ten fields, keep them consistent with
 * each other. That is the part worth automating, and the part where a hand-kept
 * file quietly drifts.
 *
 * What it does NOT do is decide. It reads nothing from X, judges nothing, and
 * publishes nothing: it edits `lib/featured.ts` and copies files, and the diff
 * is there to be read before anything is committed. `--dry-run` prints the same
 * work without touching the tree.
 *
 * Two fields cannot be invented and are required. `--alt` is what a screen
 * reader is told the screenshot shows, and a generated one would be worse than
 * none. `--post` is the provenance and the permission at once, which is why
 * `check-featured.mjs` fails an entry without it.
 *
 * The handle and the credited name are both derived from `--post` when they are
 * not given, since an X status URL carries the author in it. Pass `--name` when
 * someone wants crediting as something other than their handle, which is most
 * people.
 *
 * Files are **copied, not moved**. The screenshot in the download folder is the
 * only copy until this runs, and a script that consumes its own input is one
 * mistyped slug away from losing it.
 *
 * It formats what it writes with the repo's own Prettier, rather than trying to
 * emit byte-perfect output by hand: `check-featured.mjs` reads this file with a
 * line scanner that leans on Prettier's shape, so the two have to agree.
 */

import { execFile } from "node:child_process"
import { existsSync } from "node:fs"
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises"
import { basename, extname, join } from "node:path"
import { promisify } from "node:util"
import { fileURLToPath } from "node:url"

import prettier from "prettier"

const run = promisify(execFile)
const ROOT = fileURLToPath(new URL("..", import.meta.url))
const FEATURED_TS = join(ROOT, "lib", "featured.ts")
const IMAGES_DIR = join(ROOT, "public", "featured")
const AVATARS_DIR = join(IMAGES_DIR, "avatars")

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`
const die = (message) => {
  console.error(`${c(31, "error")} ${message}`)
  process.exit(1)
}

/* A flag parser rather than a dependency: eight options do not earn one. */
const argv = process.argv.slice(2)
const flags = {}
const positional = []
for (let i = 0; i < argv.length; i += 1) {
  const arg = argv[i]
  if (!arg.startsWith("--")) {
    positional.push(arg)
    continue
  }
  const name = arg.slice(2)
  /* `--home` and `--dry-run` take no value; everything else consumes the next
     token, and refusing a missing one here beats writing `undefined` later. */
  if (name === "home" || name === "dry-run") {
    flags[name] = true
    continue
  }
  const value = argv[i + 1]
  if (value === undefined || value.startsWith("--")) {
    die(`--${name} needs a value`)
  }
  flags[name] = value
  i += 1
}

const dryRun = Boolean(flags["dry-run"])
const [image] = positional

if (!image) die("no image given. Pass the screenshot as the first argument.")
if (!existsSync(image)) die(`no such file: ${image}`)
if (!flags.title) die("--title is required: the product, as its maker names it")
if (!flags.post) die("--post is required: the URL of the post it came from")
if (!flags.alt) {
  die(
    "--alt is required: what the screenshot shows, the arrangement rather than\n" +
      "        the pixels. Nothing can generate this for you."
  )
}

/*
  The handle out of the post URL. An X status is
  `https://x.com/<handle>/status/<id>`, so the author is in the link the curator
  already has, and asking for it again is a chance to mistype it.
*/
const postMatch = flags.post.match(
  /^https:\/\/x\.com\/([A-Za-z0-9_]{1,15})\/status\/\d+/
)
if (!flags.post.startsWith("https://x.com/")) {
  die(`--post must be an https x.com link, got ${flags.post}`)
}
const handle = flags.x ?? postMatch?.[1]
if (!handle) {
  die(
    `could not read a handle out of ${flags.post}\n` +
      "        Pass --x <handle>, or check the post URL."
  )
}

const name = flags.name ?? handle
const slug = flags.slug ?? kebab(flags.title)
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  die(`slug "${slug}" is not kebab-case. Pass --slug explicitly.`)
}

/* Today, unless told otherwise. The gallery sorts on this as a string, so the
   format is fixed rather than locale-dependent. */
const added = flags.date ?? new Date().toISOString().slice(0, 10)
if (!/^\d{4}-\d{2}-\d{2}$/.test(added)) {
  die(`--date must be YYYY-MM-DD, got ${added}`)
}

if (
  flags.url &&
  !flags.url.startsWith("https://") &&
  !flags.url.startsWith("/")
)
  die(`--url must be https or a site path, got ${flags.url}`)

const imageExt = normaliseExt(image)
const imageFile = `${slug}${imageExt}`
const avatarExt = flags.avatar ? normaliseExt(flags.avatar) : null
const avatarFile = flags.avatar ? `avatars/${handle}${avatarExt}` : null

if (flags.avatar && !existsSync(flags.avatar)) {
  die(`no such file: ${flags.avatar}`)
}

const source = await readFile(FEATURED_TS, "utf8")

if (source.includes(`slug: "${slug}"`)) {
  die(`"${slug}" is already featured. Pass a different --slug.`)
}

const imageVar = camel(slug)
const avatarVar = `${camel(handle)}Face`
for (const [label, variable] of [
  ["image", imageVar],
  ...(avatarFile ? [["avatar", avatarVar]] : []),
]) {
  if (new RegExp(`^import ${variable} from `, "m").test(source)) {
    die(
      `the ${label} import name \`${variable}\` is already taken in lib/featured.ts`
    )
  }
}

/*
  The new imports go directly under the type import, which is the only line
  above them in this file. Prettier sorts nothing here, so they simply
  accumulate; `check-featured.mjs` matches them by pattern rather than order.
*/
const importLines = [
  `import ${imageVar} from "@/public/featured/${imageFile}"`,
  ...(avatarFile
    ? [`import ${avatarVar} from "@/public/featured/${avatarFile}"`]
    : []),
].join("\n")

const anchor = 'import type { StaticImageData } from "next/image"\n'
if (!source.startsWith(anchor)) {
  die(
    "lib/featured.ts does not open with the StaticImageData import any more.\n        This script writes below that line; update it before using this again."
  )
}

const entry = [
  `  {`,
  `    slug: ${str(slug)},`,
  `    title: ${str(flags.title)},`,
  ...(flags.url ? [`    url: ${str(flags.url)},`] : []),
  `    alt: ${str(flags.alt)},`,
  `    name: ${str(name)},`,
  `    x: ${str(handle)},`,
  `    post: ${str(flags.post)},`,
  ...(avatarFile ? [`    avatar: ${avatarVar},`] : []),
  `    added: ${str(added)},`,
  ...(flags.home ? [`    home: true,`] : []),
  `    image: ${imageVar},`,
  `  },`,
].join("\n")

/* Newest last, matching the file's own instruction: the gallery sorts on
   `added`, so the array's order is for a person reading the diff. */
let next = source.replace(anchor, `${anchor}\n${importLines}\n`)
if (next.includes("export const FEATURED: FeaturedExample[] = []")) {
  next = next.replace(
    "export const FEATURED: FeaturedExample[] = []",
    `export const FEATURED: FeaturedExample[] = [\n${entry}\n]`
  )
} else {
  const marker = next.match(
    /export const FEATURED: FeaturedExample\[\] = \[[\s\S]*?\n\]/
  )
  if (!marker) die("could not find the FEATURED array in lib/featured.ts")
  next = next.replace(marker[0], `${marker[0].slice(0, -2)}\n${entry}\n]`)
}

/*
  The repo's own Prettier settings, not Prettier's defaults. `format` does not
  look for a config file on its own, and the defaults it falls back on put
  semicolons on every line: the first run of this script rewrote the whole file
  in a style the repo does not use, and `check-featured.mjs` then found no
  imports at all, because its pattern anchors on the closing quote.
*/
const prettierConfig = await prettier.resolveConfig(FEATURED_TS)
next = await prettier.format(next, { ...prettierConfig, filepath: FEATURED_TS })

if (dryRun) {
  console.log(c(33, "--dry-run: nothing written."))
  console.log(`\n  ${c(90, "would copy")} ${image}`)
  console.log(`  ${c(90, "        to")} public/featured/${imageFile}`)
  if (avatarFile) {
    console.log(`  ${c(90, "would copy")} ${flags.avatar}`)
    console.log(`  ${c(90, "        to")} public/featured/${avatarFile}`)
  }
  console.log(`\n${entry}\n`)
  process.exit(0)
}

await mkdir(IMAGES_DIR, { recursive: true })
if (avatarFile) await mkdir(AVATARS_DIR, { recursive: true })

await copyFile(image, join(IMAGES_DIR, imageFile))
if (avatarFile) await copyFile(flags.avatar, join(IMAGES_DIR, avatarFile))
await writeFile(FEATURED_TS, next, "utf8")

console.log(c(32, `Featured ${slug}`))
console.log(`  public/featured/${imageFile}${c(90, `  <- ${basename(image)}`)}`)
if (avatarFile) {
  console.log(
    `  public/featured/${avatarFile}${c(90, `  <- ${basename(flags.avatar)}`)}`
  )
}
console.log(`  lib/featured.ts${c(90, "  +1 entry")}`)
if (flags.home)
  console.log(c(33, "  home: true — take the flag off whatever it replaces."))

/* The same check CI runs, so a mistake surfaces here rather than in a build. */
await run("node", [join(ROOT, "pipeline", "check-featured.mjs")], {
  cwd: ROOT,
}).then(
  ({ stdout }) => process.stdout.write(stdout),
  ({ stdout, stderr }) => {
    process.stdout.write(stdout ?? "")
    process.stderr.write(stderr ?? "")
    process.exit(1)
  }
)

console.log(`\n${c(90, "Review the diff, then commit.")}`)

/** `"Acme Console"` -> `acme-console`. */
function kebab(value) {
  return value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
}

/** `acme-console` -> `acmeConsole`, which is what an import can be called. */
function camel(value) {
  const parts = kebab(value).split("-").filter(Boolean)
  return (
    parts[0] +
    parts
      .slice(1)
      .map((p) => p[0].toUpperCase() + p.slice(1))
      .join("")
  )
}

/** A TypeScript string literal, with the two characters that would break it. */
function str(value) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
}

/** Only the three raster formats the gallery is built for. */
function normaliseExt(path) {
  const ext = extname(path).toLowerCase()
  if (ext === ".jpeg") return ".jpg"
  if (ext === ".png" || ext === ".jpg") return ext
  return die(`${path} is ${ext || "extensionless"}; use a .png or .jpg`)
}
