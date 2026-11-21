import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Rss({ size = 24, ...props }: IconProps) {
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
      <path d="M2 3L3 3C12.9411 3 21 11.0589 21 21L21 22M2 9L3 9C9.6274 9 15 14.3726 15 21L15 22M2 15L3 15C6.3137 15 9 17.6863 9 21L9 22" fill="none"/>
      <path d="M5 20.5C5 21.3284 4.3284 22 3.5 22C2.6716 22 2 21.3284 2 20.5C2 19.6716 2.6716 19 3.5 19C4.3284 19 5 19.6716 5 20.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
