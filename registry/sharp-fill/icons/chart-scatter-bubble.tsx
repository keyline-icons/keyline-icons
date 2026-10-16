import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartScatterBubble({ size = 24, ...props }: IconProps) {
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
      <path d="M21 6C21 8.2091 19.2091 10 17 10C14.7909 10 13 8.2091 13 6C13 3.7909 14.7909 2 17 2C19.2091 2 21 3.7909 21 6ZM12 14C12 15.6569 10.6569 17 9 17C7.3431 17 6 15.6569 6 14C6 12.3431 7.3431 11 9 11C10.6569 11 12 12.3431 12 14ZM20.5 15C20.5 16.3807 19.3807 17.5 18 17.5C16.6193 17.5 15.5 16.3807 15.5 15C15.5 13.6193 16.6193 12.5 18 12.5C19.3807 12.5 20.5 13.6193 20.5 15Z" fill="currentColor" stroke="none"/>
      <path d="M3 2L3 21L22 21" fill="none"/>
    </svg>
  )
}
