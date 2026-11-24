import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BottleChampagne({ size = 24, ...props }: IconProps) {
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
      <path d="M3 15L11 15M18 16C19.1046 16 21 14.2091 21 12L21 6L15 6L15 12C15 14.2091 16.8954 16 18 16ZM18 16L18 22M9 5L5 5L5 2L9 2ZM8.5 5L8.5 6.5C8.5 8.5 11 9.5 11 12L11 15L11 22L3 22L3 15L3 12C3 9.5 5.5 8.5 5.5 6.5L5.5 5M14 22L15 22L18 22L22 22" fill="none"/>
    </svg>
  )
}
