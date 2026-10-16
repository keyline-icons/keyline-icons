import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PanelRightOpenDashed({ size = 24, ...props }: IconProps) {
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
      <path d="M15 3L21 3L21 21L15 21L15 3ZM7 3L3 3L3 7M3 17L3 21L7 21M9 3L12 3M9 21L12 21M3 9.5L3 14.5"/>
      <path d="M11.2929 8.7071L8 12L11.2929 15.2929"/>
    </svg>
  )
}
