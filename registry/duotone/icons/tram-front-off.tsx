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
      <path d="M14.618 5L17 5C19.2092 5 21 6.7908 21 9L21 16.7574L15.2426 11L19 11L19 9C19 7.8954 18.1046 7 17 7L14.0217 7C14.0147 7.0001 14.0077 7.0002 14.0008 7.0002C13.9938 7.0002 13.9868 7.0001 13.9799 7L11.2426 7L9.8595 5.6169C9.8497 5.6075 9.84 5.5978 9.8306 5.588L9.2426 5L9.5577 5C9.5539 4.965 9.5521 4.9299 9.5521 4.8947C9.5521 4.7397 9.5883 4.5868 9.6579 4.4482L10.382 3L8 3C7.4477 3 7 2.5523 7 2C7 1.4477 7.4477 1 8 1L16 1C16.5523 1 17 1.4477 17 2C17 2.5523 16.5523 3 16 3L13.618 3L14.618 5ZM15.382 21L8.618 21L7.8944 22.4472C7.725 22.786 7.3788 23 7 23C6.4477 23 6 22.5523 6 22C6 21.8448 6.0361 21.6916 6.1056 21.5528L6.404 20.9559C4.4471 20.6607 3.0001 18.9791 3 17L3 9C2.9997 7.4276 3.9205 6.0008 5.3534 5.3534L7 7C5.8954 7 5 7.8954 5 9L5 11L8.1716 10.9999L10.9999 10.9999L19.8284 19.8284C19.2245 20.434 18.4418 20.8293 17.596 20.956L17.8944 21.5528C17.9639 21.6916 18 21.8448 18 22C18 22.5523 17.5523 23 17 23C16.6212 23 16.275 22.786 16.1056 22.4472L15.382 21ZM9 16C9 15.4477 8.5523 15 8 15C7.4477 15 7 15.4477 7 16C7 16.5523 7.4477 17 8 17C8.5523 17 9 16.5523 9 16Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 2L22 22" fill="none"/>
    </svg>
  )
}
