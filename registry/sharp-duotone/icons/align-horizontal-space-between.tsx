import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignHorizontalSpaceBetween({ size = 24, ...props }: IconProps) {
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
      <path d="M4 6H9C9.552 6 10 6.4477 10 7V17C10 17.5523 9.552 18 9 18H4C3.448 18 3 17.5523 3 17V7C3 6.4477 3.448 6 4 6ZM20 6H15C14.448 6 14 6.4477 14 7V17C14 17.5523 14.448 18 15 18H20C20.552 18 21 17.5523 21 17V7C21 6.4477 20.552 6 20 6Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M5 1V23H3V1H5ZM21 1V23H19V1H21Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
