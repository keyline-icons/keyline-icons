import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChessRook({ size = 24, ...props }: IconProps) {
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
      <path d="M5 1L7 1C7.5523 1 8 1.4477 8 2L8 4L10 4L10 2C10 1.4477 10.4477 1 11 1L13 1C13.5523 1 14 1.4477 14 2L14 4L16 4L16 2C16 1.4477 16.4477 1 17 1L19 1C19.5523 1 20 1.4477 20 2L20 7C20 7.2339 19.918 7.4605 19.7682 7.6402L17.5528 10.2987L18.4082 16.2862L20.3714 17.0715C20.751 17.2234 21 17.5911 21 18L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 18C3 17.5911 3.249 17.2234 3.6286 17.0715L5.5918 16.2862L6.4472 10.2987L4.2318 7.6402C4.082 7.4605 4 7.2339 4 7L4 2C4 1.4477 4.4477 1 5 1Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M5.365 9L18.635 9L17.5528 10.2987L17.653 11L6.347 11L6.4472 10.2987L5.365 9ZM5.6327 16L18.3673 16L18.4082 16.2862L20.3714 17.0715C20.751 17.2234 21 17.5911 21 18L3 18C3 17.5911 3.249 17.2234 3.6286 17.0715L5.5918 16.2862L5.6327 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
