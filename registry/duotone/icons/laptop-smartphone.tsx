import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LaptopSmartphone({ size = 24, ...props }: IconProps) {
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
      <path d="M4 14L4 4C4 2.8954 4.8954 2 6 2L18 2C19.1046 2 20 2.8954 20 4M9 18L4 18C2.8954 18 2 17.1046 2 16L2 14.5C2 14.2239 2.2239 14 2.5 14L9 14" strokeOpacity="0.4"/>
      <path d="M17 13L18 13C18.5523 13 19 13.4477 19 14C19 14.5523 18.5523 15 18 15L17 15C16.4477 15 16 14.5523 16 14C16 13.4477 16.4477 13 17 13Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M23 19V13C23 10.7909 21.2091 9 19 9H16C13.7909 9 12 10.7909 12 13V19C12 21.2091 13.7909 23 16 23H19C21.2091 23 23 21.2091 23 19ZM17 13L18 13C18.5523 13 19 13.4477 19 14C19 14.5523 18.5523 15 18 15L17 15C16.4477 15 16 14.5523 16 14C16 13.4477 16.4477 13 17 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
