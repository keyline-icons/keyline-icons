import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HomeHeart({ size = 24, ...props }: IconProps) {
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
      <path d="M21 10L12 2.9963L3 10L3 21L21 21ZM12 17C10.4032 15.7011 8.5 14.5833 8.5 12.9167C8.5 11.8581 9.4402 11 10.6 11C11.125 11 11.5949 11.182 12 11.5C12.4051 11.182 12.875 11 13.4 11C14.5598 11 15.5 11.8581 15.5 12.9167C15.5 14.5833 13.5968 15.7011 12 17Z"/>
    </svg>
  )
}
