import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Input({ size = 24, ...props }: IconProps) {
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
      <path d="M1 9C1 7.3431 2.3431 6 4 6L20 6C21.6569 6 23 7.3431 23 9L23 15C23 16.6569 21.6569 18 20 18L4 18C2.3431 18 1 16.6569 1 15L1 9Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 11L6 13" fill="none"/>
    </svg>
  )
}
