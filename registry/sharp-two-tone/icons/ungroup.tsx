import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ungroup({ size = 24, ...props }: IconProps) {
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
      <path d="M16.5 2L21 2C21.5523 2 22 2.4477 22 3L22 12C22 12.5523 21.5523 13 21 13L12 13C11.4477 13 11 12.5523 11 12L11 3C11 2.4477 11.4477 2 12 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 3L21 3L21 12L12 12L12 3ZM9 12L3 12L3 21L12 21L12 15M8 2L8 5.5M2 8L5.5 8M16 18.5L16 22M18.5 16L22 16"/>
    </svg>
  )
}
