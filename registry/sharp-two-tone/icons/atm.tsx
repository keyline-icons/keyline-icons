import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Atm({ size = 24, ...props }: IconProps) {
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
      <path d="M5 11L2 11C1.4477 11 1 10.5523 1 10L1 4C1 3.4477 1.4477 3 2 3L12 3L22 3C22.5523 3 23 3.4477 23 4L23 10C23 10.5523 22.5523 11 22 11L19 11L19 12.0001L19 20.0001C19 20.5524 18.5523 21.0001 18 21.0001L6 21.0001C5.4477 21.0001 5 20.5524 5 20.0001Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM18 10L22 10L22 4L18 4L6 4L2 4L2 10L6 10M18 4L18 10L18 20L6 20L6 10L6 4"/>
    </svg>
  )
}
