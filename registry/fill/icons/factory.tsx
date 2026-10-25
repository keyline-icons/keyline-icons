import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Factory({ size = 24, ...props }: IconProps) {
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
      <path d="M1 19L1 4C1 2.8954 1.8954 2 3 2L6 2C7.1046 2 8 2.8954 8 4L8 9.2338L10.7283 7.5968C10.9614 7.4569 11.2282 7.3831 11.5 7.3831C12.3284 7.3831 13 8.0547 13 8.8831L13 9.2338L15.7283 7.5968C15.9614 7.4569 16.2282 7.3831 16.5 7.3831C17.3284 7.3831 18 8.0547 18 8.8831L18 9.2338L20.7283 7.5968C20.9614 7.4569 21.2282 7.3831 21.5 7.3831C22.3284 7.3831 23 8.0547 23 8.8831L23 19C23 20.6569 21.6569 22 20 22L4 22C2.3431 22 1 20.6569 1 19ZM11 15C11 14.4477 10.5523 14 10 14C9.4477 14 9 14.4477 9 15L9 17C9 17.5523 9.4477 18 10 18C10.5523 18 11 17.5523 11 17L11 15ZM15 15C15 14.4477 14.5523 14 14 14C13.4477 14 13 14.4477 13 15L13 17C13 17.5523 13.4477 18 14 18C14.5523 18 15 17.5523 15 17L15 15ZM19 15C19 14.4477 18.5523 14 18 14C17.4477 14 17 14.4477 17 15L17 17C17 17.5523 17.4477 18 18 18C18.5523 18 19 17.5523 19 17L19 15ZM3 6L3 8L6 8L6 6L3 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M11 4.5C11 3.6716 11.6716 3 12.5 3L22 3" fill="none"/>
    </svg>
  )
}
