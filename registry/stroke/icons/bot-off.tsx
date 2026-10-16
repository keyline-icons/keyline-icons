import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19.5616 19.5616C19.017 20.4549 18.0463 21 17 21L7 21C5.3431 21 4 19.6569 4 18L4 11C4 9.3431 5.3431 8 7 8L8 8M22 14.5L20 14.5L20 11C20 9.3431 18.6569 8 17 8L12 8L12 3.5M2 14.5L4 14.5M9 17L13 17M2 2L22 22"/>
      <path d="M13.5 3.5C13.5 4.3284 12.8284 5 12 5C11.1716 5 10.5 4.3284 10.5 3.5C10.5 2.6716 11.1716 2 12 2C12.8284 2 13.5 2.6716 13.5 3.5ZM10 13C10 13.5523 9.5523 14 9 14C8.4477 14 8 13.5523 8 13C8 12.4477 8.4477 12 9 12C9.5523 12 10 12.4477 10 13Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
