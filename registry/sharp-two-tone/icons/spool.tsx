import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Spool({ size = 24, ...props }: IconProps) {
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
      <path d="M6 7L4 7C3.4477 7 3 6.5523 3 6L3 2C3 1.4477 3.4477 1 4 1L12 1L20 1C20.5523 1 21 1.4477 21 2L21 6C21 6.5523 20.5523 7 20 7L18 7L18 17L20 17C20.5523 17 21 17.4477 21 18L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 18C3 17.4477 3.4477 17 4 17L6 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 2L20 2L20 6L4 6ZM4 18L20 18L20 22L4 22ZM7 6L7 18M17 6L17 18M7 13.5L17 10.5"/>
    </svg>
  )
}
