import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlagTriangleRight({ size = 24, ...props }: IconProps) {
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
      <path d="M4.3511 3.0637L20.3511 9.0637C20.7414 9.21 21 9.5832 21 10C21 10.4168 20.7414 10.79 20.3511 10.9363L4.3511 16.9363C4.2388 16.9784 4.1199 17 4 17C3.4477 17 3 16.5523 3 16L3 4C3 3.4477 3.4477 3 4 3C4.1199 3 4.2388 3.0216 4.3511 3.0637Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 1L4 23M4 4L20 10L4 16" fill="none"/>
    </svg>
  )
}
