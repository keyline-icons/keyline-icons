import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ImageScan({ size = 24, ...props }: IconProps) {
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
      <path d="M14 12L14 21C14 21.5523 13.5523 22 13 22L6 22C3.7908 22 2 20.2092 2 18L2 6C2 3.7908 3.7908 2 6 2L13 2C13.5523 2 14 2.4477 14 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3 18C3 19.6569 4.3431 21 6 21H13M3 18V6C3 4.3431 4.3431 3 6 3H13M3 18L7.9393 13.0607C8.5251 12.4749 9.4749 12.4749 10.0607 13.0607L12.0801 15.0801C12.3353 15.3353 12.6626 15.481 13 15.5128M13 3V2M13 3V15.5128M13 15.5128V21M13 22V21M17 3V10M17 21V14M21 20V18M21 14V10M21 6V4"/>
      <path d="M9.5 7.5C9.5 8.3284 8.8284 9 8 9C7.1716 9 6.5 8.3284 6.5 7.5C6.5 6.6716 7.1716 6 8 6C8.8284 6 9.5 6.6716 9.5 7.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
