import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PanelBottomClose({ size = 24, ...props }: IconProps) {
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
      <path d="M3 15L21 15L21 21L3 21L3 15Z" fill="currentColor" stroke="none"/>
      <path d="M3 3L21 3L21 21L3 21L3 3ZM3 15L21 15M8.7071 7.7071L12 11L15.2929 7.7071"/>
    </svg>
  )
}
