import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Minimize2({ size = 24, ...props }: IconProps) {
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
      <path d="M9 3L9 8.5C9 8.7761 8.7761 9 8.5 9L3 9M3 3L8.4 8.4M15 3L15 8.5C15 8.7761 15.2239 9 15.5 9L21 9M21 3L15.6 8.4M15 21L15 15.5C15 15.2239 15.2239 15 15.5 15L21 15M21 21L15.6 15.6M9 21L9 15.5C9 15.2239 8.7761 15 8.5 15L3 15M3 21L8.4 15.6" fill="none"/>
    </svg>
  )
}
