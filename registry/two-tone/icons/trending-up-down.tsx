import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrendingUpDown({ size = 24, ...props }: IconProps) {
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
      <path d="M2 12L7 7L12 12L21.4 2.6M14.8284 14.8284L21.4 21.4M16 2L21.5 2C21.7761 2 22 2.2239 22 2.5L22 8M16 22L21.5 22C21.7761 22 22 21.7761 22 21.5L22 16"/>
    </svg>
  )
}
