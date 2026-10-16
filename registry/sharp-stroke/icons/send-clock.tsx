import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SendClock({ size = 24, ...props }: IconProps) {
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
      <path d="M6.5744 11.0404L6.1382 10.7426L2 7.9174L22 2L20.7043 6.3794L20.4923 7.0957M18.2562 5.7438L18.5491 5.4509L22 2M22 15.5C22 19.0899 19.0899 22 15.5 22C11.9101 22 9 19.0899 9 15.5C9 11.9101 11.9101 9 15.5 9C19.0899 9 22 11.9101 22 15.5ZM15.5 12L15.5 15.5L19 15.5"/>
    </svg>
  )
}
