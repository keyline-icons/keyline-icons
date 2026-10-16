import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Blocks({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 5C2 4.4477 2.4477 4 3 4L9 4C9.5523 4 10 4.4477 10 5L10 11C10 11.5523 9.5523 12 9 12L3 12C2.4477 12 2 11.5523 2 11L2 5ZM2 15C2 14.4477 2.4477 14 3 14L9 14C9.5523 14 10 14.4477 10 15L10 21C10 21.5523 9.5523 22 9 22L3 22C2.4477 22 2 21.5523 2 21L2 15ZM12 15C12 14.4477 12.4477 14 13 14L19 14C19.5523 14 20 14.4477 20 15L20 21C20 21.5523 19.5523 22 19 22L13 22C12.4477 22 12 21.5523 12 21L12 15Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M14 3C14 2.4477 14.4477 2 15 2L21 2C21.5523 2 22 2.4477 22 3L22 9C22 9.5523 21.5523 10 21 10L15 10C14.4477 10 14 9.5523 14 9L14 3Z" fill="currentColor"/>
    </svg>
  )
}
