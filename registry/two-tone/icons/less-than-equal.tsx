import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LessThanEqual({ size = 24, ...props }: IconProps) {
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
      <path d="M15.4697 4.15C15.9379 3.86 16.5549 4 16.8477 4.47C17.1403 4.94 16.9983 5.55 16.5303 5.85L9.8857 10L16.5303 14.15C16.9983 14.45 17.1403 15.06 16.8477 15.53C16.5549 16 15.9379 16.14 15.4697 15.85L7.4697 10.85C7.1776 10.66 7 10.34 7 10C7 9.66 7.1776 9.33 7.4697 9.15L15.4697 4.15Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M16 18C16.5523 18 17 18.45 17 19C17 19.55 16.5523 20 16 20H8C7.4477 20 7 19.55 7 19C7 18.45 7.4477 18 8 18H16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
