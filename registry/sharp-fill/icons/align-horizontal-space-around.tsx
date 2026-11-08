import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignHorizontalSpaceAround({ size = 24, ...props }: IconProps) {
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
      <path d="M5 1V23H3V1H5ZM21 1V23H19V1H21Z" fill="currentColor"/>
      <path d="M15 6C15.552 6 16 6.448 16 7V17C16 17.552 15.552 18 15 18H9C8.448 18 8 17.552 8 17V7C8 6.448 8.448 6 9 6H15Z" fill="currentColor"/>
    </svg>
  )
}
