import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HouseHeart({ size = 24, ...props }: IconProps) {
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
      <path d="M1.6141 11.0785L2 10.7782L12 2.9963L22 10.7782L22.3859 11.0785M4 9.2218L4 21L20 21L20 9.2218M12 17C10.175 15.4846 8 14.1806 8 12.2361C8 11.0011 9.0745 10 10.4 10C11 10 11.537 10.2123 12 10.5833C12.463 10.2123 13 10 13.6 10C14.9255 10 16 11.0011 16 12.2361C16 14.1806 13.825 15.4846 12 17Z"/>
    </svg>
  )
}
