import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartCandlestick({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L3 19C3 20.1046 3.8954 21 5 21L21 21" strokeOpacity="0.4"/>
      <path d="M8 4L10 4C11.1046 4 12 4.8954 12 6L12 9C12 10.1046 11.1046 11 10 11L8 11C6.8954 11 6 10.1046 6 9L6 6C6 4.8954 6.8954 4 8 4ZM16 8L18 8C19.1046 8 20 8.8954 20 10L20 14C20 15.1046 19.1046 16 18 16L16 16C14.8954 16 14 15.1046 14 14L14 10C14 8.8954 14.8954 8 16 8Z" fill="currentColor" stroke="none"/>
      <path d="M9 3L9 5M9 10L9 13M17 6L17 9M17 15L17 17"/>
    </svg>
  )
}
