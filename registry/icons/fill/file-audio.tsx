import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileAudio({ size = 24, ...props }: IconProps) {
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
      <path d="M14 1C14.2652 1 14.5195 1.1054 14.707 1.293L20.707 7.293C20.8946 7.4805 21 7.7348 21 8L21 18C21 20.7614 18.7614 23 16 23L8 23C5.2386 23 3 20.7614 3 18L3 6C3 3.2386 5.2386 1 8 1L14 1ZM14 5C14 6.6568 15.3431 8 17 8L18.5858 8L14 3.4142L14 5ZM7 14L7 16C7 16.5523 7.4477 17 8 17C8.5523 17 9 16.5523 9 16L9 14C9 13.4477 8.5523 13 8 13C7.4477 13 7 13.4477 7 14ZM11 12L11 18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18L13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12ZM15 14L15 16C15 16.5523 15.4477 17 16 17C16.5523 17 17 16.5523 17 16L17 14C17 13.4477 16.5523 13 16 13C15.4477 13 15 13.4477 15 14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
