import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TabletVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M17 22H7C5.3431 22 4 20.6569 4 19V5C4 3.3432 5.3431 2 7 2H17C18.6569 2 20 3.3432 20 5V19C20 20.6569 18.6569 22 17 22Z"/>
      <path d="M8.5 13.5C9.3284 13.5 10 12.8284 10 12C10 11.1716 9.3284 10.5 8.5 10.5C7.6716 10.5 7 11.1716 7 12C7 12.8284 7.6716 13.5 8.5 13.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
