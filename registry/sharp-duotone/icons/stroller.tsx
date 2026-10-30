import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Stroller({ size = 24, ...props }: IconProps) {
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
      <path d="M20 9.099L20 14C20 14.5523 19.5523 15 19 15L3 15C2.4477 15 2 14.5523 2 14L2 9C2 8.4477 2.4477 8 3 8L18.1802 8L19.0194 3.8039C19.1129 3.3365 19.5233 3 20 3L22 3L22 5L20.8198 5L20 9.099Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 9C1.9994 5.8872 3.8044 3.0566 6.6269 1.744C7.6834 1.2525 8.8348 0.9986 10 1C10.5523 1 11 1.4477 11 2L11 9C11 9.5523 10.5523 10 10 10L3 10C2.4477 10 2 9.5523 2 9Z" fill="currentColor" stroke="none"/>
      <path d="M9 20C9 21.1046 8.1046 22 7 22C5.8954 22 5 21.1046 5 20C5 18.8954 5.8954 18 7 18C8.1046 18 9 18.8954 9 20ZM17 20C17 21.1046 16.1046 22 15 22C13.8954 22 13 21.1046 13 20C13 18.8954 13.8954 18 15 18C16.1046 18 17 18.8954 17 20Z" fill="none"/>
    </svg>
  )
}
