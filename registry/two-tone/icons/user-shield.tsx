import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserShield({ size = 24, ...props }: IconProps) {
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
      <path d="M11 12C11.5523 12 12 12.4477 12 13V21C12 21.5523 11.5523 22 11 22H3C1.89542 22 1 21.1046 1 20V19C1 15.134 4.13402 12 8 12H11ZM9 2C11.2092 2 13 3.79082 13 6C13 8.20918 11.2092 10 9 10C6.79094 10 5 8.20921 5 6C5 3.79079 6.79094 2 9 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 3C10.6569 3 12 4.3431 12 6C12 7.6569 10.6569 9 9 9C7.3432 9 6 7.6569 6 6C6 4.3431 7.3432 3 9 3ZM11 21L3 21C2.4477 21 2 20.5523 2 20V19C2 15.6863 4.6863 13 8 13L11 13M15.5173 13.6362C16.6758 13.4987 17.5504 12.9203 18.0731 12.4133C18.2974 12.1956 18.7026 12.1956 18.9269 12.4133C19.4496 12.9203 20.3242 13.4987 21.4827 13.6362C21.7669 13.6699 22 13.8909 22 14.1675L22 16.8747C22 17.651 21.8736 18.4412 21.3928 19.0631C20.8667 19.7434 20.0327 20.5058 18.863 20.9355C18.6288 21.0215 18.3712 21.0215 18.137 20.9355C16.9673 20.5058 16.1332 19.7434 15.6073 19.0631C15.1264 18.4412 15 17.651 15 16.8747L15 14.1675C15 13.8909 15.2331 13.6699 15.5173 13.6362Z"/>
    </svg>
  )
}
