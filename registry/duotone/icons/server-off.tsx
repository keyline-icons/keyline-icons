import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ServerOff({ size = 24, ...props }: IconProps) {
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
      <path d="M11 11L6 11C4.3431 11 3 9.6569 3 8L3 4C2.9997 3.7048 3.043 3.4111 3.1285 3.1285L11 11ZM20.8715 20.8715C20.4872 22.1357 19.3214 23 18 23L6 23C4.3431 23 3 21.6569 3 20L3 16C3 14.3431 4.3431 13 6 13L13 13L20.8715 20.8715ZM9 18C9 17.4477 8.5523 17 8 17C7.4477 17 7 17.4477 7 18C7 18.5523 7.4477 19 8 19C8.5523 19 9 18.5523 9 18ZM13 18C13 17.4477 12.5523 17 12 17C11.4477 17 11 17.4477 11 18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18ZM7.6569 1L18 1C19.6569 1 21 2.3431 21 4L21 8C21 9.6569 19.6569 11 18 11L15.6569 11L15.6569 10.98C15.3969 10.9803 15.1475 10.877 14.9639 10.6929L14.9497 10.7071L6.9497 2.7071L6.9639 2.6929C6.78 2.5092 6.6767 2.2598 6.6767 1.9998C6.6767 1.4585 7.1156 1.0198 7.6569 1.02L7.6569 1ZM17.2426 13L18 13C19.6569 13 21 14.3431 21 16L21 16.7574L17.2426 13ZM13 6C13 5.4477 12.5523 5 12 5C11.4477 5 11 5.4477 11 6C11 6.5523 11.4477 7 12 7C12.5523 7 13 6.5523 13 6Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 2L22 22" fill="none"/>
    </svg>
  )
}
