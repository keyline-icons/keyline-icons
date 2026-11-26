import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotFrown({ size = 24, ...props }: IconProps) {
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
      <path d="M12 7H17C19.2092 7 21 8.791 21 11V18C21 20.209 19.2092 22 17 22H7C4.7908 22 3 20.209 3 18V11C3 8.791 4.7908 7 7 7H12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 8V3.5M2 14.5H4M22 14.5H20M9 17C10 16 11 15.5 12 15.5C13 15.5 14 16 15 17M7 8H17C18.6569 8 20 9.343 20 11V18C20 19.657 18.6569 21 17 21H7C5.3431 21 4 19.657 4 18V11C4 9.343 5.3431 8 7 8Z"/>
      <path d="M13.5 3.5C13.5 4.328 12.8284 5 12 5C11.1716 5 10.5 4.328 10.5 3.5C10.5 2.672 11.1716 2 12 2C12.8284 2 13.5 2.672 13.5 3.5ZM10 12C10 12.552 9.5523 13 9 13C8.4477 13 8 12.552 8 12C8 11.448 8.4477 11 9 11C9.5523 11 10 11.448 10 12ZM16 12C16 12.552 15.5523 13 15 13C14.4477 13 14 12.552 14 12C14 11.448 14.4477 11 15 11C15.5523 11 16 11.448 16 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
