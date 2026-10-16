import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PoundSterling({ size = 24, ...props }: IconProps) {
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
      <path d="M9 23L9 22L9 6C9 3.7909 10.7909 2 13 2C15.2091 2 17 3.7909 17 6C17 6.7021 16.8152 7.3919 16.4641 8L16.1754 8.5M5 15L6 15L15 15L16 15M3 22L4 22L20 22L21 22" fill="none"/>
    </svg>
  )
}
