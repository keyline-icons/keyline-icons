import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Grid2x2Check({ size = 24, ...props }: IconProps) {
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
      <path d="M2 1L20 1C20.5523 1 21 1.4477 21 2L21 11C21 11.5523 20.5523 12 20 12L12 12L12 20C12 20.5523 11.5523 21 11 21L2 21C1.4477 21 1 20.5523 1 20L1 2C1 1.4477 1.4477 1 2 1ZM3 3L3 10L10 10L10 3Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M15.7055 19.2971L18.3333 22L22.1467 15.76" fill="none"/>
    </svg>
  )
}
