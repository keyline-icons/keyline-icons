import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Layers3Horizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M14.25 6.091L12 2L9.75 6.091M14.25 6.091L16.5 2L22 12L16.5 22L14.25 17.909M14.25 6.091L11 12L14.25 17.909M9.75 6.091L7.5 2L2 12L7.5 22L9.75 17.909M9.75 6.091L6.5 12L9.75 17.909M14.25 17.909L12 22L9.75 17.909"/>
    </svg>
  )
}
