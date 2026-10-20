import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Weight({ size = 24, ...props }: IconProps) {
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
      <path d="M15.4649 8L15.6664 8C16.8777 8 17.9702 8.7285 18.4359 9.8467L21.7673 17.8466C21.9208 18.2124 21.9999 18.605 21.9999 19.0016C21.9999 19.5938 21.8237 20.1725 21.4939 20.6643C20.941 21.4985 20.0068 22 19.006 22C19.0033 22 19.0007 22 18.998 22L5.002 22C4.9993 22 4.9967 22 4.994 22C3.9932 22 3.059 21.4985 2.5061 20.6643C2.1763 20.1725 2.0001 19.5938 2.0001 19.0016C2.0001 18.605 2.0792 18.2124 2.2326 17.8467L5.5642 9.8466C6.0299 8.7284 7.1223 8 8.3336 8L8.5351 8C8.1843 7.392 7.9996 6.7024 7.9996 6.0004C7.9996 3.7911 9.7906 2 12 2C14.2094 2 16.0004 3.7911 16.0004 6.0004C16.0004 6.7024 15.8157 7.392 15.4649 8Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8.3336 9L15.6664 9C16.4739 9 17.2022 9.4856 17.5127 10.2311L20.8442 18.2311C21.3928 19.5484 20.4249 21 18.998 21L5.002 21C3.5751 21 2.6072 19.5484 3.1558 18.2311L6.4873 10.2311C6.7978 9.4856 7.5261 9 8.3336 9ZM15 6C15 7.6569 13.6569 9 12 9C10.3431 9 9 7.6569 9 6C9 4.3431 10.3431 3 12 3C13.6569 3 15 4.3431 15 6Z" fill="none"/>
    </svg>
  )
}
