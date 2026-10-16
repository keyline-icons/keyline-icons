import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Podium2({ size = 24, ...props }: IconProps) {
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
      <path d="M4 22L4 18.5L9 18.5L9 15L14 15L14 11.5L20 11.5L20 22L4 22Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 22L23 22M4 22L4 18.5L9 18.5L9 15L14 15L14 11.5L20 11.5L20 22L4 22Z" strokeLinejoin="miter"/>
      <path d="M15.3 4.4L15.3 3.4C15.3 2.3 16.116 2 17 2C17.884 2 18.7 2.5 18.7 3.5C18.7 4.9 15.3 6.3 15.3 7L19.7 7"/>
    </svg>
  )
}
