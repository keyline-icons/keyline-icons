import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChessRook({ size = 24, ...props }: IconProps) {
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
      <path d="M5 2L7 2L7 5L11 5L11 2L13 2L13 5L17 5L17 2L19 2L19 7L16.5 10L17.5 17L20 18L20 22L4 22L4 18L6.5 17L7.5 10L5 7ZM7.5 10L16.5 10M6.5 17L17.5 17" fill="none"/>
    </svg>
  )
}
