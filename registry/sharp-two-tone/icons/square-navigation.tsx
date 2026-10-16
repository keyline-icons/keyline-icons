import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareNavigation({ size = 24, ...props }: IconProps) {
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
      <path d="M19 21L21 21L21 3L3 3L3 21L5 21"/>
      <path d="M7.6056 19.0528L11.1056 12.0528C11.4741 11.3157 12.5259 11.3157 12.8944 12.0528L16.3944 19.0528C16.7726 19.8091 16.0997 20.6642 15.2757 20.4745L12 19.7206L8.7243 20.4745C7.9003 20.6642 7.2274 19.8091 7.6056 19.0528Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8.5 19.5L12 12.5L15.5 19.5L12 18.6945L8.5 19.5Z"/>
    </svg>
  )
}
