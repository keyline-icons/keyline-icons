import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Sliders2Horizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M2 7L6 7M14 7L22 7M2 17L10 17M18 17L22 17" strokeOpacity="0.4"/>
      <path d="M6.5 3L13.5 3C14.3284 3 15 3.6716 15 4.5L15 9.5C15 10.3284 14.3284 11 13.5 11L6.5 11C5.6716 11 5 10.3284 5 9.5L5 4.5C5 3.6716 5.6716 3 6.5 3ZM10.5 13L17.5 13C18.3284 13 19 13.6716 19 14.5L19 19.5C19 20.3284 18.3284 21 17.5 21L10.5 21C9.6716 21 9 20.3284 9 19.5L9 14.5C9 13.6716 9.6716 13 10.5 13Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
