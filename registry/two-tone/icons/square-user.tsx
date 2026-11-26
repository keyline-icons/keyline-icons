import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareUser({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2H18C20.209 2 22 3.7909 22 6V18C22 20.2092 20.209 22 18 22H6C3.791 22 2 20.2092 2 18V6C2 3.7909 3.791 2 6 2H12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 3H18C19.657 3 21 4.3432 21 6V18C21 19.6569 19.657 21 18 21H6C4.343 21 3 19.6569 3 18V6C3 4.3432 4.343 3 6 3Z"/>
      <path d="M14.121 11.1213C13.579 11.6631 12.828 12 12 12C10.343 12 9 10.6569 9 9C9 7.3432 10.343 6 12 6C13.657 6 15 7.3432 15 9C15 9.8282 14.663 10.5795 14.121 11.1213ZM6 20V19C6 16.2386 8.239 14 11 14H13C15.761 14 18 16.2386 18 19V20H6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
