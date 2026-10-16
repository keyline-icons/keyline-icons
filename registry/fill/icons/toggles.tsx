import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Toggles({ size = 24, ...props }: IconProps) {
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
      <path d="M8 1L16 1C18.7614 1 21 3.2386 21 6C21 8.7614 18.7614 11 16 11L8 11C5.2386 11 3 8.7614 3 6C3 3.2386 5.2386 1 8 1ZM8 13L16 13C18.7614 13 21 15.2386 21 18C21 20.7614 18.7614 23 16 23L8 23C5.2386 23 3 20.7614 3 18C3 15.2386 5.2386 13 8 13ZM11 6C11 4.3431 9.6569 3 8 3C6.3431 3 5 4.3431 5 6C5 7.6569 6.3431 9 8 9C9.6569 9 11 7.6569 11 6ZM19 18C19 16.3431 17.6569 15 16 15C14.3431 15 13 16.3431 13 18C13 19.6569 14.3431 21 16 21C17.6569 21 19 19.6569 19 18Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
