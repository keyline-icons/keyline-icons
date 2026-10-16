import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MonitorOff({ size = 24, ...props }: IconProps) {
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
      <path d="M17 17H13V19H17V21H7V19H11V17H2C1.4477 17 1 16.5523 1 16V4C1 3.4477 1.4477 3 2 3H3L17 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6.6569 3L22 3C22.5523 3 23 3.4477 23 4L23 16C23 16.5523 22.5523 17 22 17L20.6569 17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.70715 1.70703L22.293 22.2928"/>
    </svg>
  )
}
