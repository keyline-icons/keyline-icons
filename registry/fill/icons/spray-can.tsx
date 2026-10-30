import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SprayCan({ size = 24, ...props }: IconProps) {
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
      <path d="M20 8.1263C21.7661 8.5827 22.9999 10.1759 23 12L23 19C23 21.2092 21.2092 23 19 23L15 23C12.7908 23 11 21.2092 11 19L11 12C11.0001 10.1759 12.2339 8.5827 14 8.1263L14 4.6404C14 3.812 14.6716 3.1404 15.5 3.1404C15.6227 3.1404 15.7449 3.1554 15.8638 3.1852L18.485 3.8405C19.3754 4.063 20 4.863 20 5.7808L20 8.1263Z" fill="currentColor"/>
      <path d="M3 2C3 2.5523 2.5523 3 2 3C1.4477 3 1 2.5523 1 2C1 1.4477 1.4477 1 2 1C2.5523 1 3 1.4477 3 2ZM3 6C3 6.5523 2.5523 7 2 7C1.4477 7 1 6.5523 1 6C1 5.4477 1.4477 5 2 5C2.5523 5 3 5.4477 3 6ZM3 10C3 10.5523 2.5523 11 2 11C1.4477 11 1 10.5523 1 10C1 9.4477 1.4477 9 2 9C2.5523 9 3 9.4477 3 10ZM7 4C7 4.5523 6.5523 5 6 5C5.4477 5 5 4.5523 5 4C5 3.4477 5.4477 3 6 3C6.5523 3 7 3.4477 7 4ZM7 8C7 8.5523 6.5523 9 6 9C5.4477 9 5 8.5523 5 8C5 7.4477 5.4477 7 6 7C6.5523 7 7 7.4477 7 8ZM11 6C11 6.5523 10.5523 7 10 7C9.4477 7 9 6.5523 9 6C9 5.4477 9.4477 5 10 5C10.5523 5 11 5.4477 11 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
