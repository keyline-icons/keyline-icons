import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PaintRoller({ size = 24, ...props }: IconProps) {
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
      <path d="M2 1L18 1C18.5523 1 19 1.4477 19 2L19 9C19 9.5523 18.5523 10 18 10L2 10C1.4477 10 1 9.5523 1 9L1 2C1 1.4477 1.4477 1 2 1ZM11 15L15 15C15.5523 15 16 15.4477 16 16L16 22C16 22.5523 15.5523 23 15 23L11 23C10.4477 23 10 22.5523 10 22L10 16C10 15.4477 10.4477 15 11 15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 2L18 2L18 9L2 9L2 2ZM11 16L15 16L15 22L11 22L11 16ZM18 5.5L22 5.5L22 13L13 13L13 16" fill="none"/>
    </svg>
  )
}
