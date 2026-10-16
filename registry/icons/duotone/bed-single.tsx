import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BedSingle({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 18L3 13C3 11.3431 4.3431 10 6 10L6 6C6 4.3431 7.3431 3 9 3L15 3C16.6569 3 18 4.3431 18 6L18 10C19.6569 10 21 11.3431 21 13L21 18C21 19.6569 19.6569 21 18 21L6 21C4.3431 21 3 19.6569 3 18Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M3 18L3 13C3 11.3431 4.3431 10 6 10L18 10C19.6569 10 21 11.3431 21 13L21 18C21 19.6569 19.6569 21 18 21L6 21C4.3431 21 3 19.6569 3 18ZM6 12C5.4477 12 5 12.4477 5 13L5 14L19 14L19 13C19 12.4477 18.5523 12 18 12L6 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
