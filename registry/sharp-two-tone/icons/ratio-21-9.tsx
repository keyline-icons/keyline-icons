import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ratio219({ size = 24, ...props }: IconProps) {
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
      <path d="M2 7L22 7C22.5523 7 23 7.4477 23 8L23 16C23 16.5523 22.5523 17 22 17L2 17C1.4477 17 1 16.5523 1 16L1 8C1 7.4477 1.4477 7 2 7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 8L22 8L22 16L2 16L2 8Z" fill="none"/>
    </svg>
  )
}
