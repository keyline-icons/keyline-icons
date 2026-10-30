import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Castle({ size = 24, ...props }: IconProps) {
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
      <path d="M8 22L4 22C2.3431 22 1 20.6569 1 19L1 8C1 7.4477 1.4477 7 2 7C2.5523 7 3 7.4477 3 8L3 9L5 9L5 3C5 2.4477 5.4477 2 6 2C6.5523 2 7 2.4477 7 3L7 4L11 4L11 3C11 2.4477 11.4477 2 12 2C12.5523 2 13 2.4477 13 3L13 4L17 4L17 3C17 2.4477 17.4477 2 18 2C18.5523 2 19 2.4477 19 3L19 9L21 9L21 8C21 7.4477 21.4477 7 22 7C22.5523 7 23 7.4477 23 8L23 19C23 20.6569 21.6569 22 20 22L16 22L16 16.5001C16 16.0544 15.8495 15.6516 15.665 15.3246C15.4737 14.9951 15.2374 14.6939 14.963 14.4295C14.6919 14.1649 14.395 13.928 14.0767 13.7225C13.7656 13.5191 13.4335 13.3497 13.0862 13.2173C12.7532 13.0929 12.3781 13.0001 12 13.0001C11.622 13.0001 11.2469 13.0929 10.9139 13.2173C10.5666 13.3497 10.2345 13.5191 9.9234 13.7225C9.6051 13.928 9.3082 14.1649 9.0371 14.4295C8.7627 14.6939 8.5264 14.9951 8.335 15.3246C8.1505 15.6516 8 16.0544 8 16.5001L8 22Z" fill="currentColor"/>
    </svg>
  )
}
