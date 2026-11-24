import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Spade({ size = 24, ...props }: IconProps) {
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
      <path d="M12 3C15.6769 6.2627 21 9.5 21 13.5C21 15.9853 18.9853 18 16.5 18C15.61 18 14.74 17.7361 14 17.2417L14 18.5L16.5 21L7.5 21L10 18.5L10 17.2417C9.26 17.7361 8.39 18 7.5 18C5.0147 18 3 15.9853 3 13.5C3 9.5 8.3231 6.2627 12 3Z" fill="none"/>
    </svg>
  )
}
