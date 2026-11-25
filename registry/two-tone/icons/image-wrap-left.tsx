import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ImageWrapLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M8 6L11 6C12.6569 6 14 7.3431 14 9L14 15C14 16.6569 12.6569 18 11 18L5 18C3.3431 18 2 16.6569 2 15L2 9C2 7.3431 3.3431 6 5 6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 7L11 7C12.1046 7 13 7.8954 13 9L13 15C13 16.1046 12.1046 17 11 17L5 17C3.8954 17 3 16.1046 3 15L3 9C3 7.8954 3.8954 7 5 7ZM3 3H21M3 21H21M17 9H21M17 15H21"/>
    </svg>
  )
}
