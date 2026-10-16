import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Podium1({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M20 10.5C20.5523 10.5 21 10.9477 21 11.5V22C21 22.5523 20.5523 23 20 23H4C3.44772 23 3 22.5523 3 22V18.5C3 17.9477 3.44772 17.5 4 17.5H8V15C8 14.4477 8.44772 14 9 14H13V11.5C13 10.9477 13.4477 10.5 14 10.5H20Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 22H22M16.1 3.3L17.5 2V7"/>
    </svg>
  )
}
