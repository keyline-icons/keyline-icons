import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sink({ size = 24, ...props }: IconProps) {
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
      <path d="M23 15H21V22C21 22.552 20.552 23 20 23H4C3.448 23 3 22.552 3 22V15H1V13H23V15Z" fill="currentColor" stroke="none"/>
      <path d="M12 14V5C12 3.343 13.343 2 15 2C16.657 2 18 3.343 18 5V7M16 14V10H21M8 14V10H3"/>
    </svg>
  )
}
