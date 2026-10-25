import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RocketVerticalOff({ size = 24, ...props }: IconProps) {
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
      <path d="M11.3421 1.2469C11.5243 1.0877 11.758 0.9999 12 0.9999C12.242 0.9999 12.4757 1.0876 12.6579 1.2468C15.4968 3.727 17.1257 7.3129 17.1257 11.0826C17.1257 11.6469 17.0891 12.2107 17.0162 12.7703L19.7072 15.4613C19.8947 15.6489 20 15.9033 20 16.1685C20 16.2226 19.9956 16.2766 19.9869 16.33L15.1192 11.4624L8.4748 4.818C9.2126 3.468 10.1833 2.259 11.3421 1.2469ZM17.7438 20.5722L16.7077 22.4776C16.5327 22.7996 16.1956 23 15.8292 23C15.564 23 15.3096 22.8947 15.1221 22.7071L14.2206 21.8056L9.7794 21.8056L8.8779 22.7071C8.6904 22.8947 8.436 23 8.1708 23C7.8044 23 7.4673 22.7996 7.2923 22.4776L4.1214 16.6461C4.0417 16.4995 4 16.3353 4 16.1684C4 15.9032 4.1053 15.6489 4.2928 15.4613L6.9838 12.7703C6.9109 12.2107 6.8743 11.6469 6.8743 11.0826C6.8743 9.8372 7.0524 8.5982 7.4033 7.4033L18.74 18.7401L17.7438 20.5722Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8.2191 8.2191C7.9921 9.1479 7.8743 10.1087 7.8743 11.0828C7.8743 11.7657 7.9323 12.4475 8.0477 13.1206L5 16.1684L8.1708 22L9.3652 20.8056L14.6348 20.8056L15.8292 22L18.0027 18.0027M14.6348 20.8056L15.5379 15.5379M9.3652 20.8056L8.0477 13.1206M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
