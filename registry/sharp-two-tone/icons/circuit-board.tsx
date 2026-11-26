import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircuitBoard({ size = 24, ...props }: IconProps) {
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
      <path d="M19 12V22C19 22.552 18.552 23 18 23H2C1.448 23 1 22.552 1 22V2C1 1.448 1.448 1 2 1H18C18.552 1 19 1.448 19 2V12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 7H23M18 12H23M18 17H23M5 18H11M2 2H18V22H2V2ZM6 6H14V13H6V6Z"/>
      <path d="M15 18C15 18.552 14.552 19 14 19C13.448 19 13 18.552 13 18C13 17.448 13.448 17 14 17C14.552 17 15 17.448 15 18Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
