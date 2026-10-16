import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bike2({ size = 24, ...props }: IconProps) {
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
      <path d="M6 11C8.7614 11 11 13.2386 11 16C11 18.7614 8.7614 21 6 21C3.2386 21 1 18.7614 1 16C1 13.2386 3.2386 11 6 11ZM18 11C20.7614 11 23 13.2386 23 16C23 18.7614 20.7614 21 18 21C15.2386 21 13 18.7614 13 16C13 13.2386 15.2386 11 18 11Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 16C22 18.2091 20.2091 20 18 20C15.7909 20 14 18.2091 14 16C14 13.7909 15.7909 12 18 12C20.2091 12 22 13.7909 22 16ZM10 16C10 18.2091 8.2091 20 6 20C3.7909 20 2 18.2091 2 16C2 13.7909 3.7909 12 6 12C8.2091 12 10 13.7909 10 16ZM7 5L7 6C7 7.6569 8.3431 9 10 9M5.7403 16.6061L6 16L9 9L15.8462 9M15.7071 3.7071L16 4L18 6L15 7L15.8462 9L18 16L18.2172 16.7059"/>
    </svg>
  )
}
