import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UsersPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M19 3V9M16 6H22M18.333 13.471C20.554 14.409 22 16.589 22 19V20C22 20.552 21.552 21 21 21"/>
      <path d="M8 12H10C13.866 12 17 15.134 17 19V20C17 21.105 16.105 22 15 22H3C1.895 22 1 21.105 1 20V19C1 15.134 4.134 12 8 12ZM13 6C13 8.209 11.209 10 9 10C6.791 10 5 8.209 5 6C5 3.791 6.791 2 9 2C11.209 2 13 3.791 13 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
