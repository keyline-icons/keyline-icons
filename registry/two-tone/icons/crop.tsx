import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Crop({ size = 24, ...props }: IconProps) {
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
      <path d="M6 1C6.5523 1 7 1.45 7 2V5H16C17.6569 5 19 6.34 19 8V17H22C22.5523 17 23 17.45 23 18C23 18.55 22.5523 19 22 19H19V22C19 22.55 18.5523 23 18 23C17.4477 23 17 22.55 17 22V19H8C6.3432 19 5 17.66 5 16V7H2C1.4477 7 1 6.55 1 6C1 5.45 1.4477 5 2 5H5V2C5 1.45 5.4477 1 6 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 2V16C6 17.1 6.8954 18 8 18H22M18 22V8C18 6.9 17.1046 6 16 6H2"/>
    </svg>
  )
}
