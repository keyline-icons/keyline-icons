import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Clouds({ size = 24, ...props }: IconProps) {
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
      <path d="M5 21L14 21C16.2091 21 18 19.2091 18 17C18 15.1481 16.7288 13.5383 14.9273 13.109C14.491 10.4509 12.1937 8.5 9.5 8.5C6.8063 8.5 4.509 10.4509 4.0727 13.109C2.2712 13.5383 1 15.1481 1 17C1 19.2091 2.7909 21 5 21Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 20L14 20C15.6569 20 17 18.6569 17 17C17 15.3431 15.6569 14 14 14C14 11.5147 11.9853 9.5 9.5 9.5C7.0147 9.5 5 11.5147 5 14C3.3431 14 2 15.3431 2 17C2 18.6569 3.3431 20 5 20ZM18.8989 12L19.5 12C20.8807 12 22 10.8807 22 9.5C22 8.1193 20.8807 7 19.5 7C19.5 5.3431 18.1569 4 16.5 4C15.0285 4 13.7742 5.0673 13.5387 6.5198"/>
    </svg>
  )
}
