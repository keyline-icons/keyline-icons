import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Flip3Vertical({ size = 24, ...props }: IconProps) {
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
      <path d="M5 22L5 2M2 19L5 22L8 19M2 5L5 2L8 5M13.7712 14L21 14C21.5523 14 22 14.4477 22 15L22 20.9981C22 21.8449 21.0132 22.3084 20.3614 21.7677L13.1327 15.7696C12.4121 15.1717 12.8349 14 13.7712 14ZM13.7712 10L21 10C21.5523 10 22 9.5523 22 9L22 3.0019C22 2.1551 21.0132 1.6916 20.3614 2.2323L13.1327 8.2304C12.4121 8.8283 12.8349 10 13.7712 10Z" fill="none"/>
    </svg>
  )
}
