import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareListPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M6 2H18C20.2091 2 22 3.791 22 6V11C22 11.552 21.5523 12 21 12H15C13.3431 12 12 13.343 12 15V21C12 21.552 11.5523 22 11 22H6C3.7909 22 2 20.209 2 18V6C2 3.791 3.7909 2 6 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11 21H6C4.3432 21 3 19.657 3 18V6C3 4.343 4.3432 3 6 3H18C19.6569 3 21 4.343 21 6V11M12 8H16M18 15V21M15 18H21"/>
      <path d="M9 8C9 8.552 8.5523 9 8 9C7.4477 9 7 8.552 7 8C7 7.448 7.4477 7 8 7C8.5523 7 9 7.448 9 8ZM9 12C9 12.552 8.5523 13 8 13C7.4477 13 7 12.552 7 12C7 11.448 7.4477 11 8 11C8.5523 11 9 11.448 9 12ZM9 16C9 16.552 8.5523 17 8 17C7.4477 17 7 16.552 7 16C7 15.448 7.4477 15 8 15C8.5523 15 9 15.448 9 16Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
