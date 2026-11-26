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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 6H9C9.5523 6 10 6.4477 10 7V17C10 17.5523 9.5523 18 9 18H5V23H3V1H5ZM19 6H15C14.4477 6 14 6.4477 14 7V17C14 17.5523 14.4477 18 15 18H19V23H21V1H19Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20 1V23M4 1V23M4 7V17H9V7H4ZM15 7V17H20V7H15Z"/>
    </svg>
  )
}
