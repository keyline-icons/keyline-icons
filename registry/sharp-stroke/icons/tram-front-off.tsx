import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TramFrontOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20 20L4 20L4 6L6 6M4 12L12 12M8 20L6.7236 22.5528M16 20L17.2764 22.5528M10.6569 6L20 6L20 15.3431M16.6569 12L20 12M7 2L17 2M10.5314 4.9372L12 2L14 6M1.7071 1.7071L22.2929 22.2929" fill="none"/>
      <path d="M9 16C9 16.5523 8.5523 17 8 17C7.4477 17 7 16.5523 7 16C7 15.4477 7.4477 15 8 15C8.5523 15 9 15.4477 9 16Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
