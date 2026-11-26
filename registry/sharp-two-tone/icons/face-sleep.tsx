import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FaceSleep({ size = 24, ...props }: IconProps) {
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
      <path d="M22 11L22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2L13 2" strokeOpacity="0.4"/>
      <path d="M7 9L7 10C7 10.5523 7.6716 11 8.5 11C9.3284 11 10 10.5523 10 10L10 9M14 9L14 10C14 10.5523 14.6716 11 15.5 11C16.3284 11 17 10.5523 17 10L17 9M8.7071 14.7071L9 15C10 16 11 16.5 12 16.5C13 16.5 14 16 15 15L15.2929 14.7071M15 2L22 2L16 6L23 6"/>
    </svg>
  )
}
