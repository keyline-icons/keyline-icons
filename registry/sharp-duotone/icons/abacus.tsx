import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Abacus({ size = 24, ...props }: IconProps) {
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
      <path d="M5 2L5 21M19 2L19 21M2 21L22 21M5 8L19 8M5 15L19 15" strokeOpacity="0.4"/>
      <path d="M9 5.5L9 10.5M13 5.5L13 10.5M11 12.5L11 17.5M15 12.5L15 17.5"/>
    </svg>
  )
}
