import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BarsProgress({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 3L20 3C20.5523 3 21 3.4477 21 4L21 8C21 8.5523 20.5523 9 20 9L4 9C3.4477 9 3 8.5523 3 8L3 4C3 3.4477 3.4477 3 4 3ZM4 15L20 15C20.5523 15 21 15.4477 21 16L21 20C21 20.5523 20.5523 21 20 21L4 21C3.4477 21 3 20.5523 3 20L3 16C3 15.4477 3.4477 15 4 15ZM15 3L15 9M10 15L10 21" fill="none"/>
    </svg>
  )
}
