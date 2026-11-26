import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AppWindowFrown({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2H18C20.209 2 22 3.7908 22 6V18C22 20.2092 20.209 22 18 22H6C3.791 22 2 20.2092 2 18V6C2 3.7908 3.791 2 6 2H12Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 17C10 16 11 15.5 12 15.5C13 15.5 14 16 15 17M6 3H18C19.657 3 21 4.3431 21 6V18C21 19.6569 19.657 21 18 21H6C4.343 21 3 19.6569 3 18V6C3 4.3431 4.343 3 6 3Z"/>
      <path d="M8 7C8 7.5523 7.552 8 7 8C6.448 8 6 7.5523 6 7C6 6.4477 6.448 6 7 6C7.552 6 8 6.4477 8 7ZM12 7C12 7.5523 11.552 8 11 8C10.448 8 10 7.5523 10 7C10 6.4477 10.448 6 11 6C11.552 6 12 6.4477 12 7ZM16 7C16 7.5523 15.552 8 15 8C14.448 8 14 7.5523 14 7C14 6.4477 14.448 6 15 6C15.552 6 16 6.4477 16 7ZM10 11C10 11.5523 9.552 12 9 12C8.448 12 8 11.5523 8 11C8 10.4477 8.448 10 9 10C9.552 10 10 10.4477 10 11ZM16 11C16 11.5523 15.552 12 15 12C14.448 12 14 11.5523 14 11C14 10.4477 14.448 10 15 10C15.552 10 16 10.4477 16 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
