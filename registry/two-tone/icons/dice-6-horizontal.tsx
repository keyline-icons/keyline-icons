import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Dice6Horizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34315 4.34315 3 6 3Z"/>
      <path d="M7.25 8C8.0784 8 8.75 8.6716 8.75 9.5C8.75 10.3284 8.0784 11 7.25 11C6.4216 11 5.75 10.3284 5.75 9.5C5.75 8.6716 6.4216 8 7.25 8ZM12 8C12.8284 8 13.5 8.6716 13.5 9.5C13.5 10.3284 12.8284 11 12 11C11.1716 11 10.5 10.3284 10.5 9.5C10.5 8.6716 11.1716 8 12 8ZM16.75 8C17.5784 8 18.25 8.6716 18.25 9.5C18.25 10.3284 17.5784 11 16.75 11C15.9216 11 15.25 10.3284 15.25 9.5C15.25 8.6716 15.9216 8 16.75 8ZM7.25 13C8.0784 13 8.75 13.6716 8.75 14.5C8.75 15.3284 8.0784 16 7.25 16C6.4216 16 5.75 15.3284 5.75 14.5C5.75 13.6716 6.4216 13 7.25 13ZM12 13C12.8284 13 13.5 13.6716 13.5 14.5C13.5 15.3284 12.8284 16 12 16C11.1716 16 10.5 15.3284 10.5 14.5C10.5 13.6716 11.1716 13 12 13ZM16.75 13C17.5784 13 18.25 13.6716 18.25 14.5C18.25 15.3284 17.5784 16 16.75 16C15.9216 16 15.25 15.3284 15.25 14.5C15.25 13.6716 15.9216 13 16.75 13Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
