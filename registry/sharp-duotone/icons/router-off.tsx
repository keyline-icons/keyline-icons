import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RouterOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.88 21H2C1.448 21 1 20.5523 1 20V12C1 11.4477 1.448 11 2 11H5.719L4.363 5.5758L5.237 5.3573L6.748 6.8676L7.781 11H10.88L20.88 21ZM9 16C9 15.4477 8.552 15 8 15C7.448 15 7 15.4477 7 16C7 16.5523 7.448 17 8 17C8.552 17 9 16.5523 9 16ZM18.281 11H22C22.552 11 23 11.4477 23 12V19.3431L14.657 11H16.219L18.219 3L20.16 3.485L18.281 11Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.707 1.7071L22.293 22.293"/>
    </svg>
  )
}
