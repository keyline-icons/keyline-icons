import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PanelRightOpenDashed({ size = 24, ...props }: IconProps) {
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
      <path d="M15 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H15V3ZM6 3C4.34315 3 3 4.34315 3 6M3 18C3 19.6569 4.34315 21 6 21M10 3H11M10 21H11M3 10.5V13.5"/>
      <path d="M11 9L8 12L11 15"/>
    </svg>
  )
}
