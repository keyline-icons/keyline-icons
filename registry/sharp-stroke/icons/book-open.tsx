import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BookOpen({ size = 24, ...props }: IconProps) {
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
      <path d="M2 4L8 4C10.2091 4 12 5.7909 12 8C12 5.7909 13.7909 4 16 4L22 4L22 17L15 17C13.3431 17 12 18.3431 12 20C12 18.3431 10.6569 17 9 17L2 17L2 4ZM12 8L12 20" fill="none"/>
    </svg>
  )
}
