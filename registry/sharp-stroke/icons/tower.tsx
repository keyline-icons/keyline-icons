import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Tower({ size = 24, ...props }: IconProps) {
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
      <path d="M18 22H23M18 22V8M18 22H14H10H6M18 8H6M18 8H20.972L12 2L3 8H6M6 22H1M6 22V8M10 18H14V14C14 12.9 13.105 12 12 12C10.895 12 10 12.9 10 14V18Z"/>
    </svg>
  )
}
