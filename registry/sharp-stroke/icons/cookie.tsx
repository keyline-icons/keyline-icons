import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cookie({ size = 24, ...props }: IconProps) {
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
      <path d="M20.7122 16.909L19.8511 16.3772C19.4761 16.1456 19.142 15.8537 18.8622 15.5132C17.4595 13.8064 17.3643 10.3315 19.0711 8.9289C16.862 8.9289 15.0711 7.138 15.0711 4.9289C15.0711 4.1446 15.3017 3.3776 15.7341 2.7233C14.5471 2.2456 13.2795 2 12 2C6.4772 2 2 6.4772 2 12C2 17.5228 6.4772 22 12 22C15.6101 22 18.94 20.0542 20.7122 16.909Z" fill="none"/>
      <path d="M10 8C10 8.5523 9.5523 9 9 9C8.4477 9 8 8.5523 8 8C8 7.4477 8.4477 7 9 7C9.5523 7 10 7.4477 10 8ZM15 11.5C15 12.3284 14.3284 13 13.5 13C12.6716 13 12 12.3284 12 11.5C12 10.6716 12.6716 10 13.5 10C14.3284 10 15 10.6716 15 11.5ZM11 17C11 17.5523 10.5523 18 10 18C9.4477 18 9 17.5523 9 17C9 16.4477 9.4477 16 10 16C10.5523 16 11 16.4477 11 17ZM16 17C16 17.5523 15.5523 18 15 18C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17ZM8 12.5C8 13.3284 7.3284 14 6.5 14C5.6716 14 5 13.3284 5 12.5C5 11.6716 5.6716 11 6.5 11C7.3284 11 8 11.6716 8 12.5ZM22 4.5C22 5.3284 21.3284 6 20.5 6C19.6716 6 19 5.3284 19 4.5C19 3.6716 19.6716 3 20.5 3C21.3284 3 22 3.6716 22 4.5ZM23 13C23 13.5523 22.5523 14 22 14C21.4477 14 21 13.5523 21 13C21 12.4477 21.4477 12 22 12C22.5523 12 23 12.4477 23 13Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
