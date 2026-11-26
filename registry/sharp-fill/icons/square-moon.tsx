import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareMoon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 2H21C21.552 2 22 2.4477 22 3V21C22 21.5523 21.552 22 21 22H3C2.448 22 2 21.5523 2 21V3C2 2.4477 2.448 2 3 2ZM7.757 16.2426C8.842 17.3273 10.343 18 12 18C15.314 18 18 15.3137 18 12C18 11.4477 17.552 11 17 11C16.773 11 16.553 11.0773 16.375 11.2191C15.358 12.0331 13.891 11.9519 12.969 11.0305C12.048 10.1091 11.967 8.6422 12.781 7.6247C12.923 7.4474 13 7.2271 13 7C13 6.4477 12.552 6 12 6C8.686 6 6 8.6863 6 12C6 13.6566 6.673 15.1579 7.757 16.2426Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
