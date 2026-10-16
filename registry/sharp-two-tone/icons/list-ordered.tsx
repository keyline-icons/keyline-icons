import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ListOrdered({ size = 24, ...props }: IconProps) {
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
      <path d="M3.5 4.5L5 3L5 8M2 8L8 8M3 16.3C3 15.5 3.84 15 4.89 15C6.05 15 7 15.7 7 16.7C7 18.6 3 19.9 3 21L8 21M10 5L22 5M10 12L22 12M10 19L22 19" fill="none"/>
    </svg>
  )
}
