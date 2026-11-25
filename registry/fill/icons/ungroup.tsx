import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ungroup({ size = 24, ...props }: IconProps) {
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
      <path d="M8 12H5C3.8954 12 3 12.8954 3 14V19C3 20.1046 3.8954 21 5 21H10C11.1046 21 12 20.1046 12 19V16M8 3V5M3 8H5M16 19V21M19 16H21"/>
      <path d="M16.5 2L19 2C20.6569 2 22 3.3431 22 5L22 10C22 11.6569 20.6569 13 19 13L14 13C12.3431 13 11 11.6569 11 10L11 5C11 3.3431 12.3431 2 14 2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
