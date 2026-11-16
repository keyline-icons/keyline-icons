import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Lamp({ size = 24, ...props }: IconProps) {
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
      <path d="M14 10V11C14 12.6 17 13 17 15.5C17 18.5 15 19.6 14.5 22M10 10V11C10 12.6 7 13 7 15.5C7 18.5 9 19.6 9.5 22M3 22H21M8 2H16L20 10H4L8 2Z"/>
    </svg>
  )
}
