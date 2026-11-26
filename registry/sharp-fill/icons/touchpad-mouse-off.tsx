import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TouchpadMouseOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21.535 21.535C20.632 22.439 19.38 23 18 23C15.239 23 13 20.761 13 18V14C13 13.687 13.029 13.381 13.084 13.084L21.535 21.535ZM14.297 10.64C15.212 9.633 16.532 9 18 9C20.761 9 23 11.239 23 14V18C23 18.413 22.95 18.814 22.855 19.198L14.297 10.64Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M11 16H2V2.414M6.657 2H20V7M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
