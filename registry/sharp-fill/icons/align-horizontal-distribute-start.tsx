import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignHorizontalDistributeStart({ size = 24, ...props }: IconProps) {
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
      <path d="M5 1V3H10C10.552 3 11 3.448 11 4V20C11 20.552 10.552 21 10 21H5V23H3V1H5ZM15 1V7H20C20.552 7 21 7.448 21 8V16C21 16.552 20.552 17 20 17H15V23H13V1H15Z" fill="currentColor"/>
    </svg>
  )
}
