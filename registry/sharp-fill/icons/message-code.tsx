import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageCode({ size = 24, ...props }: IconProps) {
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
      <path d="M4.3043 4.5623C6.3033 2.9631 9.0274 2 12 2C14.9726 2 17.6967 2.9631 19.6957 4.5623C21.6966 6.1629 23 8.4326 23 11C23 13.5674 21.6966 15.8371 19.6957 17.4377C17.6967 19.0369 14.9726 20 12 20C11.2349 20 10.4718 19.935 9.723 19.8059L5.4389 21.8985C5.3022 21.9653 5.1521 22 5 22C4.4835 22 4.052 21.6067 4.0043 21.0924L3.6082 16.8264C1.9516 15.2281 1 13.1721 1 11C1 8.4326 2.3034 6.1629 4.3043 4.5623ZM11 8.9142L9.5858 7.5L9.2929 7.7929L6.7929 10.2929C6.4024 10.6834 6.4024 11.3166 6.7929 11.7071L9.2929 14.2071L9.5858 14.5L11 13.0858L10.7071 12.7929L8.9142 11L10.7071 9.2071ZM14.4142 7.5L13 8.9142L13.2929 9.2071L15.0858 11L13.2929 12.7929L13 13.0858L14.4142 14.5L14.7071 14.2071L17.2071 11.7071C17.5976 11.3166 17.5976 10.6834 17.2071 10.2929L14.7071 7.7929Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
