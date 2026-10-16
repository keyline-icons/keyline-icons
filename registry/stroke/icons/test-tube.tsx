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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10 2L14 2C14.5523 2 15 2.4477 15 3L15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19L9 3C9 2.4477 9.4477 2 10 2ZM8 2L16 2M9 14L15 14" fill="none"/>
    </svg>
  )
}
