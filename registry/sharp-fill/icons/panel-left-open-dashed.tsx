import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PanelLeftOpenDashed({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2L9 2C9.5523 2 10 2.4477 10 3L10 21C10 21.5523 9.5523 22 9 22L3 22C2.4477 22 2 21.5523 2 21L2 3C2 2.4477 2.4477 2 3 2Z" fill="currentColor" stroke="none"/>
      <path d="M17 3L21 3L21 7M21 17L21 21L17 21M12 3L15 3M12 21L15 21M21 9.5L21 14.5"/>
      <path d="M12.7071 8.7071L16 12L12.7071 15.2929"/>
    </svg>
  )
}
