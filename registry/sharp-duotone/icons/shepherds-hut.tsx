import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShepherdsHut({ size = 24, ...props }: IconProps) {
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
      <path d="M23 18C23 18.55 22.552 19 22 19H19V23H17V21H14V23H12V19H9.826C9.937 19.31 10 19.65 10 20C10 21.66 8.657 23 7 23C5.343 23 4 21.66 4 20C4 19.65 4.063 19.31 4.174 19H2C1.448 19 1 18.55 1 18V4C1 3.45 1.448 3 2 3H6V1H8V3H18C20.761 3 23 5.24 23 8V18Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M7 17C8.657 17 10 18.34 10 20C10 21.66 8.657 23 7 23C5.343 23 4 21.66 4 20C4 18.34 5.343 17 7 17Z" fill="currentColor"/>
      <path d="M14 7H17V3H18C18.342 3 18.677 3.03 19 3.1V23H17V21H14V23H12V3H14V7ZM14 19H17V17H14V19ZM14 15H17V13H14V15ZM14 11H17V9H14V11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M6 12H3V8H6V12Z" fill="currentColor"/>
    </svg>
  )
}
