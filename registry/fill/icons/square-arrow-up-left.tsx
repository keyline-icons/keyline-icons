import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareArrowUpLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M18 2C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H18ZM9.5 8C8.67157 8 8 8.67157 8 9.5V15C8 15.5523 8.44772 16 9 16C9.55228 16 10 15.5523 10 15V11.4141L14.293 15.707C14.6835 16.0976 15.3165 16.0976 15.707 15.707C16.0976 15.3165 16.0976 14.6835 15.707 14.293L11.4141 10H15C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8H9.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
