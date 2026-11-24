import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Tumbler({ size = 24, ...props }: IconProps) {
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
      <path d="M3.6367 7.567C4.9787 7.1908 6.3662 7 7.7604 7C9.1948 7 10.622 7.202 12 7.6C13.378 7.998 14.8052 8.2 16.2396 8.2C17.631 8.2 19.0156 8.0099 20.355 7.6353M3.0014 3L20.9986 3L18.5 21L5.5 21ZM9.8145 13.1807L13.4193 12.4145L14.1855 16.0193L10.5807 16.7855Z" fill="none"/>
    </svg>
  )
}
