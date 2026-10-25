import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Construction({ size = 24, ...props }: IconProps) {
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
      <path d="M2 3L22 3C22.5523 3 23 3.4477 23 4L23 11C23 11.5523 22.5523 12 22 12L2 12C1.4477 12 1 11.5523 1 11L1 4C1 3.4477 1.4477 3 2 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 4L22 4L22 11L2 11ZM5.5 11L12.5 4M11.5 11L18.5 4M6 11L6 20M18 11L18 20M3 20L9 20M15 20L21 20" fill="none"/>
    </svg>
  )
}
