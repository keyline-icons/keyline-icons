import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleSquare({ size = 24, ...props }: IconProps) {
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
      <path d="M17 9C17 13.2803 13.2803 17 9 17C4.7197 17 1 13.2803 1 9C1 4.7197 4.7197 1 9 1C13.2803 1 17 4.7197 17 9ZM9 8L22 8C22.5523 8 23 8.4477 23 9L23 22C23 22.5523 22.5523 23 22 23L9 23C8.4477 23 8 22.5523 8 22L8 9C8 8.4477 8.4477 8 9 8Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M16 9C16 5.1339 12.8661 2 9 2C5.1339 2 2 5.1339 2 9C2 12.8661 5.1339 16 9 16C12.8661 16 16 12.8661 16 9ZM9 9L22 9L22 22L9 22L9 9Z"/>
    </svg>
  )
}
