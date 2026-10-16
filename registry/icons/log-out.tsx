import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LogOut({ size = 24, ...props }: IconProps) {
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
      <path d="M9 4L7 4C4.7909 4 3 5.7909 3 8L3 16C3 18.2091 4.7909 20 7 20L9 20M20.2307 12L10.1093 12M15.17 6.5L20.8359 11.6314C21.0547 11.8296 21.0547 12.1704 20.8359 12.3686L15.17 17.5" fill="none"/>
    </svg>
  )
}
