import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CalendarOff({ size = 24, ...props }: IconProps) {
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
      <path d="M4 4H3C2.4477 4 2 4.4477 2 5V21C2 21.5523 2.4477 22 3 22H22L4 4ZM7.6569 4H21C21.5523 4 22 4.4477 22 5V18.3431L7.6569 4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M21 21H3V5H5M6 11H11M1.7071 1.7071L22.2929 22.2929"/>
    </svg>
  )
}
