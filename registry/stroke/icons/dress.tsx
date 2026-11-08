import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Dress({ size = 24, ...props }: IconProps) {
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
      <path d="M7.5 10L6.0261 4.84C5.7319 3.81 6.3008 2.73 7.3167 2.39L8.5 2V2.5C8.5 4.43 10.067 6 12 6C13.933 6 15.5 4.43 15.5 2.5V2L16.6833 2.39C17.6992 2.73 18.2681 3.81 17.9739 4.84L16.5 10M7.5 10L4.1 19.37C3.6805 20.66 4.6322 22 5.9973 22H18.0027C19.3678 22 20.3195 20.66 19.9 19.37L16.5 10M7.5 10H16.5"/>
    </svg>
  )
}
