import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Magnet({ size = 24, ...props }: IconProps) {
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
      <path d="M4 13L4 3L9 3L9 13C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13L15 3L20 3L20 13C20 17.4183 16.4183 21 12 21C7.5817 21 4 17.4183 4 13ZM4 7L9 7M15 7L20 7" fill="none"/>
    </svg>
  )
}
