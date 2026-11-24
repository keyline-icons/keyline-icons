import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Champagne({ size = 24, ...props }: IconProps) {
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
      <path d="M9 2H15C15.5523 2 16 2.4477 16 3C16 5 17 6.5 17 9C17 12.5 14.8 15 12 15C9.2 15 7 12.5 7 9C7 6.5 8 5 8 3C8 2.4477 8.4477 2 9 2ZM7.4503 6H16.5497M12 15V22M8 22H16"/>
    </svg>
  )
}
