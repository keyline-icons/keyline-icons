import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Clarinet({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12L23 16C23 17.1046 22.1046 18 21 18C20.4695 18 19.9608 17.7892 19.5858 17.4142C19.2526 17.081 19.0742 16.8761 18.7425 16.5529C18.4563 16.2741 18.1576 16.0138 17.8187 15.7876C17.1614 15.3491 16.2954 15 15 15L8 15L5.9998 15C5.8445 15 5.6914 14.9638 5.5525 14.8944L1.5531 12.8944C1.2144 12.725 1.0004 12.3788 1.0004 12C1.0004 11.6212 1.2144 11.275 1.5531 11.1056L5.5525 9.1056C5.6914 9.0362 5.8445 9 5.9998 9L8 9L15 9C16.2954 9 17.1614 8.6509 17.8187 8.2124C18.1576 7.9862 18.4563 7.7259 18.7425 7.4471C19.0742 7.1239 19.2526 6.919 19.5858 6.5858C19.9608 6.2108 20.4695 6 21 6C22.1046 6 23 6.8954 23 8Z" fill="currentColor" stroke="none"/>
      <path d="M9 10L9 7.5L9 6.5M13 10L13 7.5L13 6.5"/>
    </svg>
  )
}
