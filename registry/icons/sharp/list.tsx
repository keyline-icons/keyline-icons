import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function List({ size = 24, ...props }: IconProps) {
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
      <path d="M5 5C5 5.8284 4.3284 6.5 3.5 6.5C2.6716 6.5 2 5.8284 2 5C2 4.1716 2.6716 3.5 3.5 3.5C4.3284 3.5 5 4.1716 5 5ZM5 12C5 12.8284 4.3284 13.5 3.5 13.5C2.6716 13.5 2 12.8284 2 12C2 11.1716 2.6716 10.5 3.5 10.5C4.3284 10.5 5 11.1716 5 12ZM5 19C5 19.8284 4.3284 20.5 3.5 20.5C2.6716 20.5 2 19.8284 2 19C2 18.1716 2.6716 17.5 3.5 17.5C4.3284 17.5 5 18.1716 5 19Z" fill="currentColor" stroke="none"/>
      <path d="M7 5L22 5M7 12L22 12M7 19L22 19" fill="none"/>
    </svg>
  )
}
