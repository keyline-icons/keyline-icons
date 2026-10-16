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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 2L21 2C21.5523 2 22 2.4477 22 3L22 9C22 9.5523 21.5523 10 21 10L3 10C2.4477 10 2 9.5523 2 9L2 3C2 2.4477 2.4477 2 3 2Z" fill="currentColor" stroke="none"/>
      <path d="M3 17L3 21L7 21M17 21L21 21L21 17M3 12L3 15M21 12L21 15M9.5 21L14.5 21"/>
      <path d="M8.7071 16.2929L12 13L15.2929 16.2929"/>
    </svg>
  )
}
