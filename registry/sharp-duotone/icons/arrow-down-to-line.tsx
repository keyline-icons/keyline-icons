import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowDownToLine({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M20 21V23H4V21H20ZM13 1V15.801L13.206 15.592L18.581 10.123L20.007 11.524L12.713 18.946C12.525 19.137 12.268 19.246 12 19.246C11.732 19.246 11.475 19.137 11.287 18.946L3.992 11.524L5.419 10.123L10.794 15.592L11 15.801V1H13Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M13 1V15.801L13.206 15.592L18.581 10.123L20.007 11.524L12.713 18.946C12.55 19.112 12.277 19.222 12.046 19.246C11.779 19.246 11.475 19.137 11.287 18.946L3.992 11.524L5.419 10.123L10.794 15.592L11 15.801V1H13Z" fill="currentColor"/>
    </svg>
  )
}
