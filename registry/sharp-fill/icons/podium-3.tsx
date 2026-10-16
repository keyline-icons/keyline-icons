import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Podium3({ size = 24, ...props }: IconProps) {
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
      <path d="M4 22L4 18.5L9 18.5L9 15L14 15L14 11.5L20 11.5L20 22L4 22Z" fill="currentColor" stroke="none"/>
      <path d="M1 22L23 22M4 22L4 18.5L9 18.5L9 15L14 15L14 11.5L20 11.5L20 22L4 22Z" strokeLinejoin="miter"/>
      <path d="M14.3 2L18.7 2L16.728 4.334C18.7 4.334 18.7 4.9706 18.7 5.9254C18.7 7.4107 15.606 7.1985 15.3 6.2437L14.9948 5.2914"/>
    </svg>
  )
}
