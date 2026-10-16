import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartColumnBig({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2L3 21L22 21" strokeOpacity="0.4"/>
      <path d="M8 7L12 7C12.5523 7 13 7.4477 13 8L13 17C13 17.5523 12.5523 18 12 18L8 18C7.4477 18 7 17.5523 7 17L7 8C7 7.4477 7.4477 7 8 7ZM16 4L20 4C20.5523 4 21 4.4477 21 5L21 17C21 17.5523 20.5523 18 20 18L16 18C15.4477 18 15 17.5523 15 17L15 5C15 4.4477 15.4477 4 16 4Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
