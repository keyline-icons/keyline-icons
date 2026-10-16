import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlipVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M16.9999 1.9999L12 8L7.0001 1.9999L16.9999 1.9999ZM16.9999 22.0001L12 16.0001L7.0001 22.0001L16.9999 22.0001ZM23 12L19 12M17 12L13 12M11 12L7 12M5 12L1 12" fill="none"/>
    </svg>
  )
}
