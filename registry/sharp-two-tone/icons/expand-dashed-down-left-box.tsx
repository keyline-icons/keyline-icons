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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M18 10L18 21M14.7071 17.7071L18 21L21.2929 17.7071M14 6L3 6M6.2929 2.7071L3 6L6.2929 9.2929"/>
      <path d="M9 21L5 21M3 19L3 15M5 13L9 13M11 19L11 15" strokeOpacity="0.4"/>
    </svg>
  )
}
