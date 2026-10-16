import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SaveOff({ size = 24, ...props }: IconProps) {
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
      <path d="M21 21L3 21L3 3M14.8715 14.8715C14.4981 16.1033 13.3538 17 12 17C10.3431 17 9 15.6569 9 14C9 12.6462 9.8967 11.5019 11.1285 11.1285M7.6569 3L17 3L21 7L21 16.3431M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
