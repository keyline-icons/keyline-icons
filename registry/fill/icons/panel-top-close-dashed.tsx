import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PanelTopCloseDashed({ size = 24, ...props }: IconProps) {
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
      <path d="M6 2L18 2C20.2091 2 22 3.7909 22 6L22 9C22 9.5523 21.5523 10 21 10L3 10C2.4477 10 2 9.5523 2 9L2 6C2 3.7909 3.7909 2 6 2Z" fill="currentColor" stroke="none"/>
      <path d="M3 18C3 19.6569 4.34315 21 6 21M18 21C19.6569 21 21 19.6569 21 18M3 13V14M21 13V14M10.5 21H13.5"/>
      <path d="M9 16L12 13L15 16"/>
    </svg>
  )
}
