import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Guidepoint({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 14.21 21.2091 16 19 16C17.1362 16 15.57 14.73 15.126 13H8.874C8.43 14.73 6.8638 16 5 16C2.7909 16 1 14.21 1 12C1 9.79 2.7909 8 5 8C6.8638 8 8.43 9.27 8.874 11H15.126C15.57 9.27 17.1362 8 19 8C21.2091 8 23 9.79 23 12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M16 12C16 10.34 17.3432 9 19 9C20.6568 9 22 10.34 22 12C22 13.66 20.6568 15 19 15C17.3432 15 16 13.66 16 12ZM16 12H8M8 12C8 13.66 6.6568 15 5 15C3.3432 15 2 13.66 2 12C2 10.34 3.3432 9 5 9C6.6568 9 8 10.34 8 12Z"/>
    </svg>
  )
}
