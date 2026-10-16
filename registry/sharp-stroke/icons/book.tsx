import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Book({ size = 24, ...props }: IconProps) {
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
      <path d="M4 18L4 2L20 2L20 18C20 18.2164 19.9298 18.4269 19.8 18.6C19.6053 18.8596 19.5 19.1754 19.5 19.5C19.5 19.8246 19.6053 20.1404 19.8 20.4C19.9298 20.5731 20 20.7836 20 21L20 22L4 22L4 18L20 18M8 6L8 14" fill="none"/>
    </svg>
  )
}
