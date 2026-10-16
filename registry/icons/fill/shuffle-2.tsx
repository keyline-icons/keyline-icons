import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Shuffle2({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L9.1716 9.1716M14.8284 14.8284L20.4 20.4M15 21L20.5 21C20.7761 21 21 20.7761 21 20.5L21 15M3 21L20.4 3.6M15 3L20.5 3C20.7761 3 21 3.2239 21 3.5L21 9" fill="none"/>
    </svg>
  )
}
