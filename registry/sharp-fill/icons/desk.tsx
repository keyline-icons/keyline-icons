import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Desk({ size = 24, ...props }: IconProps) {
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
      <path d="M3.0299 7.7575L4.4352 2.1359L4.53 1.7572C4.6414 1.3121 5.0413 1 5.5001 1L8.4999 1C8.9587 1 9.3586 1.3121 9.47 1.7572L9.5648 2.1362L10.9701 7.7575C10.99 7.8368 11 7.9182 11 8C11 8.5523 10.5523 9 10 9L4 9C3.4477 9 3 8.5523 3 8C3 7.9182 3.01 7.8368 3.0299 7.7575Z" fill="currentColor" stroke="none"/>
      <path d="M1 12L23 12M7 8L7 12L4 12L4 23M20 12L20 23M20 19L4 19" fill="none"/>
    </svg>
  )
}
