import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Maximize2({ size = 24, ...props }: IconProps) {
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
      <path d="M3 9L3 3.5C3 3.2239 3.2239 3 3.5 3L9 3M9 9L3.6 3.6M21 9L21 3.5C21 3.2239 20.7761 3 20.5 3L15 3M15 9L20.4 3.6M21 15L21 20.5C21 20.7761 20.7761 21 20.5 21L15 21M15 15L20.4 20.4M3 15L3 20.5C3 20.7761 3.2239 21 3.5 21L9 21M9 15L3.6 20.4"/>
    </svg>
  )
}
