import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bubbles({ size = 24, ...props }: IconProps) {
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
      <path d="M13.5 8C15.434 8 17.106 9.294 17.743 11.006C20.632 11.172 23 13.57 23 16.5C23 19.538 20.538 22 17.5 22C14.57 22 12.172 19.632 12.006 16.743L11.686 16.617C10.106 15.918 9 14.339 9 12.5C9 10.015 11.015 8 13.5 8ZM4 11C5.657 11 7 12.343 7 14C7 15.657 5.657 17 4 17C2.343 17 1 15.657 1 14C1 12.343 2.343 11 4 11Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M6.5 2C8.433 2 10 3.567 10 5.5C10 7.433 8.433 9 6.5 9C4.567 9 3 7.433 3 5.5C3 3.567 4.567 2 6.5 2Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M17.5 11C20.538 11 23 13.462 23 16.5C23 19.538 20.538 22 17.5 22C14.462 22 12 19.538 12 16.5C12 16.282 12.013 16.065 12.038 15.852C12.335 13.332 14.332 11.335 16.852 11.038C17.065 11.013 17.282 11 17.5 11Z" fill="currentColor"/>
    </svg>
  )
}
