import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignStartHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M10 5C10.552 5 11 5.448 11 6V22C11 22.552 10.552 23 10 23H4C3.448 23 3 22.552 3 22V6C3 5.448 3.448 5 4 5H10ZM20 5C20.552 5 21 5.448 21 6V14C21 14.552 20.552 15 20 15H14C13.448 15 13 14.552 13 14V6C13 5.448 13.448 5 14 5H20Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M23 1V3H1V1H23Z" fill="currentColor"/>
    </svg>
  )
}
