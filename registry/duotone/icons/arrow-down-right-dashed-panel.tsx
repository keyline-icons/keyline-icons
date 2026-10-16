import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowDownRightDashedPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M3 6C3 4.3431 4.3431 3 6 3M10.5 3L13.5 3M21 7L21 6.0003C21 4.3434 19.6569 3 18 3M7 21L6 21C4.3431 21 3 19.6569 3 18M3 10.5L3 13.5" strokeOpacity="0.4"/>
      <path d="M11.5 21L20.5 21C20.7761 21 21 20.7761 21 20.5L21 11.5M11.5 11.5L20.5 20.5"/>
    </svg>
  )
}
