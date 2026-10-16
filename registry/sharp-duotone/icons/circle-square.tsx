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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M17 9C17 13.2803 13.2803 17 9 17C4.7197 17 1 13.2803 1 9C1 4.7197 4.7197 1 9 1C13.2803 1 17 4.7197 17 9Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M9 8L22 8C22.5523 8 23 8.4477 23 9L23 22C23 22.5523 22.5523 23 22 23L9 23C8.4477 23 8 22.5523 8 22L8 9C8 8.4477 8.4477 8 9 8Z" fill="currentColor"/>
    </svg>
  )
}
