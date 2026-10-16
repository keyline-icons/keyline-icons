import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Stamp({ size = 24, ...props }: IconProps) {
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
      <path d="M14 8.2361L15 12L21 12L21 17L3 17L3 12L9 12L10 8.2361C9.3637 7.6669 9 6.8537 9 6C9 4.3431 10.3431 3 12 3C13.6569 3 15 4.3431 15 6C15 6.8537 14.6363 7.6669 14 8.2361ZM4 21L20 21" fill="none"/>
    </svg>
  )
}
