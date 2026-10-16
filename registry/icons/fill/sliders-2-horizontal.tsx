import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sliders2Horizontal({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9 3L11 3C13.2091 3 15 4.7909 15 7C15 9.2091 13.2091 11 11 11L9 11C6.7909 11 5 9.2091 5 7C5 4.7909 6.7909 3 9 3ZM13 13L15 13C17.2091 13 19 14.7909 19 17C19 19.2091 17.2091 21 15 21L13 21C10.7909 21 9 19.2091 9 17C9 14.7909 10.7909 13 13 13Z" fill="currentColor" stroke="none"/>
      <path d="M3 7H6M14 7H21M3 17H10M18 17H21"/>
    </svg>
  )
}
