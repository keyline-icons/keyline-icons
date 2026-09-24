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

**An update can skip review.** Version 16, the 1.1.1 panel with new `ui.html`
and `code.js`, went live the moment Publish was pressed on 23 Sep 2026, "And
you're live!", no badge and no email. So anything that must not reach users
yet has to be caught before Publish: test the dev plugin in Figma first,
because the button may be the release.

---

## Name

```
Keyline Icons
```

## Tagline

```
1,178 icons, four styles, rounded or sharp corners. Searchable in Figma and FigJam.
```

Capped at 100 characters. The line above is 81, so there is still room. A
shorter alternative if it ever needs one:

```
1,178 icons in four styles, cut rounded or sharp.
```

## Description

**One line per paragraph**, for the reason given under *The file listing*: the
field keeps newlines rather than reflowing. The style bullets are the exception,
where the breaks are the list.

The changelog is part of the description rather than the Release notes field,
which only ever shows the newest entry. Someone deciding whether to install
wants to see the set is maintained, and that is what a history says.

```
Search 1,178 icons and drop one on the canvas. No library to publish, no file to duplicate, no plan requirement.

Four styles

* Stroke: 1,178 icons, 2px, round caps and joins
* Two-tone: 1,178 icons, a 40% plate under the line
* Duotone: 1,178 icons, no outline, a grey body with the detail in black
* Fill: 1,178 icons, solid where the glyph has a region to fill

Two corner treatments, and every drawing has both. Rounded is the keyline the set was drawn on; sharp takes every corner to a true point and ends each stroke square. Coverage is identical, so switching never costs you a drawing. 9,424 SVGs in total.

60 icons also come in a square- form and 65 in a circle- form, so a container is a search away rather than a second drawing.

Search knows more than the file names. 1,053 icons carry curated words, so "south" finds arrow-down, "hamburger" finds menu and "trash" finds bin. Paste a component name straight out of your code and it resolves: CheckCircle2 finds circle-check.

Browse the set the way the site files it, shelf by shelf, with every shelf a click away from wherever you are. The icons you used last wait at the top, and the panel opens next time on the style, corners and size you left it on.

Click an icon, or drag it to exactly where it should go, at 16, 20, 24 or 32. In a design file it arrives as a square frame, which is what makes a row of icons line up. In FigJam it arrives as a group, so FigJam's colour control reaches the drawing instead of painting a box around it. Double-click into one and every path takes its own colour, which is how a gift gets a red box and a yellow bow, and how duotone keeps both of its tones.

Every drawing sits on one 24 × 24 grid with a shared keyline, so icons of different weights still read as one family at the same size.

MIT licensed. The set, the site and this plugin are all open source.

keylineicons.com
github.com/keyline-icons/keyline-icons

Changelog

1.2.0
64 new drawings, taking the set to 1,178 names and 9,424 SVGs.

* Layout: every edit a table takes, rows and columns added, removed and merged either way, cells merged and split, then a table with a header column, a tree table, a pivot and a table switched off; a plus on three grids
* Devices: the database with plus, minus, check, x, four arrows and a bolt; the server with plus, minus and a bolt; a bolt on the phone and the tablet; a terminal with a plus
* A bolt for anything instant on the bell, envelope, calendar, clock, file, folder, house, parcel and person too
* Time and Charts: the hourglass full, half run and emptied; a gauge reading low and one reading high; an open loading ring
* And more: a plus on the heart, bookmark, cart, basket, house, dashed circle, link and wifi; progress rings paused and stopped; a database with sparkles; a cloud with a terminal prompt

Also redrawn: the table and all twenty-seven panels, in their filled styles. The header row or the docked side is now the solid part, so a left panel and a right panel read apart.

1.1.1
The panel, redrawn: browse by shelf, recent icons at the top, drag onto the canvas, insert at 16, 20, 24 or 32, and your style, corners and size remembered between runs.

1.1.0
114 new drawings, taking the set to 1,114 names and 8,912 SVGs, and two new shelves. The set now installs in React Native too, as @keyline-icons/react-native.

* AI: seventy-six drawings marked with the same pair of stars, from search, message, file, chart and cursor to a truck and a wallet, and a second bot; every sparkle in the set now sits on this one shelf
* Math: asterisk, divide, equals with its approximate and not-equal forms, hash, infinity, parentheses, radical, variable and a barred x, four of them circled and squared too
* Keyboard: command, option, escape and space
* Arrows: six corner turns, an arrow with a dash on top and an arrow that runs into a line
* And more: a file with a waveform and one with a play triangle, eject, a line that goes both ways and a plain wand
* Math and Keyboard opened as shelves of their own, taking categories from 38 to 40

Also redrawn: the pen with sparkles, its plus signs swapped for the pair of stars.

1.0.0
Four styles, with every name in all of them: two-tone is the outlined style that was called duotone, and duotone is new, a grey body with the part that matters in black and no outline. 149 new drawings, taking the set to 1,000 names and 8,000 SVGs, and a new shelf.

* People: a boy and a girl, a baby with a curl and one with a bow, and both babies again with a pacifier
* Layout: the panel on every side, open, closed, dashed and open and dashed, and three split layouts
* Devices: the phone calling, incoming, outgoing, missed and forwarded; the tablet, upright and with eight signs; a laptop, and the laptop beside a phone; a watch, a hard drive, a cable and a headset visor
* Media and Mail: AirPlay, a phone casting, a film camera, a broadcast mast and a search over sound; a sparkle in both message bubbles, and send on a clock
* Users and Actions: a voice, contacts, an ID card and the accessibility figure; a shield with a key, a siren and delete
* Weather and more: humidity and three kinds of cloud, a gauge, two toggles, a map pin with a heart, a shopping basket, a file search and a turn with a plus
* Devices, Stationery and Text: an app window with a plus, minus, x and cursor beside its ruled form, a CCTV camera with and without a slash, a mouse and a shredder; a sticky note with its signs and slash, and two stacked; the case marks, an outlined T and a whole word
* And more: a folder tree and a typed file, a radio, a fingerprint, an incognito hat, a shirt, a paper bag, a milestone, a swatch book, the earth, the recycling arrows, a car, a wallet with its cards, a slashed bot, a brain with a cog and a pen with sparkles
* Finance: two banknotes, each with check, minus, plus and x
* Transport: a rocket at 45 degrees on its flame, again with speed lines, and standing upright
* Arrows and Text: the big arrow in four directions, long and short, and the heading with its six levels
* Time and Weather: a stopwatch and its reset, an alarm clock with check, plus and minus, a snowflake and wind
* Layout and Files: a table and a zipped folder
* Pointers: a hand closed and a hand open
* People opened as a shelf of its own, taking categories from 37 to 38

Also redrawn: the pointing hand in four directions, the paperclip longer, the dice pips larger, the three dots larger, the sparkle out to the 2-unit margin, play smaller, the gallery frames on a tighter radius, the grid and file fills clear of their edges, the chart axes grey in two-tone, the four dashed close panels with their grey under the frame's round corners, and the coins on rounder faces with 2 units between every coin.

0.9.0 — 14 September 2026
53 new drawings, taking the set to 851 names and 4,394 SVGs, and six new shelves.

* Transport: a plane taking off and landing, a ship, a train and a bike
* Nature: a palm, a leaf, a wind turbine and a droplet with its off and plural forms
* Animals: a bird and a pig, with the piggy bank beside the wallet in Finance
* AI and Science: a bot, a brain wired to a circuit, flasks and test tubes
* Health: a brain, lungs, three ears and a clinical thermometer
* Others: five temperature levels, two weather thermometers, earbuds and their case open and shut, a radar, and a pointing hand in four directions
* Nine truck modifiers: plus, minus, check, x, four arrows and electric
* Transport, Nature, Animals, AI, Science and Health opened as shelves of their own, taking categories from 31 to 37
* heart-hand is hand-heart now, and the old name still finds it

0.8.0 — 11 September 2026
33 new drawings, taking the set to 798 names and 4,094 SVGs, and five new shelves. Every one of them came off a month of empty searches on the site: the words people typed and got nothing back for.

* Desk: a printer, a keyboard, a calculator, a USB connector and a drive
* Files: file-code, file-zip and folder-search
* Home: three beds, a sofa, both doors and a brick wall
* Table: coffee, cake, soup and a bottle
* Art: a brush, a roller, a palette and an easel
* Others: the Mars and Venus marks, three keys, a stack of coins, a strip of film, an eraser, a roll of tape and a broom
* Home, Gender, Food & Drink, Art and Stationery opened as shelves of their own, taking categories from 26 to 31
* The calendar and the phone were redrawn, and the phone's negation slash moved to the other diagonal with it

Earlier releases, back to the first cut: keylineicons.com/changelog
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
icon plugins, 1,178 duotone drawings are rare among icon sets, a set that ships
every drawing rounded *and* sharp is rarer still, and the rest name the audience
rather than the artefact.

`sharp icons` took `ui icons`'s slot in 0.3.0. `ui icons` was the weakest of the
five on the file's own test — the Icon Packs category and the description
already say it — and the corner treatment is the thing someone is searching for
who would otherwise leave.

The other set's name followed by "alternative" is deliberately absent. It is
the highest-intent term available and Figma's review criteria mention
trademark compliance, so a competitor's project name in the tags is a grey
area not worth a rejection cycle on a first submission. Worth revisiting once
published.

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

### 1.2.0

```
64 new drawings, taking the set to 1,178 names and 9,424 SVGs: every edit a table takes, from adding a row to merging cells; the database with plus, minus, check, x, four arrows and a bolt, and the server with plus, minus and a bolt; a bolt on eleven more drawings, for anything instant; the hourglass full, half run and emptied, a gauge low and high, and progress rings paused and stopped; a plus on twelve more; a cloud with a terminal prompt.

Redrawn: the table and all twenty-seven panels, whose filled styles now make the header row or the docked side the solid part.
```

**A republish is required for the listing**, whose counts moved: the tagline,
the style bullets, the totals and the curated-word count all changed with the
set. The plugin's own code did not change, and the category count stayed at 40.

### 1.1.1

```
The panel, redrawn. Browse the set shelf by shelf, the way the site files it, with a list of every shelf one click from wherever you are. The icons you used last wait at the top. Drag an icon to exactly where it should go, or click to drop it in the selected frame. Insert at 16, 20, 24 or 32, with the line scaled to match. The panel remembers your style, corners and size the next time it opens, and the keyboard works: type to search, Enter for the top hit, arrows through the grid.
```

**A republish is required**, because the plugin's own code changed: `ui.html`
and `code.js`, not only the set. The Data security answers below were
re-checked for it; question 4 is still `No`, and why is written there.

### 1.1.0

```
114 new drawings, taking the set to 1,114 names and 8,912 SVGs: seventy-six drawings marked with the same pair of stars and a second bot, all on the AI shelf now; twenty maths marks, four of them circled and squared; command, option, escape and space; six corner turns and two arrows; a file for audio and one for video, eject, a line that goes both ways and a plain wand.

Math and Keyboard opened as shelves with them, taking categories from 38 to 40.

Redrawn: the pen with sparkles, now on the same pair of stars.
```

**A republish is required for the listing**, whose counts moved: the tagline,
the style bullets, the totals, the curated-word count and the category count
all changed with the set. The plugin's own code did not change. One line per
paragraph here too, for the reason given under *The file listing*.

### 1.0.0

```
Four styles now, with every name in all of them. Two-tone is the outlined style
that was called duotone; duotone is new, a grey body with the part that matters
in black and no outline.

149 new drawings, taking the set to 1,000 names and 8,000 SVGs: a boy, a girl and
four babies, the panel open, closed and dashed on every side, the phone's calls,
a tablet with eight signs, a laptop, two banknotes with their signs, a rocket
three ways, the big arrows long and short, the heading with its six levels, a
stopwatch and an alarm clock with their signs, a snowflake, wind, a table, a
zipped folder, a hand closed and open, a watch, a hard drive, a cable, a headset
visor, AirPlay, a phone casting, a film camera, a broadcast mast, a search over
sound, both message bubbles with a sparkle, send on a clock, a voice, contacts,
an ID card, the accessibility figure, a shield with a key, a siren, delete, a
gauge, two toggles, a map pin with a heart, a shopping basket, a file search, a
turn with a plus, humidity and three kinds of cloud, an app window with its signs,
a sticky note with its signs, a folder tree, a typed file, the case marks, a CCTV
camera, a mouse, a shredder, a radio, a fingerprint, an incognito hat, a shirt, a
paper bag, a milestone, a swatch book, the earth, the recycling arrows, a car, a
wallet with its cards, a slashed bot, a brain with a cog and a pen with sparkles.

People opened as a shelf with them, taking categories from 37 to 38.

Redrawn: the pointing hand in four directions, the paperclip, the dice, the
three dots, the sparkle, play, the gallery frames, the grid and file fills, the chart axes in
two-tone, the four dashed close panels and the coins.
```

**A republish is required for the listing**, whose counts moved: the tagline,
the style bullets, the totals and the category count all changed with the set.
The plugin's own code did not change.

### 0.9.0

```
53 new drawings, taking the set to 851 names and 4,394 SVGs: planes, a ship, a
train and a bike, a palm, a leaf, a turbine and water, a bird and a pig, a bot,
flasks and test tubes, a brain, lungs and ears, the temperatures, earbuds, a
radar, a pointing hand in four directions, and nine modifiers for the truck.

Six shelves opened with them, taking categories from 31 to 37: Transport,
Nature, Animals, AI, Science and Health.

heart-hand is renamed hand-heart, the hand first because it is the thing that
holds the heart. Searching the old name still finds it.
```

**A republish is required for the listing**, whose counts moved: the tagline,
the style bullets, the totals and the category count all changed with the set.
The plugin's own code did not change.

### 0.8.0

```
33 new drawings, taking the set to 798 names and 4,094 SVGs. Every one came off
a month of empty searches on the site, which is the list of what people typed
and did not find: a printer, a keyboard and a calculator at the top of it, then
file types, furniture, food, art tools and keys.

Five shelves opened with them, taking categories from 26 to 31: Home, Gender,
Food & Drink, Art and Stationery.

The calendar and the phone were redrawn. The calendar's body is a unit taller,
so its two posts cross the top edge symmetrically rather than standing three
above it and one inside. The phone is turned over to read earpiece first at the
top left, and its negation slash turns to the other diagonal with it, because
the handset now lies along the one that slash used to take.
```

**A republish is required for the listing**, whose counts moved: the tagline,
the style bullets, the totals and the category count all changed with the set.
The plugin's own code did not change.

### 0.7.0

```
71 new drawings, taking the set to 765 names and 3,896 SVGs. The message family
drawn again on a square body, with every sign, badge and slash where the round
bubble already puts them, a scan frame with six things to read inside it,
twenty-six charts and four diagrams, seven faces, two thumbs and a badge that
carries nine signs, and a handful of singles: a QR code, scissors in both
bodies, an hourglass and a slash.

The badge is eight bumps on a radius of 5.5, peaks on the four cardinals, and
it is a container: it carries the circle's signs verbatim, which is why only
the dollar of the currency marks clears its well and the others were not
drawn. Every box in the diagrams takes one corner radius, whatever its width.

Two shelves opened with the batch: Emoji, for the faces and the thumbs, and
Diagrams. Categories went from 24 to 26.
```

**A republish is required for the listing**, whose counts moved: the tagline,
the style bullets, the totals and the category count all changed with the set.
The plugin's own code did not change.

### 0.6.0

```
23 new drawings, taking the set to 692 names and 3,538 SVGs. The seven currency
marks, six of them with a circled half, a wallet and four signs for the payment
card, six books, and five singles: a flame, a shopfront, a skyline, a processor
and a mortarboard.

The circled currencies hold 1 unit of daylight against the ring rather than the
2 the set asks between elements. A container is the frame a drawing sits in, not
a neighbour it has to be told apart from, and at 2 a letterform comes out at
about half the well. Bitcoin has no circled half: its four stubs stand outside
the letter at both ends, and solving them shrinks the B until its own bowls
carry 1 unit of white instead of 2.

Two shelves opened with the batch: Finance, for the currency marks, the payment
cards and the wallet, and Education. Categories went from 22 to 24.
```

**A republish is required for the listing**, whose counts moved: the tagline,
the style bullets, the totals and the category count all changed with the set.
The plugin's own code did not change.

### 0.5.0

```
35 new drawings, taking the set to 663 names and 3,392 SVGs. The formatting
marks moved onto a Text shelf of their own, with the quotation marks, the
alignment stack and what sets a paragraph.

Two names changed hands: the diagonal chain is link now and the horizontal one
link-2, which is the naming the rest of the set already follows, and link-off
became link-2-off with it. An import of either wants updating.

7 drawings were redrawn in both treatments. Four sharp drawings that painted
outside their rounded siblings were re-solved rather than exempted.
```

**A republish is required for the listing** and not for the drawings, which
reach every user from jsDelivr on their own.

### 0.4.0

```
44 new drawings, taking the set to 629 names and 3,250 SVGs. Two search
families, the cloud and package families with the five signs the app tiles
carry, and the badged icons.

Every sharp diagonal end is cut back onto its rounded twin's box. A butt cap on
a diagonal reaches further than the round cap it replaces, so 329 icons painted
up to 0.414 of a unit wide of where the rounded drawing ends; they sit on the
same box now. The rounded drawings are untouched.

12 drawings were redrawn in both treatments: the seven bells, circle-navigation,
credit-card, database, git-merge and package.
```

**No republish is required for the drawings**, which reach every user from
jsDelivr on their own. It is required for the listing, whose counts moved: the
tagline, the style bullets and the totals all changed with the set. The plugin's
own code did not change this time.

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
It stores something since 1.1.1, and none of it is read from the plugin API.
`code.js` keeps one `figma.clientStorage` key, `prefs`: the style, the corner
treatment and the insert size the panel was left on, and the last eighteen icon
names inserted from it. The first three are the panel's own controls and the
names come out of this set's own bundle, so nothing in it comes from the
document, and `clientStorage` stays on the user's machine. No `localStorage`,
no `setPluginData`.

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
stores only its own settings and the icons last inserted, on the user's
machine, and the only other URL in it is the footer link to
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
1,178 icons on a 24×24 grid, in four styles and two corner treatments: stroke, two-tone, duotone and fill, cut rounded or sharp. MIT licensed, free for commercial work, no attribution required.

1,053 component sets, each with three variant properties, Container, Style and Corners, so you switch between regular, square and circle, between the four styles, and between rounded and sharp, without swapping components. 60 icons carry a square- form and 65 a circle-.

Every name comes in all four styles. Two-tone keeps the outline over a 40% plate, which is what duotone meant until 0.9.0; duotone now drops the outline and puts the part that matters in black. The four counts: stroke 1,178, two-tone 1,178, duotone 1,178, fill 1,178.

Every drawing exists in both treatments, so sharp is a switch rather than a second library: 9,424 variants over the same 1,178 names.

The Catalog page files every icon under one of 40 categories, each card laid out as a matrix so a name's rounded and sharp forms sit side by side, and the Changelog page records what landed in each version, so the file says what is in it without anyone having to count.

Also available as React and React Native components, a shadcn registry, an MCP server for agents, a CLI, and a Figma plugin that searches the set and drops an icon straight onto the canvas.

keylineicons.com
github.com/keyline-icons/keyline-icons

v1.2.0
64 new drawings. The set is 1,178 names now, 1,053 component sets and 9,424 variants, up from 1,114 and 8,912. Nothing was renamed and no component was replaced, so instances already placed in your files keep their link.

* Layout: every edit a table takes, rows and columns added, removed and merged either way, cells merged and split, then a table with a header column, a tree table, a pivot and a table switched off; a plus on three grids
* Devices: the database with plus, minus, check, x, four arrows and a bolt; the server with plus, minus and a bolt; a bolt on the phone and the tablet; a terminal with a plus
* A bolt for anything instant on the bell, envelope, calendar, clock, file, folder, house, parcel and person too
* Time and Charts: the hourglass full, half run and emptied; a gauge reading low and one reading high; an open loading ring
* And more: a plus on the heart, bookmark, cart, basket, house, dashed circle, link and wifi; progress rings paused and stopped; a database with sparkles; a cloud with a terminal prompt

Also redrawn: the table and all twenty-seven panels, in two-tone, duotone and fill: the header row or the docked side is now the solid part. The vectors were swapped inside the existing sets, so their instances pick the new drawings up.

v1.1.1
One drawing redrawn, and nothing else in the file moved. The set is still 1,114 names, 989 component sets and 8,912 variants. Nothing was renamed and no component was replaced, so instances already placed in your files keep their link.

Also redrawn: option. Its two bars now land on whole pixels at 12px, the size shortcut hints use, and it takes the same 20 by 20 box as command. The vectors were swapped inside the existing set, so its instances pick the new drawing up.

v1.1.0
114 new drawings, and two new shelves. The set is 1,114 names now, 989 component sets and 8,912 variants, up from 1,000 and 8,000. Nothing was renamed and no component was replaced, so instances already placed in your files keep their link.

* AI: seventy-six drawings marked with the same pair of stars, from search, message, file, chart and cursor to a truck and a wallet, and a second bot; every sparkle in the file now sits on this one shelf
* Math: asterisk, divide, equals with its approximate and not-equal forms, hash, infinity, parentheses, radical, variable and a barred x, four of them circled and squared too
* Keyboard: command, option, escape and space
* Arrows: six corner turns, an arrow with a dash on top and an arrow that runs into a line
* Singles: a file with a waveform and one with a play triangle, eject, a line that goes both ways and a plain wand
* Categories went from 38 to 40: Math and Keyboard took the new marks that had nowhere honest to sit

Also redrawn: the pen with sparkles, its plus signs swapped for the pair of stars every other drawing on the AI shelf carries. The vectors were swapped inside the existing set, so its instances keep their link too.

v1.0.0
Four styles, and a new shelf. Every set now carries stroke, two-tone, duotone and fill in both corners: the outlined style that was called duotone is Style=two-tone, and Style=duotone is a new drawing with no outline, a grey body with the part that matters in black. 149 new drawings. The set is 1,000 names now, 883 component sets and 8,000 variants, up from 851 and 4,394. The rename happened in place, so instances already placed in your files keep their link and their look.

* People: a boy and a girl, a baby with a curl and one with a bow, and both babies again with a pacifier
* Layout: the panel on every side, open, closed, dashed and open and dashed, and three split layouts
* Devices: the phone calling, incoming, outgoing, missed and forwarded; the tablet, upright and with eight signs; a laptop, and the laptop beside a phone; a watch, a hard drive, a cable and a headset visor
* Media and Mail: AirPlay, a phone casting, a film camera, a broadcast mast and a search over sound; a sparkle in both message bubbles, and send on a clock
* Users and Actions: a voice, contacts, an ID card and the accessibility figure; a shield with a key, a siren and delete
* Weather and more: humidity and three kinds of cloud, a gauge, two toggles, a map pin with a heart, a shopping basket, a file search and a turn with a plus
* Devices, Stationery and Text: an app window with a plus, minus, x and cursor beside its ruled form, a CCTV camera with and without a slash, a mouse and a shredder; a sticky note with its signs and slash, and two stacked; the case marks, an outlined T and a whole word
* And more: a folder tree and a typed file, a radio, a fingerprint, an incognito hat, a shirt, a paper bag, a milestone, a swatch book, the earth, the recycling arrows, a car, a wallet with its cards, a slashed bot, a brain with a cog and a pen with sparkles
* Finance: two banknotes, each with check, minus, plus and x
* Transport: a rocket at 45 degrees on its flame, again with speed lines, and standing upright
* Arrows and Text: the big arrow in four directions, long and short, and the heading with its six levels
* Time and Weather: a stopwatch and its reset, an alarm clock with check, plus and minus, a snowflake and wind
* Layout and Files: a table and a zipped folder
* Pointers: a hand closed and a hand open
* Categories went from 37 to 38: People took the figures that had nowhere honest to sit

Also redrawn: the pointing hand in four directions, the paperclip longer, the dice pips larger, the three dots larger, the sparkle out to the 2-unit margin, play smaller, the gallery frames on a tighter radius, the grid and file fills clear of their edges, the chart axes grey in two-tone, the four dashed close panels, and the coins on rounder faces.

v0.9.0
53 new drawings, and six new shelves. The set is 851 names now, 734 component sets and 4,394 variants, up from 798 and 4,094. One set was renamed, heart-hand to hand-heart, in place, so instances already placed in your files keep their link.

* Transport: a plane taking off and landing, a ship, a train and a bike
* Nature: a palm, a leaf, a wind turbine and a droplet with its off and plural forms
* Animals: a bird and a pig, with the piggy bank beside the wallet in Finance
* AI and Science: a bot, a brain wired to a circuit, flasks and test tubes
* Health: a brain, lungs, three ears and a clinical thermometer
* Singles: five temperature levels, two weather thermometers, earbuds and their case open and shut, a radar, and a pointing hand in four directions
* Nine truck modifiers: plus, minus, check, x, four arrows and electric
* Categories went from 31 to 37: Transport, Nature, Animals, AI, Science and Health took the new drawings that had nowhere honest to sit

Also redrawn: the sharp duotone truck, whose grey plate no longer shows past its rear wheel.

Earlier releases, back to the first cut: keylineicons.com/changelog
```

**The version history is part of this description**, the way it is in the
plugin's. The published text carried it and this file did not, so the copy here
was short of what is actually on the page and `check-readmes` was policing an
incomplete text. Three times in a row a request for "the full list with
changelogs" was answered with the header alone.

**The field is capped at 10,000 characters**, here and in the plugin's
Description, and the history is what grows into both: the 0.9.0 paste was
refused at 10,896. So the oldest entries come off
the bottom, v0.2.0 and the four 0.1.x releases on 14 Sep 2026, v0.3.0 on
15 Sep 2026, v0.4.0 on 16 Sep 2026 (9,823 with the four-style 1.0.0 entry),
v0.5.0 from the file's and 0.3.0 and 0.4.0 from the plugin's on 17 Sep 2026
(10,363 in the plugin's once the singles batch reached 147 drawings),
0.5.0 from the plugin's and v0.6.0 from the file's on 23 Sep 2026 (10,056 and
9,521 with the 1.1.0 entries), 0.7.0 and 0.6.0 from the plugin's later that
day with the 1.1.1 panel entry, v0.8.0 and v0.7.0 from the file's on
24 Sep 2026 with the 1.2.0 entry (10,377 before, the cap is 10,000), and a last line
points at `keylineicons.com/changelog`, which keeps every release.

**Figma counts higher than `wc -m`.** The 1.1.1 plugin description was refused
at 9,362 by `wc -m`, under the cap by that count, while the 8,876 before it had
been accepted. Something in the field's own count, probably markup around each
of its hundred-odd paragraphs, adds several hundred. So measure with `wc -m` and
trim from the oldest end whenever a new entry pushes it past about 8,800, not
the 9,500 this note used to say.

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
64 new icons, and the table and all twenty-seven panels redrawn in their filled styles. Every edit a table takes, the database and the server with their signs, a lightning bolt on thirteen drawings, more progress states and a plus on twelve more. The file went from 989 component sets to 1,053 and from 8,912 variants to 9,424. Nothing that shipped was renamed or removed, and the redraws were swapped inside their existing sets, so instances already placed in your files keep their link.
```

The 1.1.1 entry this replaced, kept because a listing's history is worth
reading back:

```
One icon redrawn. Option's two bars now land on whole pixels at 12px, the size shortcut hints use, and it takes the same 20 by 20 box as command. It was swapped inside the existing component, so every instance already placed picks it up. Nothing else changed: 989 component sets, 8,912 variants, 1,114 names.
```

The 1.1.0 entry this replaced, kept because a listing's history is worth
reading back:

```
114 new icons, and two new categories. Every icon with a sparkle now sits on one AI shelf, seventy-six of them new and all marked with the same pair of stars, beside twenty maths marks, the command, option, escape and space keys, six corner turns and a few singles. The pen with sparkles was redrawn on the same stars.

The file went from 883 component sets to 989 and from 8,000 variants to 8,912. Nothing that shipped in 1.0.0 was renamed or removed, so instances already placed in your files keep their link.
```

The 1.0.0 entry this replaced, kept because a listing's history is worth
reading back:

```
Out of beta, a month after the first release: 1,000 icons, every one in four
styles with rounded or sharp corners, 8,000 variants in all.

Two-tone is the outlined style that used to be called duotone, under its new
name. Duotone is new: a grey shape with the important part in black and no
outline, drawn for every icon. Every icon now has every style, so switching a
variant never leaves an empty frame.

149 new icons, from a People category to panels on every side, phone calls,
tablets, banknotes, rockets, big arrows and headings, and 59 redrawn. The file
went from 734 component sets to 883 and from 4,394 variants to 8,000. Nothing
that shipped in 0.9.0 was removed.
```

The 0.4.0 entry this replaced, kept because a listing's history is worth
reading back:

```
44 new drawings, and every sharp end squared.

The set is 629 names now, 520 component sets and 3,250 variants, up from 585
and 2,994. Nothing was renamed and no component was replaced, so instances
already placed in your files keep their link.

A butt cap on a diagonal reaches further than the round cap it replaces, so
329 icons painted up to 0.414 of a unit outside their rounded twin. Every one
of those ends is cut back along its own axis, and the rounded drawings are
untouched.

Two search families join the set, the cloud and package families take the five
signs the app tiles do, and the badged icons, briefcase, crown, flag, umbrella
and parasol land with them.

12 drawings were redrawn in both treatments: the seven bells, which carry their
plate offset into the fills, plus circle-navigation, credit-card, database,
git-merge and package.
```

The 0.3.0 entry this replaced, kept because a listing's history is worth
reading back:

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
