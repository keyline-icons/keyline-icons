import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DollarSign({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1L12 2L12 22L12 23M17 4L16 4L10 4C7.7909 4 6 5.7909 6 8C6 10.2091 7.7909 12 10 12L14 12C16.2091 12 18 13.7909 18 16C18 18.2091 16.2091 20 14 20L8 20L7 20" fill="none"/>
    </svg>
  )
}
