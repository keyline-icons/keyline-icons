import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareArrowOutDownRight({ size = 24, ...props }: IconProps) {
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
      <path d="M9 17L6 17C4.3431 17 3 15.6569 3 14L3 6C3 4.3431 4.3431 3 6 3L14 3C15.6569 3 17 4.3431 17 6L17 9" fill="none" strokeOpacity="0.4"/>
      <path d="M13 13L20.5 20.5M13 21L20.5 21C20.7761 21 21 20.7761 21 20.5L21 13" fill="none"/>
    </svg>
  )
}
