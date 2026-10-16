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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5.1825 5.1685C7.8303 4.8543 9.8295 3.5322 11.0242 2.3732C11.537 1.8756 12.463 1.8756 12.9758 2.3732C14.1705 3.5322 16.1697 4.8543 18.8175 5.1685C19.4672 5.2455 20 5.7506 20 6.3829L20 12.5708C20 14.3452 19.7111 16.1513 18.612 17.5729C17.4097 19.1277 15.5033 20.8703 12.8298 21.8525C12.2945 22.0492 11.7055 22.0492 11.1702 21.8525C8.4967 20.8703 6.5903 19.1277 5.388 17.5729C4.2889 16.1513 4 14.3452 4 12.5708L4 6.3829C4 5.7506 4.5328 5.2455 5.1825 5.1685ZM14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.3954 10.8954 7.5 12 7.5C13.1046 7.5 14 8.3954 14 9.5ZM12 11.5L12 17.5M12 15.5L14 15.5"/>
    </svg>
  )
}
