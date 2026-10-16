import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ExpandDashedDownLeftBox({ size = 24, ...props }: IconProps) {
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
      <path d="M18 11L18 21M15 18L18 21L21 18M13 6L3 6M6 3L3 6L6 9"/>
      <path d="M8 21L6 21M3 18L3 16M6 13L8 13M11 18L11 16" strokeOpacity="0.4"/>
    </svg>
  )
}
