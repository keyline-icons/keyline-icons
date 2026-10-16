import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShieldLock({ size = 24, ...props }: IconProps) {
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
      <path d="M20 5.3088L20 15.778L18.612 17.5729C17.4097 19.1277 15.5033 20.8703 12.8298 21.8525C12.2945 22.0492 11.7055 22.0492 11.1702 21.8525C8.4967 20.8703 6.5903 19.1277 5.388 17.5729L4 15.7778L4 5.3088L5.1825 5.1684C7.8303 4.8543 9.8295 3.5322 11.0242 2.3731C11.537 1.8756 12.463 1.8756 12.9758 2.3731C14.1705 3.5322 16.1697 4.8543 18.8175 5.1684L20 5.3088ZM9.5 11.5L9.5 10C9.5 8.6193 10.6193 7.5 12 7.5C13.3807 7.5 14.5 8.6193 14.5 10L14.5 11.5M8.5 11.5L15.5 11.5L15.5 15.5L8.5 15.5Z"/>
    </svg>
  )
}
