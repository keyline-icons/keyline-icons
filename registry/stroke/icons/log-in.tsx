import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LogIn({ size = 24, ...props }: IconProps) {
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
      <path d="M15 4L17 4C19.2091 4 21 5.7909 21 8L21 16C21 18.2091 19.2091 20 17 20L15 20M13.1214 12L3 12M8.0607 6.5L13.7266 11.6314C13.9454 11.8296 13.9454 12.1704 13.7266 12.3686L8.0607 17.5" fill="none"/>
    </svg>
  )
}
