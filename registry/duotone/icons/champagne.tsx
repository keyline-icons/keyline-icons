import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Champagne({ size = 24, ...props }: IconProps) {
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
      <path d="M11 15.9104C9.6959 15.673 8.5483 14.9757 7.687 13.9588C6.6161 12.6947 6 10.9575 6 9C6 7.6112 6.2805 6.5045 6.5338 5.5548C6.7922 4.5855 7 3.8439 7 3C7 1.8954 7.8954 1 9 1L15 1C16.1046 1 17 1.8954 17 3C17 3.8439 17.2078 4.5855 17.4662 5.5548C17.7195 6.5045 18 7.6112 18 9C18 10.9575 17.3839 12.6947 16.313 13.9588C15.4517 14.9757 14.3041 15.673 13 15.9104L13 21L16 21C16.5523 21 17 21.4477 17 22C17 22.5523 16.5523 23 16 23L12 23L8 23C7.4477 23 7 22.5523 7 22C7 21.4477 7.4477 21 8 21L11 21Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12 5L7.4503 5C6.996 5 6.5987 5.3063 6.4832 5.7457C6.2443 6.6541 6 7.7025 6 9C6 10.9575 6.6161 12.6947 7.687 13.9588C8.7625 15.2286 10.2844 16 12 16C13.7156 16 15.2375 15.2286 16.313 13.9588C17.3839 12.6947 18 10.9575 18 9C18 7.7025 17.7557 6.6541 17.5168 5.7457C17.4013 5.3063 17.004 5 16.5497 5Z" fill="currentColor"/>
    </svg>
  )
}
