#!/usr/bin/env node
// The Keyline Icons MCP server.
//
// Speaks JSON-RPC 2.0 over stdio, by hand, with no SDK. The protocol surface a
// tools-only server needs is four methods, and the official SDK would be the
// single dependency in a repo that otherwise has none. Adding one to save
// eighty lines is a bad trade when the eighty lines are this stable.
//
//   npx @keyline-icons/mcp
//
// **stdout is the wire.** Anything printed there that is not a JSON-RPC
// message corrupts the stream and the client disconnects with a parse error
// that names nothing useful. Every diagnostic in this file goes to stderr, and
// that is not a style preference: a stray console.log here is the single most
// common way an MCP server appears to "not work".

import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const HERE = fileURLToPath(new URL(".", import.meta.url))
const data = JSON.parse(
  await readFile(new URL("../icons.json", import.meta.url), "utf8")
)
const { icons, styles, keywords = {} } = data
const NAMES = Object.keys(icons)

const VERSION = "0.1.4"
/** Fallback only. The client's requested version is echoed when it sends one. */
const PROTOCOL = "2024-11-05"

const log = (...a) => process.stderr.write(a.join(" ") + "\n")

/* ------------------------------------------------------------------ icons */

/** The full SVG for one name and style, as it appears in `icons/<style>/`. */
function svgFor(name, style) {
  const art = icons[name]?.[style]
  if (!art) return null
  const attrs = Object.entries(art.root)
    .map(([k, v]) => ` ${k}="${v}"`)
    .join("")
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ` +
    `viewBox="0 0 24 24"${attrs}>${art.body}</svg>`
  )
}

const pascal = (name) =>
  name
    .split("-")
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join("")

/**
 * The query split into the words that must each land somewhere in a name.
 *
 * A query carrying a camelCase boundary is a component identifier someone
 * pasted out of their code rather than a phrase they typed, `CheckCircle2` or
 * `RefreshCw`, so it is split on those boundaries, and a leftover bare number
 * is dropped, because lucide's trailing `2` disambiguates inside lucide and
 * means nothing here.
 *
 * Two shapes count as an identifier: a camelCase boundary, and a single
 * capitalised word ending in digits. `Share2` is the second and has no boundary
 * anywhere, so the camelCase rule alone left it as one word and found nothing
 * while `share` sat in the set. `CheckCircle2` only ever worked because `kC`
 * happens to trip the first rule.
 *
 * Only identifiers are treated that way. `clock-3` and `dice-5` are real names
 * in this set, so a lowercase query keeps its digits and can still reach them.
 */
function wordsOf(query) {
  const identifier =
    /[a-z][A-Z]/.test(query) || /^[A-Z][A-Za-z]*\d+$/.test(query)
  const split = identifier
    ? query
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    : query
  return split
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w && !(identifier && /^\d+$/.test(w)))
}

/**
 * Rank matches so the obvious answer is first.
 *
 * An agent asking for "arrow" wants `arrow-down` before
 * `square-arrow-down-dashed`, and asking for "check" wants `check` itself
 * rather than the twelve compounds that contain it. Exact beats prefix beats
 * word-boundary, and shorter breaks ties, because the shorter name is the more
 * general glyph in this set's naming scheme.
 *
 * The query is also matched word by word, which is what lets a name borrowed
 * from another set land. Compounds here read base-first, so an agent carrying
 * lucide's `CheckCircle2` asks for "check-circle", and matching the whole
 * string against the name finds nothing, because the icon is `circle-check`.
 * The honest answer there is that the words arrived in the other order, not that
 * the set lacks the glyph, and the difference is not academic: a migration
 * shipped a plain `check` because `circle-check` looked absent, in a set that
 * has it in all three styles. The site's search has always split the query
 * this way. This is the agent-facing copy catching up.
 *
 * Scattered matches rank below every contiguous one, so a direct query comes
 * back ordered exactly as it did before.
 */
/**
 * The words a name can be found by: the name itself, plus whatever is written
 * about it.
 *
 * Keywords are keyed by base name, because one component set in Figma covers
 * all three containers, so `square-arrow-down` reads `arrow-down`'s words. The
 * prefix only counts when that base exists: `circle-half` is a shape in its own
 * right and there is no `half` for it to contain.
 *
 * Searched as one string rather than as a separate tier, which is what lets a
 * query take a word from each: "help circle" finds `circle-question` because
 * `circle` is in the name and `help` is in the words. Matching the whole query
 * against one keyword, which is what this used to do, could never do that.
 */
function keywordsFor(name) {
  const m = /^(square|circle)-(.+)$/.exec(name)
  return keywords[m && icons[m[2]] ? m[2] : name] || []
}

const haystackFor = (name) => `${name} ${keywordsFor(name).join(" ")}`

/**
 * What another set calls a drawing here: `message-square` for `message`,
 * `arrow-big-up` for `arrow-up`, `loader-2` for `loader`.
 *
 * Matched against the whole query and never split into words, which is the
 * entire reason it is a map of its own rather than more keywords. Folded into
 * the vocabulary instead, `message-square` puts "square" in the message icon's
 * words, and a search for `square` answers with every message in the set —
 * measured on the site's own grid, where the first row of a `square` search
 * came back holding no squares at all.
 */
const foreign = data.names ?? {}

/**
 * Whether `hay` carries `needle` as a whole word, hyphen or space delimited.
 *
 * The rule here used to be a plain substring, and a substring lands inside
 * words that have nothing to do with the query: `box` matched `inbox`, `ad`
 * matched `upload`, `car` matched `caret-up`, `monitor` matched `activity`
 * through its words. Run another set's 1775 names through this and 140 came back
 * holding an icon that shares no word with what was asked for. That reads as a
 * hit, which is worse than an empty result twice over: it hides the gap from
 * anyone counting, and it hands the caller a drawing they did not ask for.
 *
 * The site keeps the looser rule on purpose. It answers every keystroke, and
 * someone typing `arro` has not finished the word yet. Nothing types here. An
 * agent sends a whole name, and the honest answer to a name this set does not
 * have is nothing at all.
 */
const wholeWord = (hay, needle) => {
  for (let i = hay.indexOf(needle); i !== -1; i = hay.indexOf(needle, i + 1)) {
    const before = hay[i - 1] ?? "-"
    const after = hay[i + needle.length] ?? "-"
    if ((before === "-" || before === " ") && (after === "-" || after === " "))
      return true
  }
  return false
}

function search(query, style, limit) {
  const q = query.toLowerCase().trim()
  const words = wordsOf(query)
  if (!words.length) return []

  const hits = []
  for (const name of NAMES) {
    if (style && !icons[name][style]) continue

    let rank
    if (name === q) rank = 0
    else if (foreign[q] === name) rank = 1
    else if (name.startsWith(q + "-")) rank = 2
    else if (wholeWord(name, q)) rank = 3
    else if (words.every((w) => wholeWord(name, w))) rank = 4
    else if (words.every((w) => wholeWord(haystackFor(name), w))) rank = 5
    else continue

    hits.push({ name, rank })
  }
  hits.sort(
    (a, b) =>
      a.rank - b.rank ||
      a.name.length - b.name.length ||
      a.name.localeCompare(b.name)
  )
  return hits.slice(0, limit).map((h) => ({
    name: h.name,
    styles: Object.keys(icons[h.name]),
  }))
}

/* ------------------------------------------------------------------ tools */

const STYLE_ENUM = { type: "string", enum: styles }

const TOOLS = [
  {
    name: "search_icons",
    description:
      "Find icons by name. Returns matching names and which of the three styles " +
      "each one has. Names are kebab-case and compounds read base-first, so a " +
      "mail icon with a tick is `mail-check`, not `check-mail`. Search the base " +
      "word to find a family. Word order does not matter and a component name " +
      "from another set is accepted as written, so `CheckCircle2` finds " +
      "`circle-check`. Trust an empty result: it means the set has no such icon.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Substring to match, e.g. `arrow` or `mail`.",
        },
        style: {
          ...STYLE_ENUM,
          description: "Only return icons that have this style.",
        },
        limit: {
          type: "integer",
          description: "Max results. Default 25.",
          minimum: 1,
          maximum: 200,
        },
      },
      required: ["query"],
    },
  },
  {
    name: "get_icon",
    description:
      "The full SVG source for one icon, ready to paste. Colour comes from " +
      "`currentColor`, so it inherits whatever text colour is in scope.",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Exact icon name, e.g. `circle-arrow-down`.",
        },
        style: {
          ...STYLE_ENUM,
          description: "Defaults to `stroke`, the only style every icon has.",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "get_react_usage",
    description:
      "The import line and JSX for one icon from `@keyline-icons/react`. Each " +
      "style is its own entry point because they do not cover the same icons.",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Exact icon name, e.g. `circle-arrow-down`.",
        },
        style: { ...STYLE_ENUM, description: "Defaults to `stroke`." },
      },
      required: ["name"],
    },
  },
  {
    name: "describe_set",
    description:
      "What this set is: how many icons, which styles, and the rule that decides " +
      "which icons have which style. Call this first when deciding whether the set " +
      "covers what you need.",
    inputSchema: { type: "object", properties: {} },
  },
]

const text = (s) => ({ content: [{ type: "text", text: s }] })
const fail = (s) => ({ content: [{ type: "text", text: s }], isError: true })

/**
 * The longest query worth answering.
 *
 * `nearest` below walks every name and costs O(query x name) per name, so its
 * price is set by whatever the caller sent. That is fine for a query someone
 * typed and is not fine as the only limit: a 200KB query takes ten seconds, and
 * because this server is one process reading one stream, every other request
 * queued behind it waits the whole time. A client that times out at thirty
 * seconds loses the connection over a single malformed call.
 *
 * 200 rather than something tighter because the point is to bound the work, not
 * to police the query: the longest name in the set is under 40 characters, so
 * anything past this is an accident or an attack either way.
 */
const MAX_QUERY = 200

/** Levenshtein, iterative with one row. 503 names is nothing to walk. */
function distance(a, b) {
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      )
    }
    prev = cur
  }
  return prev[b.length]
}

/**
 * A name close to what was asked for, so a typo is recoverable in one turn.
 *
 * Substring matching alone is not enough here, and the failing case is the
 * common one: `chekc` shares no substring with `check`, so a search-based
 * suggestion returns nothing and the agent is told only that it was wrong.
 * Edit distance catches transpositions, which is what typos mostly are.
 */
function nearest(name) {
  // Guarded here as well as at the `search_icons` boundary, because `get_icon`
  // and `get_react_usage` reach this with a `name` that has had no length check
  // of its own, and this is the expensive half of all three tools.
  if (name.length > MAX_QUERY) return ""

  const q = name.toLowerCase()
  const sub = search(q, null, 5).map((h) => h.name)
  if (sub.length) return ` Did you mean: ${sub.join(", ")}?`

  const near = NAMES.map((n) => ({ n, d: distance(q, n) }))
    .filter(({ n, d }) => d <= Math.max(2, Math.floor(n.length * 0.34)))
    .sort((a, b) => a.d - b.d || a.n.length - b.n.length)
    .slice(0, 5)
    .map((h) => h.n)
  if (near.length) return ` Did you mean: ${near.join(", ")}?`

  // Last tier: the query may be a misspelled *family* rather than an icon.
  // `arow` is one edit from `arrow`, but there is no bare `arrow` in the set,
  // so whole-name distance finds nothing: the real answers, `arrow-up` and its
  // siblings, are four edits away. Comparing leading segments finds them.
  const head = q.split("-")[0]
  const family = NAMES.map((n) => ({ n, d: distance(head, n.split("-")[0]) }))
    .filter(({ d }) => d <= 2)
    .sort((a, b) => a.d - b.d || a.n.length - b.n.length)
    .slice(0, 5)
    .map((h) => h.n)
  return family.length ? ` Did you mean: ${family.join(", ")}?` : ""
}

/**
 * `args ?? {}` rather than a default parameter, which only fires on `undefined`.
 *
 * A client is entitled to send `"arguments": null` for a call that takes none,
 * and several do. A default parameter lets that through untouched, so the first
 * destructuring below threw and the client got a JavaScript TypeError wearing an
 * `-32603 Internal error`, which reads as a broken server rather than as an
 * empty argument list.
 */
function callTool(name, args) {
  args = args ?? {}
  switch (name) {
    case "describe_set":
      return text(
        [
          `Keyline Icons: ${data.count} icons on a 24x24 grid, MIT licensed.`,
          ``,
          ...styles.map(
            (s) => `  ${s}: ${NAMES.filter((n) => icons[n][s]).length} icons`
          ),
          ``,
          `Every icon has a stroke drawing. Duotone and fill additionally require a`,
          `fillable region, which comes from the glyph's own enclosed area or from a`,
          `square/circle container. An open glyph like bar-chart has none, so it is`,
          `stroke-only; square-bar-chart puts the same glyph in a container and has`,
          `all three. That is measured off the outline, not decided by hand, which is`,
          `why the per-style counts differ.`,
          ``,
          `Names are kebab-case. Compounds read base-first: mail-check, not check-mail.`,
          `Container variants are prefixed: square-arrow-down, circle-arrow-down.`,
        ].join("\n")
      )

    case "search_icons": {
      const { query, style, limit = 25 } = args
      if (typeof query !== "string" || !query.trim())
        return fail("`query` is required.")
      if (query.length > MAX_QUERY)
        return fail(
          `\`query\` is ${query.length} characters. The longest name in the set ` +
            `is under 40, so anything over ${MAX_QUERY} is refused.`
        )
      if (style && !styles.includes(style))
        return fail(`Unknown style \`${style}\`. One of: ${styles.join(", ")}.`)
      const hits = search(
        query,
        style ?? null,
        Math.min(Math.max(limit, 1), 200)
      )
      // A bare "no match" is the one answer an agent cannot act on: it reads as
      // "this set has no such icon" when it usually means the word was spelled
      // or ordered differently here. `nearest` is what `get_icon` already says
      // in the same situation, and it costs a walk of the names only on a miss.
      if (!hits.length)
        return text(
          `No icon matches "${query}"${style ? ` in ${style}` : ""}.${nearest(query)}`
        )
      return text(
        `${hits.length} match${hits.length === 1 ? "" : "es"} for "${query}"${style ? ` in ${style}` : ""}:\n\n` +
          hits.map((h) => `  ${h.name}  [${h.styles.join(", ")}]`).join("\n")
      )
    }

    case "get_icon": {
      const { name: icon, style = "stroke" } = args
      if (typeof icon !== "string") return fail("`name` is required.")
      if (!styles.includes(style))
        return fail(`Unknown style \`${style}\`. One of: ${styles.join(", ")}.`)
      if (!icons[icon])
        return fail(`No icon named \`${icon}\`.${nearest(icon)}`)
      const svg = svgFor(icon, style)
      if (!svg) {
        return fail(
          `\`${icon}\` has no ${style} style. It has: ${Object.keys(icons[icon]).join(", ")}. ` +
            `Duotone and fill need a fillable region and this glyph has none.`
        )
      }
      return text(svg)
    }

    case "get_react_usage": {
      const { name: icon, style = "stroke" } = args
      if (typeof icon !== "string") return fail("`name` is required.")
      if (!styles.includes(style))
        return fail(`Unknown style \`${style}\`. One of: ${styles.join(", ")}.`)
      if (!icons[icon]?.[style]) {
        return fail(
          `\`${icon}\` has no ${style} style.` +
            (icons[icon]
              ? ` It has: ${Object.keys(icons[icon]).join(", ")}.`
              : nearest(icon))
        )
      }
      const entry =
        style === "stroke"
          ? "@keyline-icons/react"
          : `@keyline-icons/react/${style}`
      const C = pascal(icon)
      return text(
        `import { ${C} } from "${entry}"\n\n<${C} className="size-4" />\n\n` +
          `Inside a shadcn/ui Button or Sidebar, drop the className: those primitives ` +
          `size nested SVGs themselves.`
      )
    }

    default:
      return fail(`Unknown tool \`${name}\`.`)
  }
}

/* ----------------------------------------------------------------- server */

const send = (msg) => process.stdout.write(JSON.stringify(msg) + "\n")
const reply = (id, result) => send({ jsonrpc: "2.0", id, result })
const error = (id, code, message) =>
  send({ jsonrpc: "2.0", id, error: { code, message } })

function handle(msg) {
  /*
    A line that parsed but is not a request object.

    `null` is the one that mattered: destructuring it throws, and the catch
    around this call then read `msg.id` off the same `null` and threw again,
    outside any try, which killed the process. A stray `null` on the stream took
    the whole server down and the client saw it disappear rather than answer.

    `[]` and a bare string never crashed, because destructuring those works, but
    they fell through to the notification branch and were silently ignored.
    -32600 is what the spec asks for and covers all three.
  */
  if (typeof msg !== "object" || msg === null || Array.isArray(msg)) {
    return error(null, -32600, "Invalid Request")
  }

  const { id, method, params } = msg

  // A notification has no id and must never be answered. Replying to one is a
  // protocol violation that some clients treat as fatal.
  const isNotification = id === undefined || id === null

  switch (method) {
    case "initialize":
      return reply(id, {
        // Echo the client's version rather than insisting on ours. This server
        // uses no version-specific features, so refusing a newer client would
        // be a refusal on principle alone.
        protocolVersion: params?.protocolVersion ?? PROTOCOL,
        capabilities: { tools: {} },
        serverInfo: { name: "keyline-icons", version: VERSION },
      })

    case "notifications/initialized":
    case "notifications/cancelled":
      return

    case "ping":
      return reply(id, {})

    case "tools/list":
      return reply(id, { tools: TOOLS })

    case "tools/call": {
      const out = callTool(params?.name, params?.arguments)
      return reply(id, out)
    }

    default:
      if (isNotification) return
      return error(id, -32601, `Method not found: ${method}`)
  }
}

let buffer = ""
process.stdin.setEncoding("utf8")
process.stdin.on("data", (chunk) => {
  buffer += chunk
  // Messages are newline-delimited, and a chunk boundary can land mid-message,
  // so the tail is kept until its newline arrives.
  let nl
  while ((nl = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, nl).trim()
    buffer = buffer.slice(nl + 1)
    if (!line) continue
    let msg
    try {
      msg = JSON.parse(line)
    } catch {
      error(null, -32700, "Parse error")
      continue
    }
    try {
      handle(msg)
    } catch (e) {
      log(`[keyline-icons] ${e?.stack ?? e}`)
      // `msg?.id`, because this is the handler for a message that already went
      // wrong and it must not be the second thing to throw. It was: a `null`
      // message threw in `handle`, landed here, and `msg.id` threw again with
      // nothing left to catch it.
      if (msg?.id !== undefined && msg?.id !== null) {
        error(msg.id, -32603, `Internal error: ${e?.message ?? e}`)
      }
    }
  }
})

process.stdin.on("end", () => process.exit(0))
log(`[keyline-icons] MCP server ready, ${data.count} icons, from ${HERE}`)
