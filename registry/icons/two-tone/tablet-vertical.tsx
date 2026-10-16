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
      <path d="M7 23H17C19.2091 23 21 21.2091 21 19V5C21 2.7909 19.2091 1 17 1H7C4.7909 1 3 2.7909 3 5V19C3 21.2091 4.7909 23 7 23Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M17 22H7C5.3431 22 4 20.6569 4 19V5C4 3.3432 5.3431 2 7 2H17C18.6569 2 20 3.3432 20 5V19C20 20.6569 18.6569 22 17 22Z"/>
      <path d="M8.5 13.5C9.3284 13.5 10 12.8284 10 12C10 11.1716 9.3284 10.5 8.5 10.5C7.6716 10.5 7 11.1716 7 12C7 12.8284 7.6716 13.5 8.5 13.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
