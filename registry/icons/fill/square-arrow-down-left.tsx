import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareArrowDownLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M18 2C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H18ZM15.707 8.29297C15.3165 7.90244 14.6835 7.90244 14.293 8.29297L10 12.5859V9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9V14.5C8 15.3284 8.67157 16 9.5 16H15C15.5523 16 16 15.5523 16 15C16 14.4477 15.5523 14 15 14H11.4141L15.707 9.70703C16.0976 9.31651 16.0976 8.68349 15.707 8.29297Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
