import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Directions({ size = 24, ...props }: IconProps) {
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
      <path d="M16 19C16 21.2091 14.2091 23 12 23C9.7909 23 8 21.2091 8 19C8 16.7909 9.7909 15 12 15C14.2091 15 16 16.7909 16 19Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19C9 17.3431 10.3431 16 12 16C13.6569 16 15 17.3431 15 19ZM12 16C12 13.7909 13.7909 12 16 12L22 12M19 9L22 12L19 15M12 9L12 2M9 5L12 2L15 5M9 12L2 12M5 15L2 12L5 9" fill="none"/>
    </svg>
  )
}
