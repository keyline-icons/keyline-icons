import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Armchair({ size = 24, ...props }: IconProps) {
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
      <path d="M4 11L4 2L20 2L20 11M19 20L19 22L19 23M5 20L5 22L5 23M2 20L22 20L22 13C22 11.8954 21.1046 11 20 11C18.8954 11 18 11.8954 18 13L18 14L6 14L6 13C6 11.8954 5.1046 11 4 11C2.8954 11 2 11.8954 2 13Z" fill="none"/>
    </svg>
  )
}
