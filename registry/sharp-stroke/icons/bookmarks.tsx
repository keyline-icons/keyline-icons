import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bookmarks({ size = 24, ...props }: IconProps) {
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
      <path d="M4 7L16 7L16 21.2488L15.6602 22L14.8444 21.8797L10.6083 19.6386L10.0001 19.2475L9.3917 19.6386L5.1556 21.8797L4.3398 22L4 21.2488L4 7ZM20 18.1987L20 2L8.8455 2L7.9792 3.4998" fill="none"/>
    </svg>
  )
}
