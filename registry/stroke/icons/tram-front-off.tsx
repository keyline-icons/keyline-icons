import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TramFrontOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19.1213 19.1213C18.5785 19.6642 17.8285 20 17 20L7 20C5.3431 20 4 18.6569 4 17L4 9C4 7.6462 4.8967 6.5019 6.1285 6.1285M4 12L12 12M8 20L7 22M16 20L17 22M11.6569 6L17 6C18.6569 6 20 7.3431 20 9L20 14.3431M17.6569 12L20 12M8 2L16 2M10.5523 4.8954L12 2L14 6M2 2L22 22" fill="none"/>
      <path d="M9 16C9 16.5523 8.5523 17 8 17C7.4477 17 7 16.5523 7 16C7 15.4477 7.4477 15 8 15C8.5523 15 9 15.4477 9 16Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
