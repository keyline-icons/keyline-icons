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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4.3328 3.057L19.9992 8.5855C20.5985 8.7943 21 9.3593 21 9.9939C21 9.9959 21 9.998 21 10C21 10.002 21 10.0041 21 10.0061C21 10.6407 20.5985 11.2058 19.9992 11.4145L4.3328 16.943C4.2259 16.9807 4.1134 17 4 17C3.4477 17 3 16.5523 3 16L3 4C3 3.4477 3.4477 3 4 3C4.1134 3 4.2259 3.0193 4.3328 3.057Z" fill="currentColor" stroke="none"/>
      <path d="M4 2L4 22" fill="none" strokeOpacity="0.4"/>
    </svg>
  )
}
