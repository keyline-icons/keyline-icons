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
      <path d="M16.773 5.7L9.887 10L17 14.45L16.47 15.29L15.94 16.14L7.47 10.85C7.178 10.66 7 10.34 7 10C7 9.66 7.177 9.33 7.47 9.15L15.713 4L16.773 5.7Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M17 18V20H7V18H17Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
