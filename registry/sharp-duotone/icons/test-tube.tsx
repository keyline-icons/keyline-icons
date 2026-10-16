import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TestTube({ size = 24, ...props }: IconProps) {
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
      <path d="M9 1L15 1C15.5523 1 16 1.4477 16 2L16 19C16 21.2091 14.2091 23 12 23C9.7909 23 8 21.2091 8 19L8 2C8 1.4477 8.4477 1 9 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8 13L16 13L16 19C16 21.2091 14.2091 23 12 23C9.7909 23 8 21.2091 8 19Z" fill="currentColor" stroke="none"/>
      <path d="M7 2L17 2"/>
    </svg>
  )
}
