# raw/

Figma exports land here, untouched. Two layouts are accepted.

## From Figma (preferred)

Select the **Components** page in Figma, then Export → SVG. Figma writes one
folder per component set, with the variant properties as the filename:

    raw/arrow-down/Container=regular, Style=stroke.svg
    raw/arrow-down/Container=square, Style=fill.svg
    raw/arrow-down/Container=circle, Style=duotone.svg

The build reads the icon name from the folder and the container/style from the
filename, so nothing needs renaming. The above becomes:

    icons/stroke/arrow-down.svg
    icons/fill/square-arrow-down.svg
    icons/duotone/circle-arrow-down.svg

## By hand

For one-off icons, drop them straight into a style folder:

    raw/stroke/my-icon.svg

Both layouts can coexist. Defining the same icon twice fails the build rather
than letting one silently win.
