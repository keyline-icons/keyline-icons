import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlagSwallowtail({ size = 24, ...props }: IconProps) {
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
      <path d="M4 2L4 22M4 4L18.9983 4C19.797 4 20.2734 4.8901 19.8303 5.5547L17.0517 9.7226C16.9398 9.8906 16.9398 10.1094 17.0517 10.2774L19.8303 14.4453C20.2734 15.1099 19.797 16 18.9983 16L4 16" fill="none"/>
    </svg>
  )
}
