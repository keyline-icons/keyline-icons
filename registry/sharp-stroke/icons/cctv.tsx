import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cctv({ size = 24, ...props }: IconProps) {
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
      <path d="M7.0923 3L17.2913 7.1207L14.6691 13.611L4.47 9.4903L7.0923 3ZM16.5421 8.9751L21.0001 8.6191L18.3778 15.1094L15.4183 11.7566M6.788 10.4269L6.788 17L3 17M3 12L3 22"/>
    </svg>
  )
}
