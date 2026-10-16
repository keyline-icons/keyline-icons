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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M17.8989 12L19.5 12C20.8807 12 22 10.8807 22 9.5C22 8.1193 20.8807 7 19.5 7C19.5 5.3431 18.1569 4 16.5 4C15.0285 4 13.7742 5.0673 13.5387 6.5198L13.3786 7.5069" strokeOpacity="0.4"/>
      <path d="M5 21C2.7909 21 1 19.2091 1 17C1 15.1481 2.2712 13.5383 4.0727 13.109C4.509 10.4509 6.8063 8.5 9.5 8.5C12.1937 8.5 14.491 10.4509 14.9273 13.109C16.7288 13.5383 18 15.1481 18 17C18 19.2091 16.2091 21 14 21L5 21Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
