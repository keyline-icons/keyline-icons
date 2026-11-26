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
      <path d="M5 6H9C9.552 6 10 6.4477 10 7V17C10 17.5523 9.552 18 9 18H5V23H3V1H5V6ZM19 6H15C14.448 6 14 6.4477 14 7V17C14 17.5523 14.448 18 15 18H19V23H21V1H19V6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
