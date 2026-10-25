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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 13L4 4C4 3.4477 4.4477 3 5 3L8 3C8.5523 3 9 3.4477 9 4L9 13C9 14.6569 10.3431 16 12 16C13.6569 16 15 14.6569 15 13L15 4C15 3.4477 15.4477 3 16 3L19 3C19.5523 3 20 3.4477 20 4L20 13C20 17.4183 16.4183 21 12 21C7.5817 21 4 17.4183 4 13ZM4 7L9 7M15 7L20 7" fill="none"/>
    </svg>
  )
}
