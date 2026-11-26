import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CastAlert({ size = 24, ...props }: IconProps) {
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
      <path d="M2 8V7C2 5.343 3.3432 4 5 4H12M22 14V17C22 18.657 20.6569 20 19 20H14M2 16C4.2091 16 6 17.791 6 20M2 12C6.4183 12 10 15.582 10 20M19 4V6"/>
      <path d="M3 20C3 20.552 2.5523 21 2 21C1.4477 21 1 20.552 1 20C1 19.448 1.4477 19 2 19C2.5523 19 3 19.448 3 20ZM20 10C20 10.552 19.5523 11 19 11C18.4477 11 18 10.552 18 10C18 9.448 18.4477 9 19 9C19.5523 9 20 9.448 20 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
