import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TreePineFlame({ size = 24, ...props }: IconProps) {
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
      <path d="M9 18L9 22L9 23M20 12C20 13.0819 20.3509 14.1345 21 15C21.6491 15.8655 22 16.9182 22 18C22 20.2092 20.2092 22 18 22C15.7909 22 14 20.2092 14 18C14 17.4159 14.1279 16.8389 14.3748 16.3096C14.4569 16.1334 14.6336 16.0209 14.8279 16.0209C15.1041 16.0209 15.3279 16.2447 15.3279 16.5209C15.3279 16.6086 15.3048 16.6949 15.261 16.7709C15.1732 16.9229 15.127 17.0953 15.127 17.2709C15.127 17.8231 15.5747 18.2709 16.127 18.2709C16.6793 18.2709 17.127 17.8231 17.127 17.2709C17.127 15.1399 18.2091 13.1548 20 12ZM14.5472 12.434L14.247 12.0587L11 8L14 8L9 2L4 8L7 8L3 13L7 13L2 18L9 18L10 18L11 18" fill="none"/>
    </svg>
  )
}
