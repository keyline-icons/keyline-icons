import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Curtains({ size = 24, ...props }: IconProps) {
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
      <path d="M22 4H21V21C21 21.552 20.552 22 20 22H4C3.448 22 3 21.552 3 21V4H2V2H22V4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 3H22M4 3V21H20V3M12 3V21M8 3V10M16 3V10"/>
    </svg>
  )
}
