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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M8.1912 2L15.8088 2C16.2612 4.3236 16.6584 6.6576 17 9C17 12.5 14.8 15 12 15C9.2 15 7 12.5 7 9C7.3416 6.6576 7.7388 4.3236 8.1912 2ZM7.4663 6L16.5337 6M12 15L12 22M7 22L8 22L16 22L17 22" fill="none"/>
    </svg>
  )
}
