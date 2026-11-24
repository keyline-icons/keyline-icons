import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Elevator({ size = 24, ...props }: IconProps) {
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
      <path d="M6 12H8M8 12H10M8 12V13M8 13L6 17M8 13L10 17M20 3V21M22 5L20 3L18 5M22 19L20 21L18 19M5 3H11C12.6569 3 14 4.3431 14 6V18C14 19.6569 12.6569 21 11 21H5C3.3431 21 2 19.6569 2 18V6C2 4.3431 3.3431 3 5 3Z"/>
      <path d="M9.5 7.5C9.5 8.3284 8.8284 9 8 9C7.1716 9 6.5 8.3284 6.5 7.5C6.5 6.6716 7.1716 6 8 6C8.8284 6 9.5 6.6716 9.5 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
