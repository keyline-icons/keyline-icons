import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Radicand({ size = 24, ...props }: IconProps) {
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
      <path d="M2 14L4.0159 12.66C4.5307 12.31 5.2305 12.51 5.4833 13.08L8.3172 19.41C8.7054 20.28 9.9704 20.16 10.2002 19.24L13.811 4.76C13.9221 4.31 14.3222 4 14.7813 4H22"/>
      <path d="M16 12L19 15M19 15L22 18M19 15L22 12M19 15L16 18"/>
    </svg>
  )
}
