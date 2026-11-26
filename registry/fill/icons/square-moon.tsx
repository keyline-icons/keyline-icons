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
      <path d="M2 6C2 3.7909 3.7909 2 6 2H18C20.2091 2 22 3.7909 22 6V18C22 20.2091 20.2091 22 18 22H6C3.7909 22 2 20.2091 2 18V6ZM7.7574 16.2426C8.8421 17.3273 10.3434 18 12 18C15.3137 18 18 15.3137 18 12C18 11.4477 17.5523 11 17 11C16.7729 11 16.5526 11.0773 16.3753 11.2191C15.3578 12.0331 13.8909 11.9519 12.9695 11.0305C12.0481 10.1091 11.9669 8.6422 12.7809 7.6247C12.9227 7.4474 13 7.2271 13 7C13 6.4477 12.5523 6 12 6C8.6863 6 6 8.6863 6 12C6 13.6566 6.6727 15.1579 7.7574 16.2426Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
