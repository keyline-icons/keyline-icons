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
      <path d="M4 4L10 10H6V12H11V11L22 22H3C2.4477 22 2 21.5523 2 21V5C2 4.4477 2.4477 4 3 4H4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M21 4C21.5523 4 22 4.4477 22 5V18.3428L7.65723 4H21Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.70715 1.70703L22.293 22.2928"/>
    </svg>
  )
}
