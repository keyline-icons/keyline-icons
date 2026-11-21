import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlaskConicalBan({ size = 24, ...props }: IconProps) {
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
      <path d="M2.7394 18L7.4029 8.204C7.4668 8.0697 7.5 7.9228 7.5 7.7741L7.5 3C7.5 2.4477 7.9477 2 8.5 2L11.5 2C12.0523 2 12.5 2.4477 12.5 3L12.5 7.7741C12.5 7.9228 12.5332 8.0697 12.5971 8.204L13.9705 11.0889M6 2H14"/>
      <path d="M6.5012 23L4.0024 23C2.9022 23 1.9836 22.4217 1.4658 21.6018C0.948 20.7819 0.8206 19.704 1.2936 18.7105L1.8365 17.5702C2.0023 17.222 2.3536 17.0001 2.7394 17.0001L6.5894 17.0001L10 17.0001C10.5523 17.0001 11 17.4478 11 18.0001C11 19.2763 11.3412 20.4706 11.9362 21.4993C12.0242 21.6515 12.0705 21.8242 12.0705 22C12.0705 22.5523 11.6228 23 11.0705 23L9 23Z" fill="currentColor" stroke="none"/>
      <path d="M15.1716 15.1716L20.8284 20.8284M18 14C20.2092 14 22 15.7908 22 18C22 20.2092 20.2092 22 18 22C15.7908 22 14 20.2092 14 18C14 15.7908 15.7908 14 18 14Z"/>
    </svg>
  )
}
