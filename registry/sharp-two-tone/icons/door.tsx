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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 22L5 3C5 2.4477 5.4477 2 6 2L18 2C18.5523 2 19 2.4477 19 3L19 22L5 22Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 21L6 3L18 3L18 21L6 21ZM1 21L23 21M14 10L14 14" fill="none"/>
    </svg>
  )
}
