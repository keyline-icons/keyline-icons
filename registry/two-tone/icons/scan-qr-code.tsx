import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanQrCode({ size = 24, ...props }: IconProps) {
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
      <path d="M3 8L3 6C3 4.3431 4.3431 3 6 3L8 3M16 3L18 3C19.6569 3 21 4.3431 21 6L21 8M21 16L21 18C21 19.6569 19.6569 21 18 21L16 21M8 21L6 21C4.3431 21 3 19.6569 3 18L3 16" strokeOpacity="0.4"/>
      <path d="M12 7L12 10C12 11.1046 12.8954 12 14 12L17 12M12 21L12 18C12 16.8954 11.1046 16 10 16L7 16M8 12L3 12M7.5 7L7.5 8M16.5 16L16.5 17"/>
      <path d="M13 3C13 3.5523 12.5523 4 12 4C11.4477 4 11 3.5523 11 3C11 2.4477 11.4477 2 12 2C12.5523 2 13 2.4477 13 3ZM22 12C22 12.5523 21.5523 13 21 13C20.4477 13 20 12.5523 20 12C20 11.4477 20.4477 11 21 11C21.5523 11 22 11.4477 22 12ZM17.5 7.5C17.5 8.0523 17.0523 8.5 16.5 8.5C15.9477 8.5 15.5 8.0523 15.5 7.5C15.5 6.9477 15.9477 6.5 16.5 6.5C17.0523 6.5 17.5 6.9477 17.5 7.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
