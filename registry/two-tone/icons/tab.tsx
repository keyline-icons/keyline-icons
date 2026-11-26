import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Tab({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2H18C20.2092 2 22 3.791 22 6V18C22 20.209 20.2092 22 18 22H6C3.7909 22 2 20.209 2 18V6C2 3.791 3.7909 2 6 2H12ZM18 3H12V7C12 7.552 12.4477 8 13 8H21V6C21 4.343 19.6569 3 18 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 3V7C12 7.552 12.4477 8 13 8H21M6 3H18C19.6569 3 21 4.343 21 6V18C21 19.657 19.6569 21 18 21H6C4.3432 21 3 19.657 3 18V6C3 4.343 4.3432 3 6 3Z"/>
    </svg>
  )
}
