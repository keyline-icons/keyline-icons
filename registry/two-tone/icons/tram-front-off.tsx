import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TramFrontOff({ size = 24, ...props }: IconProps) {
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
      <path d="M11.618 5L12.382 5L12 4.2361L11.618 5ZM14.618 5L17 5C19.2092 5 21 6.7908 21 9L21 16.7574L9.8595 5.6169C9.8497 5.6075 9.84 5.5978 9.8306 5.588L9.2426 5L9.5577 5C9.5539 4.965 9.5521 4.9299 9.5521 4.8947C9.5521 4.7397 9.5883 4.5868 9.6579 4.4482L10.382 3L8 3C7.4477 3 7 2.5523 7 2C7 1.4477 7.4477 1 8 1L16 1C16.5523 1 17 1.4477 17 2C17 2.5523 16.5523 3 16 3L13.618 3L14.618 5ZM18.0361 20.8645C17.6981 20.9547 17.3498 21.0003 17 21L7 21C4.7908 21 3 19.2092 3 17L3 9C2.9997 7.4276 3.9205 6.0008 5.3535 5.3535L19.8285 19.8285C19.3325 20.3254 18.7142 20.6827 18.0361 20.8645Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M19.1213 19.1213C18.5785 19.6642 17.8285 20 17 20L7 20C5.3431 20 4 18.6569 4 17L4 9C4 7.6462 4.8967 6.5019 6.1285 6.1285M4 12L12 12M8 20L7 22M16 20L17 22M2 2L22 22" fill="none"/>
      <path d="M9 16C9 16.5523 8.5523 17 8 17C7.4477 17 7 16.5523 7 16C7 15.4477 7.4477 15 8 15C8.5523 15 9 15.4477 9 16Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
