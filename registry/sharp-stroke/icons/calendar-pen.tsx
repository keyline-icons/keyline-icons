import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CalendarPen({ size = 24, ...props }: IconProps) {
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
      <path d="M9.2199 21L3 21L3 5L21 5L21 9.3202M6 11L14 11M8 2L8 8M16 2L16 8M20.4142 15.6329L16.1715 19.8755L12.2189 20.9998L13.3431 17.0471L17.5858 12.8044C17.9609 12.4294 18.4696 12.2186 19 12.2186C20.1046 12.2186 21 13.1141 21 14.2186C21 14.7491 20.7893 15.2578 20.4142 15.6329Z"/>
    </svg>
  )
}
