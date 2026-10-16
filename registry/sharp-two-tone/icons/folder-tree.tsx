import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FolderTree({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13 2L16 2C16.3788 2 16.725 2.214 16.8944 2.5528L17.618 4L21 4C21.5523 4 22 4.4477 22 5L22 10C22 10.5523 21.5523 11 21 11L13 11C12.4477 11 12 10.5523 12 10L12 3C12 2.4477 12.4477 2 13 2ZM13 13L16 13C16.3788 13 16.725 13.214 16.8944 13.5528L17.618 15L21 15C21.5523 15 22 15.4477 22 16L22 21C22 21.5523 21.5523 22 21 22L13 22C12.4477 22 12 21.5523 12 21L12 14C12 13.4477 12.4477 13 13 13Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 2L3 19L10 19M3 5L3 8L10 8M13 3L16 3L17 5L21 5L21 10L13 10L13 3ZM13 14L16 14L17 16L21 16L21 21L13 21L13 14Z"/>
    </svg>
  )
}
