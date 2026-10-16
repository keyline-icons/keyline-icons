import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cpu({ size = 24, ...props }: IconProps) {
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
      <path d="M4 3L20 3C20.5523 3 21 3.4477 21 4L21 20C21 20.5523 20.5523 21 20 21L4 21C3.4477 21 3 20.5523 3 20L3 4C3 3.4477 3.4477 3 4 3ZM8 7C7.4477 7 7 7.4477 7 8L7 16C7 16.5523 7.4477 17 8 17L16 17C16.5523 17 17 16.5523 17 16L17 8C17 7.4477 16.5523 7 16 7L8 7Z" fill="currentColor" stroke="none"/>
      <path d="M9 4L9 1M9 20L9 23M4 9L1 9M20 9L23 9M15 4L15 1M15 20L15 23M4 15L1 15M20 15L23 15" fill="none"/>
    </svg>
  )
}
