import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CoffeeMaker({ size = 24, ...props }: IconProps) {
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
      <path d="M7 11L18 11L16 15L9 15ZM9 15L7.4 18L7 19.5L9.5 22L15.5 22L18 19.5L17.6 18L16 15M15 11L21 11L21 16M3 6L3 22L21 22M3 6L3 2L19 2L20.5 6Z" fill="none"/>
    </svg>
  )
}
