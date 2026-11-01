import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Desk({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2 12L22 12M7 8L7 12L4 12L4 22M20 12L20 22M20 19L4 19M7 8L4.6404 8C4.3151 8 4.0764 7.6943 4.1553 7.3787L5.4053 2.3787C5.461 2.1562 5.661 2 5.8904 2L8.1096 2C8.339 2 8.539 2.1562 8.5947 2.3787L9.8447 7.3787C9.9236 7.6943 9.6849 8 9.3596 8Z" fill="none"/>
    </svg>
  )
}
