import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PanelRightClose({ size = 24, ...props }: IconProps) {
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
      <path d="M15 3L21 3L21 21L15 21L15 3Z" fill="currentColor" stroke="none"/>
      <path d="M3 3L21 3L21 21L3 21L3 3ZM15 3L15 21M7.7071 8.7071L11 12L7.7071 15.2929"/>
    </svg>
  )
}
