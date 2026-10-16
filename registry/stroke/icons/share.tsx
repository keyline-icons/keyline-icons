import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Share({ size = 24, ...props }: IconProps) {
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
      <path d="M9.4551 9.9845L14.5449 7.0155M9.4551 14.0155L14.5449 16.9845M21 5C21 6.6569 19.6569 8 18 8C16.3431 8 15 6.6569 15 5C15 3.3431 16.3431 2 18 2C19.6569 2 21 3.3431 21 5ZM9 12C9 13.6569 7.6569 15 6 15C4.3431 15 3 13.6569 3 12C3 10.3431 4.3431 9 6 9C7.6569 9 9 10.3431 9 12ZM21 19C21 20.6569 19.6569 22 18 22C16.3431 22 15 20.6569 15 19C15 17.3431 16.3431 16 18 16C19.6569 16 21 17.3431 21 19Z"/>
    </svg>
  )
}
