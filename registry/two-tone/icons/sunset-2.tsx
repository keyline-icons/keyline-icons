import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sunset2({ size = 24, ...props }: IconProps) {
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
      <path d="M2 14.5C2.9123 13.5421 4.1772 13 5.5 13C6.8228 13 8.0877 13.5421 9 14.5C9.9123 15.4579 11.1772 16 12.5 16C13.8228 16 15.0877 15.4579 16 14.5C16.9123 13.5421 18.1772 13 19.5 13C20.4 13 21.3 13.25 22 13.7M2 19.5C2.9123 18.5421 4.1772 18 5.5 18C6.8228 18 8.0877 18.5421 9 19.5C9.9123 20.4579 11.1772 21 12.5 21C13.8228 21 15.0877 20.4579 16 19.5C16.9123 18.5421 18.1772 18 19.5 18C20.4 18 21.3 18.25 22 18.7" fill="none" strokeOpacity="0.4"/>
      <path d="M4.2309 9.0917C5.1055 5.5313 8.2883 3.021 11.9545 3.0001C15.6207 2.9793 18.8319 5.4532 19.7469 9.0035" fill="none"/>
    </svg>
  )
}
