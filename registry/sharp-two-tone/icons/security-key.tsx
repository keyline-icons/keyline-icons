import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SecurityKey({ size = 24, ...props }: IconProps) {
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
      <path d="M8 17L6 17C5.4477 17 5 16.5523 5 16L5 2C5 1.4477 5.4477 1 6 1L18 1C18.5523 1 19 1.4477 19 2L19 9L19 16C19 16.5523 18.5523 17 18 17L16 17L16 22C16 22.5523 15.5523 23 15 23L9 23C8.4477 23 8 22.5523 8 22Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 2L18 2L18 16L6 16ZM9 16L9 22L15 22L15 16M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.8954 10.8954 7 12 7C13.1046 7 14 7.8954 14 9Z"/>
    </svg>
  )
}
