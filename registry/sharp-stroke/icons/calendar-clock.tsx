import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CalendarClock({ size = 24, ...props }: IconProps) {
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
      <path d="M8.2889 21L3 21L3 5L21 5L21 8.2889M21 15.5C21 18.5376 18.5376 21 15.5 21C12.4624 21 10 18.5376 10 15.5C10 12.4624 12.4624 10 15.5 10C18.5376 10 21 12.4624 21 15.5ZM15 13.5L15 16L17.5 16M8 2L8 8M16 2L16 7.0147"/>
    </svg>
  )
}
