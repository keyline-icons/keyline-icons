import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareArrowInDownRight({ size = 24, ...props }: IconProps) {
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
      <path d="M15 7L18 7C19.6569 7 21 8.3431 21 10L21 18C21 19.6569 19.6569 21 18 21L10 21C8.3431 21 7 19.6569 7 18L7 15M3 3L10.5 10.5M3 11L10.5 11C10.7761 11 11 10.7761 11 10.5L11 3"/>
    </svg>
  )
}
