import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Backpack({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1C14.209 1 16 2.791 16 5H20C20.552 5 21 5.448 21 6V22C21 22.552 20.552 23 20 23H4C3.448 23 3 22.552 3 22V6C3 5.448 3.448 5 4 5H8C8 2.791 9.791 1 12 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 15H20M9 10H15M8 15V19M15 6V5C15 3.343 13.657 2 12 2C10.343 2 9 3.343 9 5V6M4 22H20V6H4V22Z"/>
    </svg>
  )
}
