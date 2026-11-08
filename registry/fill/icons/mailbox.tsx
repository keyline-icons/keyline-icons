import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mailbox({ size = 24, ...props }: IconProps) {
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
      <path d="M8 8C8.5523 8 9 8.45 9 9C9 9.55 8.5523 10 8 10H6C5.4477 10 5 9.55 5 9C5 8.45 5.4477 8 6 8H8Z" fill="currentColor"/>
      <path d="M17 3C20.3137 3 23 5.69 23 9V17C23 18.1 22.105 19 21 19H13.2002C13.0897 19 13 19.09 13 19.2V20C13 20.55 12.5523 21 12 21C11.4477 21 11 20.55 11 20V19.2C11 19.09 10.9103 19 10.7998 19H3C1.8954 19 1 18.1 1 17V9C1 5.69 3.6863 3 7 3H17ZM7 5C4.7909 5 3 6.79 3 9V16.8C3 16.91 3.0897 17 3.2002 17H10.7998C10.9103 17 11 16.91 11 16.8V9C11 6.79 9.2091 5 7 5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
