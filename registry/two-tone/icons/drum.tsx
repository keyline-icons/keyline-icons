import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Drum({ size = 24, ...props }: IconProps) {
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
      <path d="M4 16L4 21C4 21.5523 4.4477 22 5 22L12 22L19 22C19.5523 22 20 21.5523 20 21L20 11C20 10.4477 19.5523 10 19 10L12 10L5 10C4.4477 10 4 10.4477 4 11Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 11H21M3 21H21M5 11V21M12 11V21M19 11V21M4 3L8 7M20 3L16 7"/>
    </svg>
  )
}
