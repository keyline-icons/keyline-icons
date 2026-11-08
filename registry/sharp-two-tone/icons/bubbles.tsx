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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13.5 8C15.462 8 17.128 9.255 17.744 11.006C20.668 11.134 23 13.544 23 16.5C23 19.538 20.538 22 17.5 22C14.544 22 12.134 19.668 12.006 16.744C10.255 16.128 9 14.462 9 12.5C9 10.015 11.015 8 13.5 8ZM4 11C5.657 11 7 12.343 7 14C7 15.657 5.657 17 4 17C2.343 17 1 15.657 1 14C1 12.343 2.343 11 4 11ZM6.5 2C8.433 2 10 3.567 10 5.5C10 7.433 8.433 9 6.5 9C4.567 9 3 7.433 3 5.5C3 3.567 4.567 2 6.5 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M13.031 15.969C11.32 15.74 10 14.274 10 12.5C10 10.567 11.567 9 13.5 9C15.274 9 16.74 10.32 16.969 12.031M16.969 12.031C17.143 12.011 17.32 12 17.5 12C19.985 12 22 14.015 22 16.5C22 18.985 19.985 21 17.5 21C15.015 21 13 18.985 13 16.5C13 16.32 13.011 16.143 13.031 15.969C13.273 13.908 14.908 12.273 16.969 12.031ZM9 5.5C9 4.119 7.881 3 6.5 3C5.119 3 4 4.119 4 5.5C4 6.881 5.119 8 6.5 8C7.881 8 9 6.881 9 5.5ZM6 14C6 12.895 5.105 12 4 12C2.895 12 2 12.895 2 14C2 15.105 2.895 16 4 16C5.105 16 6 15.105 6 14Z"/>
    </svg>
  )
}
