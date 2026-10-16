import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CursorSignal({ size = 24, ...props }: IconProps) {
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
      <path d="M10.0158 9.9989L14.088 22L16.9324 16.7288L22 14.2735L10.0158 9.9989ZM6 11L6 10C6 7.7909 7.7909 6 10 6L11 6M2 11L2 10C2 5.5817 5.5817 2 10 2L11 2"/>
    </svg>
  )
}
