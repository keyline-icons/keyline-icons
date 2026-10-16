import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Radio({ size = 24, ...props }: IconProps) {
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
      <path d="M6 8L16 4" strokeOpacity="0.4"/>
      <path d="M11 14C11 15.6569 9.6569 17 8 17C6.3431 17 5 15.6569 5 14C5 12.3431 6.3431 11 8 11C9.6569 11 11 12.3431 11 14ZM14 11L18 11C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13L14 13C13.4477 13 13 12.5523 13 12C13 11.4477 13.4477 11 14 11ZM14 15L18 15C18.5523 15 19 15.4477 19 16C19 16.5523 18.5523 17 18 17L14 17C13.4477 17 13 16.5523 13 16C13 15.4477 13.4477 15 14 15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 7L19 7C21.2091 7 23 8.7909 23 11L23 17C23 19.2091 21.2091 21 19 21L5 21C2.7909 21 1 19.2091 1 17L1 11C1 8.7909 2.7909 7 5 7ZM11 14C11 12.3431 9.6569 11 8 11C6.3431 11 5 12.3431 5 14C5 15.6569 6.3431 17 8 17C9.6569 17 11 15.6569 11 14ZM9 14C9 14.5523 8.5523 15 8 15C7.4477 15 7 14.5523 7 14C7 13.4477 7.4477 13 8 13C8.5523 13 9 13.4477 9 14ZM14 11C13.4477 11 13 11.4477 13 12C13 12.5523 13.4477 13 14 13L18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11L14 11ZM14 15C13.4477 15 13 15.4477 13 16C13 16.5523 13.4477 17 14 17L18 17C18.5523 17 19 16.5523 19 16C19 15.4477 18.5523 15 18 15L14 15Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
