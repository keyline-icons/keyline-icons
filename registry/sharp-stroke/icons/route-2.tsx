import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Route2({ size = 24, ...props }: IconProps) {
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
      <path d="M15 5H10.5C8.567 5 7 6.567 7 8.5C7 10.433 8.567 12 10.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9M15 5C15 6.657 16.343 8 18 8C19.657 8 21 6.657 21 5C21 3.343 19.657 2 18 2C16.343 2 15 3.343 15 5ZM9 19C9 17.343 7.657 16 6 16C4.343 16 3 17.343 3 19C3 20.657 4.343 22 6 22C7.657 22 9 20.657 9 19Z"/>
    </svg>
  )
}
