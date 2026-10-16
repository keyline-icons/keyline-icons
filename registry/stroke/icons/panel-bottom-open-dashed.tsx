import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PanelBottomOpenDashed({ size = 24, ...props }: IconProps) {
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
      <path d="M3 15V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V15H3ZM6 3C4.34315 3 3 4.34315 3 6M21 6C21 4.34315 19.6569 3 18 3M3 10V11M21 10V11M10.5 3H13.5"/>
      <path d="M9 11L12 8L15 11"/>
    </svg>
  )
}
