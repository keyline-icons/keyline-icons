import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareX({ size = 24, ...props }: IconProps) {
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
      <path d="M18 2C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H18ZM15.707 8.29297C15.3165 7.90245 14.6835 7.90246 14.293 8.29297L12 10.5859L9.70703 8.29297C9.31651 7.90246 8.68349 7.90245 8.29297 8.29297C7.90246 8.68349 7.90246 9.31651 8.29297 9.70703L10.5859 12L8.29297 14.293C7.90245 14.6835 7.90245 15.3165 8.29297 15.707C8.68349 16.0975 9.31651 16.0975 9.70703 15.707L12 13.4141L14.293 15.707C14.6835 16.0975 15.3165 16.0975 15.707 15.707C16.0976 15.3165 16.0976 14.6835 15.707 14.293L13.4141 12L15.707 9.70703C16.0975 9.31651 16.0975 8.68349 15.707 8.29297Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
