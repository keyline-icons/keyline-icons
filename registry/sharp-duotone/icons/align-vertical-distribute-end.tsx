import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignVerticalDistributeEnd({ size = 24, ...props }: IconProps) {
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
      <path d="M16 13C16.552 13 17 13.448 17 14V20C17 20.552 16.552 21 16 21H8C7.448 21 7 20.552 7 20V14C7 13.448 7.448 13 8 13H16ZM20 3C20.552 3 21 3.448 21 4V10C21 10.552 20.552 11 20 11H4C3.448 11 3 10.552 3 10V4C3 3.448 3.448 3 4 3H20Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M23 19V21H1V19H23ZM23 9V11H1V9H23Z" fill="currentColor"/>
    </svg>
  )
}
