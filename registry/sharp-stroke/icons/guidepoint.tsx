import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Guidepoint({ size = 24, ...props }: IconProps) {
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
      <path d="M16 12C16 10.34 17.343 9 19 9C20.657 9 22 10.34 22 12C22 13.66 20.657 15 19 15C17.343 15 16 13.66 16 12ZM16 12H8M8 12C8 13.66 6.657 15 5 15C3.343 15 2 13.66 2 12C2 10.34 3.343 9 5 9C6.657 9 8 10.34 8 12Z"/>
    </svg>
  )
}
