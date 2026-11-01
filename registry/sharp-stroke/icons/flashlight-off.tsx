import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlashlightOff({ size = 24, ...props }: IconProps) {
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
      <path d="M9 12L12 12M8 8L2 8L2 16L9.7639 16C11.2344 16 12.6847 16.3424 14 17C15.2439 17.6219 16.6086 17.9619 17.997 17.997M17 7L17 12.3431M22 17.3431L22 6L18.2361 6C16.7656 6 15.3153 6.3424 14 7C13.6946 7.1527 13.382 7.2883 13.0635 7.4067L12.1262 7.7551M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
