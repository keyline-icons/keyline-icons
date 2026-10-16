import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PanelBottomOpenDashed({ size = 24, ...props }: IconProps) {
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
      <path d="M3 15L3 21L21 21L21 15L3 15ZM7 3L3 3L3 7M21 7L21 3L17 3M3 9L3 12M21 9L21 12M9.5 3L14.5 3"/>
      <path d="M8.7071 11.2929L12 8L15.2929 11.2929"/>
    </svg>
  )
}
