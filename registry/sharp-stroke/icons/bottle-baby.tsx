import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BottleBaby({ size = 24, ...props }: IconProps) {
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
      <path d="M9.5 6C9.5 4.5 10.5 5 10.5 3.5C10.5 2.6716 11.1716 2 12 2C12.8284 2 13.5 2.6716 13.5 3.5C13.5 5 14.5 4.5 14.5 6M17 18L14 18L13 18M17 14L14 14L13 14M8 10L8 6L16 6L16 10M8 10L16 10M16 10L17 12.0002L17 14L17 18L17 22L7 22L7 12L8 10" fill="none"/>
    </svg>
  )
}
