import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RocketVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M9.7794 21.8056L14.2206 21.8056L15.1221 22.7071C15.3096 22.8946 15.564 23 15.8292 23C16.1956 23 16.5327 22.7996 16.7077 22.4776L19.8786 16.6461C19.9583 16.4995 20 16.3353 20 16.1684C20 15.9032 19.8947 15.6488 19.7072 15.4613L17.0162 12.7703C17.0891 12.2108 17.1257 11.6471 17.1257 11.0828C17.1257 7.313 15.4969 3.7271 12.6579 1.2469C12.4757 1.0877 12.242 0.9999 12 0.9999C11.758 0.9999 11.5243 1.0877 11.3421 1.2469C8.5031 3.7271 6.8743 7.313 6.8743 11.0828C6.8743 11.6471 6.9109 12.2108 6.9838 12.7703L4.2928 15.4613C4.1053 15.6488 4 15.9032 4 16.1684C4 16.3353 4.0417 16.4995 4.1214 16.6461L7.2923 22.4776C7.4673 22.7996 7.8044 23 8.1708 23C8.436 23 8.6904 22.8946 8.8779 22.7071L9.7794 21.8056Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.6348 20.8056L15.9523 13.1206M9.3652 20.8056L8.0477 13.1206"/>
    </svg>
  )
}
