import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Iframe({ size = 24, ...props }: IconProps) {
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
      <path d="M18 3C19.657 3 21 4.343 21 6V9H3V6C3 4.343 4.343 3 6 3H18ZM12 12H16C17.105 12 18 12.895 18 14V16C18 17.105 17.105 18 16 18H8C6.895 18 6 17.105 6 16V14C6 12.895 6.895 12 8 12H12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M3 9H21M6 3H18C19.657 3 21 4.343 21 6V18C21 19.657 19.657 21 18 21H6C4.343 21 3 19.657 3 18V6C3 4.343 4.343 3 6 3ZM8 13H16C16.552 13 17 13.448 17 14V16C17 16.552 16.552 17 16 17H8C7.448 17 7 16.552 7 16V14C7 13.448 7.448 13 8 13Z"/>
    </svg>
  )
}
