import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Armchair({ size = 24, ...props }: IconProps) {
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
      <path d="M3 10.1707L3 2C3 1.4477 3.4477 1 4 1L12 1L20 1C20.5523 1 21 1.4477 21 2L21 10.1707C22.1652 10.5825 23 11.6937 23 13L23 20C23 20.5523 22.5523 21 22 21L19 21L12 21L5 21L2 21C1.4477 21 1 20.5523 1 20L1 13C1 11.6937 1.8348 10.5825 3 10.1707ZM12 3L5 3L5 10.1707C6.1652 10.5825 7 11.6938 7 13L17 13C17 11.6938 17.8348 10.5825 19 10.1707L19 3Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M19 20L19 22L19 23M5 20L5 22L5 23"/>
    </svg>
  )
}
