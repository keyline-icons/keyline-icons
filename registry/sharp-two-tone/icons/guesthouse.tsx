import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Guesthouse({ size = 24, ...props }: IconProps) {
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
      <path d="M15 22H9V20H15V22ZM22.998 4L21 4.13V17C21 17.55 20.552 18 20 18H4C3.448 18 3 17.55 3 17V5.91L1.199 6.09L1 4.1L3 3.9V2H5V3.69L19.9 2.21L20 3.2L19.931 2.2L22.86 2L22.998 4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3.998 2V4.8M3.998 4.8V17H19.998V3.2M22.928 3L19.998 3.2L3.998 4.8M3.998 4.8L1.098 5.09M9.998 17V14C9.998 12.9 10.894 12 11.998 12C13.103 12 13.998 12.9 13.998 14V17M8.998 21H14.998"/>
      <path d="M9 9C9 9.55 8.552 10 8 10C7.448 10 7 9.55 7 9C7 8.45 7.448 8 8 8C8.552 8 9 8.45 9 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
