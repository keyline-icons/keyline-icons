import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MapPin({ size = 24, ...props }: IconProps) {
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
      <path d="M18.708204 16L12.745356 22.666667C12.555648 22.878767 12.284562 23 12 23C11.715438 23 11.444352 22.878767 11.254644 22.666667L5.291796 16C3.815931 14.349933 3 12.213797 3 10C3 5.029437 7.029437 1 12 1C16.970563 1 21 5.029437 21 10C21 12.213797 20.184069 14.349933 18.708204 16Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.3431 10.3431 7 12 7C13.6569 7 15 8.3431 15 10Z"/>
    </svg>
  )
}
