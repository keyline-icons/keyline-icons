import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Umbrella({ size = 24, ...props }: IconProps) {
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
      <path d="M2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12C20.75 10 18.25 10 17 12C15.75 10 13.25 10 12 12C10.75 10 8.25 10 7 12C5.75 10 3.25 10 2 12ZM12 12L12 19C12 20.6569 13.3431 22 15 22C16.6569 22 18 20.6569 18 19L18 18"/>
    </svg>
  )
}
