import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartCandlestick({ size = 24, ...props }: IconProps) {
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
      <path d="M7 4L11 4C11.5523 4 12 4.4477 12 5L12 10C12 10.5523 11.5523 11 11 11L7 11C6.4477 11 6 10.5523 6 10L6 5C6 4.4477 6.4477 4 7 4ZM15 8L19 8C19.5523 8 20 8.4477 20 9L20 15C20 15.5523 19.5523 16 19 16L15 16C14.4477 16 14 15.5523 14 15L14 9C14 8.4477 14.4477 8 15 8Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 2L3 21L22 21" strokeOpacity="0.4"/>
      <path d="M7 5L11 5L11 10L7 10L7 5ZM15 9L19 9L19 15L15 15L15 9ZM9 2L9 5M9 10L9 14M17 5L17 9M17 15L17 18"/>
    </svg>
  )
}
