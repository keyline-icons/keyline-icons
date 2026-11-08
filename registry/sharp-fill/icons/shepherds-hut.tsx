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
      <path d="M8 3H18C20.761 3 23 5.24 23 8V18C23 18.55 22.552 19 22 19H19V23H17V21H14V23H12V19H9.826C9.937 19.31 10 19.65 10 20C10 21.66 8.657 23 7 23C5.343 23 4 21.66 4 20C4 19.65 4.063 19.31 4.174 19H2C1.448 19 1 18.55 1 18V4C1 3.45 1.448 3 2 3H6V1H8V3ZM14 17V19H17V17H14ZM14 13V15H17V13H14ZM3 8V12H6V8H3ZM14 9V11H17V9H14ZM14 5V7H17V5H14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
