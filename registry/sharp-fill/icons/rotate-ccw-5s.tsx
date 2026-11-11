import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RotateCcw5s({ size = 24, ...props }: IconProps) {
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
      <path d="M3.4273 9.0828L3.2117 10.0593C3.071 10.6966 3 11.3473 3 12C3 16.9706 7.0294 21 12 21C16.9706 21 21 16.9706 21 12C21 7.0294 16.9706 3 12 3C9.5169 3 7.1441 4.0259 5.4432 5.8349L4.9867 6.3204M4.1631 2.1414L4.7999 6.5999L9.2586 5.9631M14.25 9.5L10.55 9.5L10.25 12.2L12.1 12.2C13.0113 12.2 13.75 12.9387 13.75 13.85C13.75 14.7613 13.0113 15.5 12.1 15.5L11.75 15.5C11.35 15.5 11 15.4 10.7 15.15"/>
    </svg>
  )
}
