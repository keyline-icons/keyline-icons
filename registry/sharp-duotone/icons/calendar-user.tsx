import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CalendarUser({ size = 24, ...props }: IconProps) {
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
      <path d="M10 21L3 21L3 5L21 5L21 9M6 11L12 11M8 2L8 8M16 2L16 8" strokeOpacity="0.4"/>
      <path d="M17 11C18.1046 11 19 11.8954 19 13C19 14.1046 18.1046 15 17 15C15.8954 15 15 14.1046 15 13C15 11.8954 15.8954 11 17 11ZM13 22L13 21C13 19.8954 13.8954 19 15 19L19 19C20.1046 19 21 19.8954 21 21L21 22"/>
    </svg>
  )
}
