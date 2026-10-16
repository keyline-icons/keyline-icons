import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Milestone({ size = 24, ...props }: IconProps) {
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
      <path d="M5 5L16.7192 5C16.9029 5 17.0829 5.0506 17.2397 5.1461L20.5205 7.1461C21.1599 7.5359 21.1599 8.4641 20.5205 8.8539L17.2397 10.8539C17.0829 10.9494 16.9029 11 16.7192 11L5 11C3.8954 11 3 10.1046 3 9L3 7C3 5.8954 3.8954 5 5 5ZM12 2L12 5M12 11L12 22M8 22L16 22"/>
    </svg>
  )
}
