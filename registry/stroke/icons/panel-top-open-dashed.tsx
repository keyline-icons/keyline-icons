import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PanelTopOpenDashed({ size = 24, ...props }: IconProps) {
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
      <path d="M3 9V6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V9H3ZM3 18C3 19.6569 4.34315 21 6 21M18 21C19.6569 21 21 19.6569 21 18M3 13V14M21 13V14M10.5 21H13.5"/>
      <path d="M9 13L12 16L15 13"/>
    </svg>
  )
}
