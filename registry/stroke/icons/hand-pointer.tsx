import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandPointer({ size = 24, ...props }: IconProps) {
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
      <path d="M11.3411 10.7081L10.0066 3.2808C9.8541 2.432 9.0731 1.8711 8.2588 2.0256C7.4413 2.1807 6.8991 2.9979 7.0478 3.851L8.6441 13.0124C8.7288 13.4989 8.1321 13.8007 7.7905 13.4442L6.2134 11.7985C5.7652 11.3308 5.0587 11.2698 4.543 11.6542C3.9884 12.0676 3.8353 12.8584 4.1924 13.4641L5.7051 16.0291C8.9257 22.1904 12.6831 22.1904 14.8301 21.9102C20.7345 20.7899 20.4661 11.8283 19.3926 10.428C18.3191 9.0278 17.1966 10.453 17.1966 11.0129M10.8379 7.9076L12.2681 7.7687C13.1075 7.689 13.8637 8.2983 14.0023 9.1659L14.2934 10.9881M17.2456 11.2682L16.9103 9.5188C16.7908 8.8953 16.2925 8.4282 15.6857 8.3706C14.7425 8.2811 13.9351 9.2245 14.1648 10.1834" fill="none"/>
    </svg>
  )
}
