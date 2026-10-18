import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HexagonDot({ size = 24, ...props }: IconProps) {
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
      <path d="M13.3613 1.3266L21.3613 5.4003C22.3668 5.9123 23 6.9453 23 8.0737L23 15.9263C23 17.0547 22.3668 18.0877 21.3613 18.5997L13.3613 22.6734C12.506 23.1089 11.494 23.1089 10.6387 22.6734L2.6387 18.5997C1.6332 18.0877 1 17.0547 1 15.9263L1 8.0737C1 6.9453 1.6332 5.9123 2.6387 5.4003L10.6387 1.3266C11.494 0.8911 12.506 0.8911 13.3613 1.3266Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="currentColor"/>
    </svg>
  )
}
