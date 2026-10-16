import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ExpandDashedDownLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M13 6L3 6M6 3L3 6L6 9M18 11L18 21M15 18L18 21L21 18"/>
      <path d="M11 21L9.6667 21M5.6667 21C4.1939 21 3 19.8061 3 18.3333M3 14.3333L3 13" strokeOpacity="0.4"/>
    </svg>
  )
}
