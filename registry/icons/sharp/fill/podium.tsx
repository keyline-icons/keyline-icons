import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Podium({ size = 24, ...props }: IconProps) {
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
      <path d="M4 17.25L4 13.75L9 13.75L9 10.25L14 10.25L14 6.75L20 6.75L20 17.25L4 17.25Z" fill="currentColor" stroke="none"/>
      <path d="M1 17.25L23 17.25M4 17.25L4 13.75L9 13.75L9 10.25L14 10.25L14 6.75L20 6.75L20 17.25L4 17.25Z" strokeLinejoin="miter"/>
    </svg>
  )
}
