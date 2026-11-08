import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GreaterThanEqual({ size = 24, ...props }: IconProps) {
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
      <path d="M16.53 9.15C16.823 9.33 17 9.66 17 10C17 10.34 16.822 10.66 16.53 10.85L8.06 16.14L7.53 15.29L7 14.45L14.112 10L7.227 5.7L8.287 4L16.53 9.15Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M17 18V20H7V18H17Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
