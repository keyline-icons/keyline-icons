import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Contacts({ size = 24, ...props }: IconProps) {
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
      <path d="M6 6L18 6C20.2091 6 22 7.7909 22 10L22 18C22 20.2091 20.2091 22 18 22L6 22C3.7909 22 2 20.2091 2 18L2 10C2 7.7909 3.7909 6 6 6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 3L19 3M14 13C14 14.1046 13.1046 15 12 15C10.8954 15 10 14.1046 10 13C10 11.8954 10.8954 11 12 11C13.1046 11 14 11.8954 14 13ZM8 21C8 19.8954 8.8954 19 10 19L14 19C15.1046 19 16 19.8954 16 21"/>
    </svg>
  )
}
