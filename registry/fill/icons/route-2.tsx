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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 15C8.209 15 10 16.791 10 19C10 21.209 8.209 23 6 23C3.791 23 2 21.209 2 19C2 16.791 3.791 15 6 15ZM18 1C20.209 1 22 2.791 22 5C22 7.209 20.209 9 18 9C15.791 9 14 7.209 14 5C14 2.791 15.791 1 18 1Z" fill="currentColor" stroke="none"/>
      <path d="M15 5H10.5C8.567 5 7 6.567 7 8.5C7 10.433 8.567 12 10.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9"/>
    </svg>
  )
}
