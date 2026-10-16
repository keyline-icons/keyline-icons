import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TestTubes({ size = 24, ...props }: IconProps) {
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
      <path d="M4 2L8 2C8.5523 2 9 2.4477 9 3L9 19C9 20.6569 7.6569 22 6 22C4.3431 22 3 20.6569 3 19L3 3C3 2.4477 3.4477 2 4 2ZM2 2L10 2M3 13L9 13M16 2L20 2C20.5523 2 21 2.4477 21 3L21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19L15 3C15 2.4477 15.4477 2 16 2ZM14 2L22 2M15 16L21 16" fill="none"/>
    </svg>
  )
}
