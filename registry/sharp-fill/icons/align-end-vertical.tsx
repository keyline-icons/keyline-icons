import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignEndVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M23 1V23H21V1H23ZM18 13C18.552 13 19 13.448 19 14V20C19 20.552 18.552 21 18 21H2C1.448 21 1 20.552 1 20V14C1 13.448 1.448 13 2 13H18Z" fill="currentColor"/>
      <path d="M18 3C18.552 3 19 3.448 19 4V10C19 10.552 18.552 11 18 11H10C9.448 11 9 10.552 9 10V4C9 3.448 9.448 3 10 3H18Z" fill="currentColor"/>
    </svg>
  )
}
