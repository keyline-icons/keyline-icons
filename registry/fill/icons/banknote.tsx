import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Banknote({ size = 24, ...props }: IconProps) {
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
      <path d="M23 17L23 7C23 5.3431 21.6569 4 20 4L4 4C2.3431 4 1 5.3431 1 7L1 17C1 18.6569 2.3431 20 4 20L20 20C21.6569 20 23 18.6569 23 17ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12ZM17 8L18 8C18.5523 8 19 8.4477 19 9C19 9.5523 18.5523 10 18 10L17 10C16.4477 10 16 9.5523 16 9C16 8.4477 16.4477 8 17 8ZM6 14L7 14C7.5523 14 8 14.4477 8 15C8 15.5523 7.5523 16 7 16L6 16C5.4477 16 5 15.5523 5 15C5 14.4477 5.4477 14 6 14ZM13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
