import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShieldKey({ size = 24, ...props }: IconProps) {
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
      <path d="M20 5.3088L20 15.778L18.612 17.5729C17.4097 19.1277 15.5033 20.8703 12.8298 21.8525C12.2945 22.0492 11.7055 22.0492 11.1702 21.8525C8.4967 20.8703 6.5903 19.1277 5.388 17.5729L4 15.7778L4 5.3088L5.1825 5.1684C7.8303 4.8543 9.8295 3.5322 11.0242 2.3731C11.537 1.8756 12.463 1.8756 12.9758 2.3731C14.1705 3.5322 16.1697 4.8543 18.8175 5.1684L20 5.3088ZM14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.3954 10.8954 7.5 12 7.5C13.1046 7.5 14 8.3954 14 9.5ZM12 11.5L12 18.5M12 15.5L15 15.5"/>
    </svg>
  )
}
