import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowInDownRightDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M9.5 21L14.5 21M21 14.5L21 9.5M3 16L3 21L7 21M17 21L21 21L21 17M16 3L21 3L21 7" strokeOpacity="0.4"/>
      <path d="M2 12.5L12.5 12.5L12.5 2M2.7071 2.7071L12.3536 12.3536"/>
    </svg>
  )
}
