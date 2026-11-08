import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignStartVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M22 13C22.552 13 23 13.448 23 14V20C23 20.552 22.552 21 22 21H6C5.448 21 5 20.552 5 20V14C5 13.448 5.448 13 6 13H22ZM14 3C14.552 3 15 3.448 15 4V10C15 10.552 14.552 11 14 11H6C5.448 11 5 10.552 5 10V4C5 3.448 5.448 3 6 3H14Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M3 1V23H1V1H3Z" fill="currentColor"/>
    </svg>
  )
}
