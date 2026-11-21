import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageMore({ size = 24, ...props }: IconProps) {
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
      <path d="M4.3043 4.5623C6.3033 2.9631 9.0274 2 12 2C14.9726 2 17.6967 2.9631 19.6957 4.5623C21.6966 6.1629 23 8.4326 23 11C23 13.5674 21.6966 15.8371 19.6957 17.4377C17.6967 19.0369 14.9726 20 12 20C11.2349 20 10.4718 19.935 9.723 19.8059L5.4389 21.8985C5.3022 21.9653 5.1521 22 5 22C4.4835 22 4.052 21.6067 4.0043 21.0924L3.6082 16.8264C1.9516 15.2281 1 13.1721 1 11C1 8.4326 2.3034 6.1629 4.3043 4.5623ZM8.5 11C8.5 10.1716 7.8285 9.5 7 9.5C6.1716 9.5 5.5 10.1716 5.5 11C5.5 11.8285 6.1716 12.5 7 12.5C7.8285 12.5 8.5 11.8285 8.5 11ZM13.5 11C13.5 10.1716 12.8285 9.5 12 9.5C11.1716 9.5 10.5 10.1716 10.5 11C10.5 11.8285 11.1716 12.5 12 12.5C12.8285 12.5 13.5 11.8285 13.5 11ZM18.5 11C18.5 10.1716 17.8285 9.5 17 9.5C16.1716 9.5 15.5 10.1716 15.5 11C15.5 11.8285 16.1716 12.5 17 12.5C17.8285 12.5 18.5 11.8285 18.5 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
