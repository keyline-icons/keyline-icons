import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignVerticalDistributeStart({ size = 24, ...props }: IconProps) {
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
      <path d="M20 13C20.552 13 21 13.448 21 14V20C21 20.552 20.552 21 20 21H4C3.448 21 3 20.552 3 20V14C3 13.448 3.448 13 4 13H20ZM16 3C16.552 3 17 3.448 17 4V10C17 10.552 16.552 11 16 11H8C7.448 11 7 10.552 7 10V4C7 3.448 7.448 3 8 3H16Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M23 13V15H1V13H23ZM23 3V5H1V3H23Z" fill="currentColor"/>
    </svg>
  )
}
