import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PictureInPictureOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.88 21H12C11.448 21 11 20.552 11 20V12C11 11.754 11.089 11.529 11.235 11.355L20.88 21ZM14.657 11H22C22.552 11 23 11.448 23 12V19.343L14.657 11Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22 9V4H9.657H8.657M4 4H2V20H9" strokeOpacity="0.4"/>
      <path d="M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
