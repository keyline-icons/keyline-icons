# Community listing copy

Everything the Figma publish modal asks for, written out so it survives the
session it was drafted in. This file is the source; the modal is a copy of it.

Counts here are checked by `pipeline/check-readmes.mjs`, so they cannot drift
away from `icons/` without CI failing.

## Two listings, two modals

This repository publishes **two** Community resources and they are edited in
different places with different copy:

- **The plugin**, at `Plugins` → `Manage plugins` → `Publish`. Everything below
  from "Where the modal is" onward is that one.
- **The file**, from the Figma file itself: the toolbar's `Share` button, then
  `Update Community file` in the lower half of that dialog. Three pages:
  Describe your resource, Set a thumbnail, Add the final details. Its copy is
  in "The file listing" at the bottom of this file.

  **It is not in either file menu.** It was under the file name menu once, and
  on 26 Aug 2026 it was in neither that menu nor the Figma logo's `File`
  submenu, and the Actions palette did not surface it either. Note that Figma's
  own help page still calls the entry `Publish to Community`, and the dialog
  says `Update Community file`, so searching for the documented wording finds
  nothing. If it has moved again when you read this, go to the resource from
  the Community profile rather than searching the editor.

  Figma treats an update as a new version and leaves existing duplicates alone,
  so a file listing never reaches anyone who already duplicated it. The plugin
  is the surface that updates in place, which is worth remembering before
  putting anything time-sensitive in the file's copy.

They are not the same words and updating one does not update the other. The
file's description went stale at 503 icons while the plugin's was current,
because only the plugin's was written down.

## Where the modal is

Figma logo, upper left, then `Plugins` → `Manage plugins`. Select the plugin,
choose `Publish`. Four pages:

1. **Describe your resource.** Name, tagline, description. Both name and tagline
   are capped at 100 characters, counted live in the modal. Figma's help page
   also lists a category on this page; the modal did not show one in August 2026.
2. **Choose some images.** Icon, thumbnail, an optional playground file, carousel.
3. **Data security.** The disclosure form. Optional.
4. **Add the final details.** Where to publish, contributors, support contact,
   the network access review, pricing.

Sizes below are the ones Figma's own help page states: 128 × 128 for the icon,
1920 × 1080 for the thumbnail, up to nine carousel images or videos.

Afterwards the listing carries an `In review` badge and the decision arrives by
email. Figma publishes no target turnaround, only that "approval times vary
depending on current volume and the team's availability", so do not promise
anyone a date.

---

## Name

```
Keyline Icons
```

## Tagline

```
585 icons, three styles, rounded or sharp corners. Searchable in Figma and FigJam.
```

Capped at 100 characters. The line above is 81, so there is still room. A
shorter alternative if it ever needs one:

```
599 icons in three styles, cut rounded or sharp.
```

## Description

**One line per paragraph**, for the reason given under *The file listing*: the
field keeps newlines rather than reflowing. The style bullets are the exception,
where the breaks are the list.

The changelog is part of the description rather than the Release notes field,
which only ever shows the newest entry. Someone deciding whether to install
wants to see the set is maintained, and that is what a history says.

```
Search 599 icons and drop one on the canvas. No library to publish, no file to duplicate, no plan requirement.

Three styles

* Stroke: 599 icons, 2px, round caps and joins
* Duotone: 494 icons, a 40% plate under the line
* Fill: 446 icons, solid where the glyph has a region to fill

Two corner treatments, and every drawing has both. Rounded is the keyline the set was drawn on; sharp takes every corner to a true point and ends each stroke square. Coverage is identical, so switching never costs you a drawing. 2,994 SVGs in total.

55 icons also come in a square- form and 54 in a circle- form, so a container is a search away rather than a second drawing.

Search knows more than the file names. 480 icons carry curated words, so "south" finds arrow-down, "hamburger" finds menu and "trash" finds bin. Paste a component name straight out of your code and it resolves: CheckCircle2 finds circle-check.

In a design file an insert arrives as a 24 × 24 frame, which is what makes a row of icons line up. In FigJam it arrives as a group, so FigJam's colour control reaches the drawing instead of painting a box around it. Double-click into one and every path takes its own colour, which is how a gift gets a red box and a yellow bow, and how duotone keeps both of its tones.

Every drawing sits on one 24 × 24 grid with a shared keyline, so icons of different weights still read as one family at the same size.

MIT licensed. The set, the site and this plugin are all open source.

keylineicons.com
github.com/keyline-icons/keyline-icons

Changelog

0.3.0 — 31 August 2026
Sharp corners, across the whole set. Every drawing gained a squared-off twin, taking the set from 1,497 SVGs to 2,994 over the same 585 names, and the plugin gained a second row to switch between them. Coverage matches rounded exactly, so switching never leaves you without an icon. 48 drawings redrawn in both treatments, mostly the -off family and the level indicators.

0.2.0 — 27 August 2026
39 new drawings, and one rename: tag-horizontal is now tag-horizontal-start, because the batch drew its mirror and neither form is the other's variant. That breaks the React import, which is why this is 0.2.0 and not 0.1.5.

* Security: shield, with check, plus, minus and x
* Tools: toolbox, wrench, hammer and pencil-ruler
* Controls: power and power-off, grip-horizontal and grip-vertical, sliders-2-horizontal and sliders-2-vertical
* Layout: grid-circles and grid-squares, each with a check and an x
* Shapes: circles and circles-dashed, circle-square and circle-square-dashed
* Commerce: percent, with circle- and square- forms, and the horizontal tag as tag-horizontal-start and tag-horizontal-end with a percent form of each
* Others: plug, lightbulb, lightbulb-on, ban, octagon-x, cursor-off and megaphone

Also redrawn: pause in bare, circle and square forms, and play in its circle and square.

0.1.4 — 25 August 2026
No drawing changes. The CLI and MCP packages were shipping 527 icons while the React package shipped 547, so all three are reissued together: 0.1.4 is the same set in every package.

0.1.3 — 25 August 2026
Two corrections: queue redrawn to 22×18, the horizontal size the set uses for a plate with rules beneath it; repeat-1's numeral given two more units of stem.

0.1.2 — 24 August 2026
20 new drawings:

* Playback: repeat, repeat-1, queue, podcast and cast
* Captions: captions and subtitles, the double-C and the ruled plate
* Video: list-video, picture-in-picture, and six galleries, horizontal and vertical with a -start and an -end for each
* Screen: fullscreen, fullscreen-exit, maximize and minimize
* Files: copy-plus

Also redrawn: shuffle, cut where its strands cross.

0.1.1 — 23 August 2026
24 new drawings:

* Sport: trophy, award, and podium with 1, 2 and 3 place variants
* Devices: monitor, monitor-off, bluetooth, and battery at four levels
* Layout: layout-dashboard, and grid in 2x2, 2x3, 3x2 and 3x3
* Others: alert, in bare, circle and square forms; building; loader; heart-hand

0.1.0 — 20 August 2026
The first cut of the set: 503 drawings on one 24 × 24 grid, at a 2px keyline, built for shadcn/ui and free under the MIT licence.
```

## Category

```
Icon Packs
```

## Tags

**Five custom tags, no more.** The modal refuses a sixth and outlines the field
in red. There is also a Recommended row Figma populates itself, App, Social
media, 3D and Vector at the time of writing; `Vector` is worth taking and
appears not to count against the five, though that is unverified.

```
figjam
duotone
sharp icons
open source
design system
```

Chosen against what the listing already says elsewhere. `icons`, `icon set` and
`svg` are implied by the name and by the Icon Packs category, so a slot spent
restating them buys little. `stroke` and `outline icons` are the default
expectation for an icon set. `free icons` overlaps `open source`, and page four
marks the plugin Free natively.

That leaves the five that actually distinguish it: FigJam support is rare among
icon plugins, 480 duotone drawings are rare among icon sets, a set that ships
every drawing rounded *and* sharp is rarer still, and the rest name the audience
rather than the artefact.

`sharp icons` took `ui icons`'s slot in 0.3.0. `ui icons` was the weakest of the
five on the file's own test — the Icon Packs category and the description
already say it — and the corner treatment is the thing someone is searching for
who would otherwise leave.

`lucide alternative` is deliberately absent. It is the highest-intent term
available and Figma's review criteria mention trademark compliance, so a
competitor's project name in the tags is a grey area not worth a rejection
cycle on a first submission. Worth revisiting once published.

## Release notes

Republishing shows a **Release notes** field. It is the one part of the listing
that is per-version rather than standing copy, so each release adds an entry
here and the modal takes the top one.

**Before republishing, check whether you need to.** The icon set is fetched from
jsDelivr at run time rather than bundled, so new drawings reach every user
without a plugin update or a review cycle. A republish is only required when the
plugin's own code changes, or when the listing copy goes stale, which it does
every time the counts move. jsDelivr serves the repository, so the drawings have
to be **pushed** before any of this is true for anyone but you.

### 0.3.0

```
Sharp corners. Every drawing now comes rounded or sharp — 2,994 SVGs against
585 names — and the plugin has a second row under the styles to switch between
them. Coverage is identical in both, so nothing goes missing when you switch.

48 drawings were redrawn along the way, mostly the -off family and the level
indicators, in both treatments.
```

The plugin's own code changed this time, so this republish is required rather
than optional: the corners row is new. The drawings themselves would have
arrived on their own.

### 0.1.4

Everything below landed while the listing still described 0.1.0, so this is one
entry covering the span rather than four.

```
Two releases of new drawings since this listing was written, and all three
packages reissued so every one of them ships the same set.

Playback   captions, subtitles, cast, podcast, queue, repeat, repeat-1 and
           list-video, with shuffle redrawn
Gallery    gallery-horizontal and gallery-vertical, each with a start and an
           end form
Screen     fullscreen, fullscreen-exit, maximize, minimize and
           picture-in-picture
Sport      trophy, award, and podium with 1, 2 and 3 place variants
Devices    monitor, monitor-off, bluetooth, and battery at four levels
Layout     layout-dashboard, and grid in 2x2, 2x3, 3x2 and 3x3
Also       alert, in bare, circle and square forms; building; loader;
           heart-hand; megaphone; copy-plus

Nothing to install. The set is fetched at run time, so these drawings were
already reaching you; this publish is the listing catching up.
```

Deliberately no total. The published listing states its own counts on page one
and the site computes them; a number typed into the notes as well is a third
copy of a fact two surfaces already agree on, and it is the copy that goes
wrong.

### 0.1.1

```
24 new drawings, and a Sport category.

Sport      trophy, award, and podium with 1, 2 and 3 place variants
Devices    monitor, monitor-off, bluetooth, and battery at four levels
Layout     layout-dashboard, and grid in 2x2, 2x3, 3x2 and 3x3
Also       alert, in bare, circle and square forms; building; loader; heart-hand

Search picked up the words for all of them, so "screen" finds monitor,
"spinner" finds loader and "office" finds building.
```

Kept to the shelves rather than a flat list of 24, because the shelf is what
tells a reader whether the release covers anything they were missing. The full
list by name is on `/changelog` and on the Changelog page of the Figma file.

## Support contact

```
https://github.com/keyline-icons/keyline-icons/issues
```

---

## Assets

| Field | File | Size |
| --- | --- | --- |
| Plugin icon | `packages/figma-plugin/icon.png` | 128 × 128 |
| Cover art | `previews/plugin-cover.png` | 1920 × 1080 |
| Carousel | `previews/community/1-styles.png` | 1920 × 1080 |
| Carousel | `previews/community/2-containers.png` | 1920 × 1080 |
| Carousel | `previews/community/3-range.png` | 1920 × 1080 |
| Carousel | `previews/community/4-sharp.png` | 1920 × 1080 |
| Carousel | `previews/community/5-figjam-board.png` | 1920 × 1080 |
| Carousel | `previews/community/6-figjam-colour.png` | 1920 × 1080 |
| Carousel | `previews/community/7-figjam-two-tone.png` | 1920 × 1080 |

The icon is generated by `pipeline/build-brand.mjs`, the cover by
`pipeline/build-cover.mjs` and the carousel by `pipeline/build-community.mjs`.
None of them are drawn by hand, so all of them can be regenerated.

Figma takes up to nine carousel images or videos, so all seven fit. Keep them in
this order: styles, containers, range and corners are the argument for the set,
and the three FigJam sheets are the argument for the plugin over a library.

`4-sharp` went in at four rather than on the end, which pushed the FigJam three
down a number. The set's own arguments stay together and in the order someone
reads them, and the treatment is the newest reason to look — a carousel is read
from the left, so the newest argument earns a place among the first four rather
than a seventh slot after three sheets about a different product.

## Data security

Page three. Optional, but a material update triggers re-review and the same five
questions come back, so the answers are here with what makes each one true.

**1. Do you host a backend service?**
`No, I do not host a backend service for my plugin/widget.`
Two `fetch` calls, both to jsDelivr, a third-party CDN serving a static file out
of this repository. Nothing here is hosted by us.

**2. Does it make network requests with services you do not host?**
`Makes network requests for static assets eg. fonts, images. None of these
requests include data read/derived from Figma's plugin API.`
A bare GET for `icons.json`: no body, no credentials, no query string. Nothing
from the document leaves. Not analytics, and not the "not captured by the above"
option, because a static JSON file on a CDN is exactly this category.

**3. Does it use any user authentication?**
`No, my plugin/widget does not require or use any user authentication.`
No credentials of any kind. `ui.html` and `code.js` contain no reference to
auth, tokens, login, or OAuth.

**4. Does it store data read/derived from Figma's plugin API?**
`No, my plugin/widget does not store any data read/derived from Figma's plugin
API.`
No `figma.clientStorage`, no `localStorage`, no `setPluginData`. The only
mention of `clientStorage` in the repository is in this package's README, under
"Not done yet".

The judgement call, so it is not re-made from scratch next time: `code.js` keeps
`OURS`, an in-memory map of node ids, so a second insert does not land inside
the first. Those ids are derived from the plugin API. It is still `No`, because
that object is program state for the lifetime of one run, and every example the
option gives is a persistence mechanism.

**5. How do you manage updates?**
`I am a solo developer. I manage and update my plugin/widget myself.`

## The network access review

Page four, and the manifest already answers it with one domain:

```json
"networkAccess": {
  "allowedDomains": ["https://cdn.jsdelivr.net"],
  "reasoning": "The icon set is read from the repository over jsDelivr, so a new icon release reaches everyone without a plugin update going through review."
}
```

That `reasoning` field is the answer. The long version, if a reviewer asks:

The plugin fetches one JSON file, the icon set, from jsDelivr. It is fetched
rather than bundled so that adding an icon does not require a plugin update and
a second trip through review. Nothing is sent anywhere: the fetch is a GET with
no body, no credentials and no query string. The plugin reads no user data,
stores nothing, and the only other URL in it is the footer link to
keylineicons.com, which is an anchor the user clicks rather than a request.

`pipeline/check-search.mjs` and `pipeline/build-data.mjs --check` both run in CI
and would fail if that URL changed.

---

## The file listing

The Figma file's own Community page, published from the file rather than from
the plugin manager. Counts here are checked by `check-readmes.mjs` for the same
reason the plugin's are: it is published prose on someone else's page and
cannot be corrected without going back through the modal.

### Name

```
Keyline Icons
```

### Description

```
599 icons on a 24×24 grid, in three styles and two corner treatments: stroke, duotone and fill, cut rounded or sharp. MIT licensed, free for commercial work, no attribution required.

490 component sets, each with three variant properties, Container, Style and Corners, so you switch between regular, square and circle, between the three styles, and between rounded and sharp, without swapping components. 55 icons carry a square- form and 54 a circle-.

Which styles an icon has is measured rather than chosen: duotone and fill need a fillable region, so an open glyph like bar-chart is stroke-only, and square-bar-chart has all three. That is why the three counts differ: stroke 599, duotone 494, fill 446.

Every drawing exists in both treatments, so sharp is a switch rather than a second library: 2,994 variants over the same 585 names.

The Catalog page files every icon under one of 21 categories, each card laid out as a matrix so a name's rounded and sharp forms sit side by side, and the Changelog page records what landed in each version, so the file says what is in it without anyone having to count.

Also available as React components, a shadcn registry, an MCP server for agents, a CLI, and a Figma plugin that searches the set and drops an icon straight onto the canvas.

keylineicons.com
github.com/keyline-icons/keyline-icons
```

**One line per paragraph, and that is not a style choice.** Figma's Description
field preserves newlines rather than reflowing, so a block wrapped for a text
editor arrives with a break after every line and reads as broken mid-sentence.
This was published wrapped once and had to be repasted. Wrap the source only
where the *modal* should break: between paragraphs, and inside the plugin
listing's indented style table, where the breaks are the layout.

It also happens to satisfy `check-readmes.mjs`, which matches
`without swapping components. 55 icons carry a square- form` as one phrase and
reads a wrap between the words and the count as a missing count.

### Thumbnail

`previews/figma-cover.png`, 1920 × 1080, generated by `pipeline/build-cover.mjs`.
It is a different image from the plugin's `plugin-cover.png` and the two are
regenerated together; re-upload whichever modal you are in.

### What changed, for the final details page

```
Sharp corners, across the whole set.

Every component set gained a third variant property, Corners, with a regular
and a sharp value, so the file went from 1,497 variants to 2,994 over the same
585 names. Nothing was renamed and no component was replaced, so instances
already placed in your files keep their link and pick the new property up.

Sharp takes every corner to a true point and ends each stroke square. Coverage
matches rounded exactly, so switching a variant never leaves an empty frame.

The Catalog page is rebuilt as a matrix: one row per name, the three styles
under Regular and again under Sharp. Categories went from 19 to 21 when the
carets and chevrons took a shelf of their own.

48 drawings were redrawn in both treatments, mostly the -off family and the
level indicators.
```
