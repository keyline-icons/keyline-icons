import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Blocks2({ size = 24, ...props }: IconProps) {
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
      <path d="M6 11L6 2C6 1.4477 6.4477 1 7 1L17 1C17.5523 1 18 1.4477 18 2L18 11L22 11C22.5523 11 23 11.4477 23 12L23 22C23 22.5523 22.5523 23 22 23L2 23C1.4477 23 1 22.5523 1 22L1 12C1 11.4477 1.4477 11 2 11L6 11Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7 12L7 2L17 2L17 12M2 12L22 12L22 22L2 22L2 12ZM12 12L12 22" fill="none"/>
    </svg>
  )
}
