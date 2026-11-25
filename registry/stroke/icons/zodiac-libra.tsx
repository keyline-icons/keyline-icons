import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ZodiacLibra({ size = 24, ...props }: IconProps) {
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
      <path d="M2 13L5 13C5.5523 13 6 12.5523 6 12L6 11C6 7.6863 8.6863 5 12 5C15.3137 5 18 7.6863 18 11L18 12C18 12.5523 18.4477 13 19 13L22 13M2 19L22 19"/>
    </svg>
  )
}
