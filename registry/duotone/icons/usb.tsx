import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Usb({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M7 12C7 13.6569 5.6569 15 4 15C2.3431 15 1 13.6569 1 12C1 10.3431 2.3431 9 4 9C5.6569 9 7 10.3431 7 12ZM17.5 6C17.5 7.6569 16.1569 9 14.5 9C12.8431 9 11.5 7.6569 11.5 6C11.5 4.3431 12.8431 3 14.5 3C16.1569 3 17.5 4.3431 17.5 6ZM12 15L14 15C15.1046 15 16 15.8954 16 17L16 19C16 20.1046 15.1046 21 14 21L12 21C10.8954 21 10 20.1046 10 19L10 17C10 15.8954 10.8954 15 12 15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 12L22 12M10 12L13.3 7.6M10 12L13 16M20 10L22 12L20 14"/>
    </svg>
  )
}
