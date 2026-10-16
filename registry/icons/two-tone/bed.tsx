import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bed({ size = 24, ...props }: IconProps) {
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
      <path d="M1 17L1 9L5 9L5 7C5 5.3431 6.3431 4 8 4L10 4C11.6569 4 13 5.3431 13 7L13 9L19 9C21.2091 9 23 10.7909 23 13L23 17L1 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 4L2 20M2 10L19 10C20.6569 10 22 11.3431 22 13L22 16L2 16ZM6 10L6 7C6 5.8954 6.8954 5 8 5L10 5C11.1046 5 12 5.8954 12 7L12 10M22 16L22 20" fill="none"/>
    </svg>
  )
}
