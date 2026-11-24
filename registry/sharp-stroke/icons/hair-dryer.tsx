import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HairDryer({ size = 24, ...props }: IconProps) {
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
      <path d="M14.0919 9.5951L14 10L11.9565 19L6.9276 19L9 10M9 2L21 4L21 9L9 10C6.7909 10 5 8.2091 5 6C5 3.7909 6.7909 2 9 2ZM9.5 19C9.5 20.6569 8.1569 22 6.5 22L2 22" fill="none"/>
    </svg>
  )
}
