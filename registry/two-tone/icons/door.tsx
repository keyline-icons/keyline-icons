import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Door({ size = 24, ...props }: IconProps) {
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
      <path d="M5 22L5 4C5 2.8954 5.8954 2 7 2L17 2C18.1046 2 19 2.8954 19 4L19 22L5 22Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 21L6 4C6 3.4477 6.4477 3 7 3L17 3C17.5523 3 18 3.4477 18 4L18 21L6 21ZM2 21L22 21M14 11L14 13" fill="none"/>
    </svg>
  )
}
