import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignVerticalDistributeCenter({ size = 24, ...props }: IconProps) {
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
      <path d="M17 13C17.552 13 18 13.448 18 14V20C18 20.552 17.552 21 17 21H7C6.448 21 6 20.552 6 20V14C6 13.448 6.448 13 7 13H17ZM19 3C19.552 3 20 3.448 20 4V10C20 10.552 19.552 11 19 11H5C4.448 11 4 10.552 4 10V4C4 3.448 4.448 3 5 3H19Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M7 16V18H1V16H7ZM23 16V18H17V16H23ZM5 6V8H1V6H5Z" fill="currentColor"/>
      <path d="M23 6V8H19V6H23Z" fill="currentColor"/>
    </svg>
  )
}
