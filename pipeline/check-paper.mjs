// Check the paper.design file against previews/paper/.
//
//   node pipeline/check-paper.mjs [--file <id>] [--json]
//
// `paper:check` proves the sheets on disk match `icons/`. It says nothing about
// the file those sheets were written into, and that gap is where the drift
// actually lives: an artboard is written once and then sits there while the set
// moves underneath it. A board of 48 icons against a sheet of 51 looks exactly
// like a board that is up to date.
//
// This is the Paper half of what `check-figma.mjs` does for Figma, and it is
// cheaper: Paper's MCP server is local HTTP with no auth, so this talks to it
// directly rather than emitting a snippet for someone to paste through a plugin
// console. It needs Paper Desktop open with the file in it, which is why it is
// not in `icons:ci` — the same reason `icons:figma` and `brand:check` sit out.
//
// **What it compares, and what it cannot.** Paper will not hand geometry back:
// `get_jsx` returns the layout with the drawings' paths stripped, and `export`
// answers a node with an empty list. So this compares *composition* rather than
// drawing — which artboards exist, how many drawings each holds, and what every
// one of them is called, since the importer names each layer `<name> <style>`
// off the sheets. That catches an icon added, removed, renamed, a category
// re-split, a board never imported and a board imported from an older sheet.
//
// It cannot catch a drawing that was redrawn while keeping its name and its
// place. Nothing available here can. Say so rather than implying the file is
// verified: what this proves is that the file holds the right icons, not that it
// holds the right drawings of them.

import { readFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const SHEETS = join(ROOT, "previews", "paper")
const ENDPOINT = process.env.PAPER_MCP ?? "http://127.0.0.1:29979/mcp"
const json = process.argv.includes("--json")

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

/**
 * The file to check, taken from the constant the site already links to.
 *
 * `SET_PAPER_URL` in `lib/site-chrome.ts` is the file the landing page's Paper
 * tab opens, so it is by definition the file that has to match the repository.
 * Reading it from there rather than keeping a second copy is the same call
 * `build-paper.mjs` makes about the category table.
 */
async function fileId() {
  const flag = process.argv.indexOf("--file")
  if (flag > -1 && process.argv[flag + 1]) return process.argv[flag + 1]

  const src = await readFile(join(ROOT, "lib", "site-chrome.ts"), "utf8")
  const url = /SET_PAPER_URL\s*=\s*\n?\s*"([^"]+)"/.exec(src)?.[1]
  const id = url && /\/file\/([^/?#]+)/.exec(url)?.[1]
  if (!id) {
    throw new Error(
      "no Paper file id: SET_PAPER_URL in lib/site-chrome.ts did not parse. Pass --file <id>."
    )
  }
  return id
}

/* One MCP session for the run. The transport answers as SSE, one `data:` line
   carrying the JSON-RPC body, and the session id comes back on the first call. */
let session = null

async function rpc(method, params) {
  const headers = {
    "content-type": "application/json",
    accept: "application/json, text/event-stream",
  }
  if (session) headers["mcp-session-id"] = session

  let res
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    })
  } catch {
    throw new Error(
      `${c(31, "Paper is not listening")} on ${ENDPOINT}.\n` +
        `Open Paper Desktop with the file, or set PAPER_MCP to its endpoint.`
    )
  }

  session ??= res.headers.get("mcp-session-id")
  const text = await res.text()
  const line = text.split("\n").find((l) => l.startsWith("data:"))
  if (!line) throw new Error(`unreadable answer from ${method}: ${text.slice(0, 200)}`)
  return JSON.parse(line.slice(5).trim())
}

async function call(name, args) {
  const out = await rpc("tools/call", { name, arguments: args })
  if (out.error) throw new Error(`${name}: ${JSON.stringify(out.error).slice(0, 200)}`)
  const body = (out.result?.content ?? [])
    .filter((x) => x.type === "text")
    .map((x) => x.text)
    .join("\n")
  /* A refusal arrives as a sentence in a successful result rather than as an
     error, so a caller that only checks `error` reads a quota message or a
     schema complaint as data. */
  if (out.result?.isError) throw new Error(`${name}: ${body.split("\n")[0]}`)
  return body
}

const LINE = /^(\s*)(\w+) "(.*?)" \(([^)]+)\) (\d+)×(\d+)(?: "(.*)")?$/

/** What one artboard actually holds: its drawings' names, and its captions. */
function read(summary) {
  const drawings = []
  const captions = []
  let truncated = /\.\.\. \d+ (children|more)/.test(summary)
  for (const raw of summary.split("\n")) {
    const m = LINE.exec(raw)
    if (!m) continue
    if (m[2] === "SVG") drawings.push(m[3])
    if (m[2] === "Text" && m[7]) captions.push(m[7])
  }
  return { drawings, captions, truncated }
}

/**
 * The same drawings, walked rather than summarised.
 *
 * `get_tree_summary` stops after a fixed number of lines and says nothing when
 * it does: no ellipsis, no marker, just a last line cut off mid-structure, so
 * the truncation `read` looks for never appears. Measured at 1000 lines on
 * 30 Aug 2026, the day the Changelog board crossed it, which is the first
 * release to record its redraws as before-and-after pairs. Read from the
 * summary alone, that board reports 162 of the 195 drawings it actually holds
 * and fails as STALE on every run, and a check that cannot pass is a check
 * nobody keeps running.
 *
 * One call per container rather than one per board, so this is the second
 * opinion and not the first: it is taken only where the summary and the sheets
 * already disagree and the run was going to fail anyway. `childCount` keeps it
 * off the leaves. Captions are not here because `get_children` carries names
 * and geometry, no text.
 */
async function walkDrawings(nodeId, id, into = []) {
  const kids = JSON.parse(await call("get_children", { nodeId, fileId: id })).children ?? []
  for (const kid of kids) {
    /* Stop at the drawing, as the summary does: descending collects its own
       paths, which come back as SVGVisualElement. */
    if (kid.component === "SVG") into.push(kid.name)
    else if (kid.childCount) await walkDrawings(kid.id, id, into)
  }
  return into
}

/** What the sheets say that artboard should hold. */
async function expected(files) {
  const drawings = []
  const captions = []
  for (const file of files) {
    const html = await readFile(join(SHEETS, file), "utf8")
    /* Name, style and treatment, in the order `build-paper.mjs` writes them.
       The suffix is what tells a sharp cell from the rounded one beside it:
       both draw the same icon in the same style, so on names alone a board
       with the two halves swapped would compare equal. */
    for (const [, name, style, corners] of html.matchAll(
      /data-icon="([^"]+)" data-style="([^"]+)" data-corners="([^"]+)"/g
    )) {
      drawings.push(`${name} ${style}${corners === "sharp" ? " sharp" : ""}`)
    }
    for (const [, base] of html.matchAll(/data-icon-set="([^"]+)"/g)) captions.push(base)
  }
  return { drawings, captions }
}

const manifest = JSON.parse(await readFile(join(SHEETS, "manifest.json"), "utf8"))

/** Manifest entries grouped into the artboards they were written into. */
const boards = new Map()
for (const sheet of manifest.sheets) {
  if (!boards.has(sheet.artboard)) boards.set(sheet.artboard, [])
  boards.get(sheet.artboard).push(sheet.file)
}

const id = await fileId()
await rpc("initialize", {
  protocolVersion: "2025-06-18",
  capabilities: {},
  clientInfo: { name: "keyline-check-paper", version: "1" },
})

/* Every page, because the file puts the changelog on its own and an artboard
   looked for on the wrong page reads as missing. */
const opened = JSON.parse(await call("open_file", { fileId: id }))
const pages = JSON.parse(await call("get_basic_info", { fileId: id })).pages ?? []
const found = new Map()
for (const page of pages) {
  await call("open_file", { fileId: id, pageId: page.id })
  const info = JSON.parse(await call("get_basic_info", { fileId: id }))
  for (const board of info.artboards) found.set(board.name, { ...board, page: page.name })
}

const findings = []
for (const [name, files] of boards) {
  const board = found.get(name)
  if (!board) {
    findings.push({ board: name, kind: "MISSING", detail: "not in the file" })
    continue
  }

  const want = await expected(files)
  const summary = JSON.parse(
    await call("get_tree_summary", { nodeId: board.id, depth: 8, fileId: id })
  ).summary
  const got = read(summary)

  /* A capped summary under-reports, and under-reporting looks exactly like a
     board that never took its import. So a disagreement is read a second time,
     the slow way, before it is believed. */
  if (got.truncated || got.drawings.length !== want.drawings.length) {
    got.drawings = await walkDrawings(board.id, id)
    got.truncated = false
  }

  if (got.drawings.length !== want.drawings.length) {
    findings.push({
      board: name,
      kind: "STALE",
      detail: `${got.drawings.length} drawings in Paper, ${want.drawings.length} in the sheets`,
    })
    continue
  }

  /* Layer names are the importer's, taken from the sheets. All of them still
     reading "SVG" means the board was written but never named, which is a
     different job from re-importing it.
     `length` first, because `[].every()` is true: without it the changelog,
     which is prose and holds no drawings at all, reported itself unnamed. */
  if (got.drawings.length && got.drawings.every((x) => x === "SVG")) {
    findings.push({ board: name, kind: "UNNAMED", detail: "imported but never named" })
    continue
  }

  const wrong = got.drawings.filter((x, i) => x !== want.drawings[i])
  if (wrong.length) {
    findings.push({
      board: name,
      kind: "DRIFT",
      detail: `${wrong.length} drawings differ, first is "${wrong[0]}" where the sheet says "${
        want.drawings[got.drawings.indexOf(wrong[0])]
      }"`,
    })
  }
}

for (const [name, board] of found) {
  if (boards.has(name)) continue
  findings.push({ board: name, kind: "ORPHAN", detail: `on ${board.page}, no sheet builds it` })
}

if (json) {
  console.log(JSON.stringify({ file: id, boards: boards.size, findings }, null, 2))
} else {
  const total = [...boards.values()].reduce((n, f) => n + f.length, 0)
  console.log(`${opened.fileName ?? id}: ${boards.size} artboards from ${total} sheets`)
  for (const f of findings) {
    console.log(`  ${c(33, f.kind.padEnd(10))} ${f.board.padEnd(16)} ${f.detail}`)
  }
  if (!findings.length) {
    console.log(
      c(32, `Paper matches previews/paper/ across ${boards.size} artboards`) +
        `\nComposition and names only: nothing here can see the drawings themselves.`
    )
  } else {
    console.log(
      `\nRe-import the boards above. Do not delete them: write_html takes` +
        ` mode: "replace" against an artboard's child, which swaps the contents` +
        ` and leaves the artboard's id, name and canvas position alone.` +
        `\nThe position is the reason. Nothing here records it, so a board` +
        ` deleted and recreated comes back at the origin.`
    )
  }
}

if (!existsSync(join(SHEETS, "manifest.json"))) process.exit(1)
process.exit(findings.length ? 1 : 0)
