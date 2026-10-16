import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowLeftDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M9.5 3L14.5 3M21 9.5L21 14.5M3 8L3 3L7 3M17 3L21 3L21 7M16 21L21.0001 21L21 17" strokeOpacity="0.4"/>
      <path d="M3.4751 15.5L15 15.5M9.3094 9.7045L3.2399 15.5L9.2898 21.2768"/>
    </svg>
  )
}
