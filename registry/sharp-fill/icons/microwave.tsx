import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Microwave({ size = 24, ...props }: IconProps) {
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
      <path d="M2 2L22 2C22.5523 2 23 2.4477 23 3L23 19C23 19.5523 22.5523 20 22 20L2 20C1.4477 20 1 19.5523 1 19L1 3C1 2.4477 1.4477 2 2 2ZM6 6C5.4477 6 5 6.4477 5 7L5 15C5 15.5523 5.4477 16 6 16L14 16C14.5523 16 15 15.5523 15 15L15 7C15 6.4477 14.5523 6 14 6L6 6ZM19 9C19 8.4477 18.5523 8 18 8C17.4477 8 17 8.4477 17 9C17 9.5523 17.4477 10 18 10C18.5523 10 19 9.5523 19 9ZM19 13C19 12.4477 18.5523 12 18 12C17.4477 12 17 12.4477 17 13C17 13.5523 17.4477 14 18 14C18.5523 14 19 13.5523 19 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M6 19L6 22M18 19L18 22" fill="none"/>
    </svg>
  )
}
