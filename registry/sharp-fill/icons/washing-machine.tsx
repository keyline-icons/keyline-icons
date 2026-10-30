import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WashingMachine({ size = 24, ...props }: IconProps) {
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
      <path d="M4 1L20 1C20.5523 1 21 1.4477 21 2L21 22C21 22.5523 20.5523 23 20 23L4 23C3.4477 23 3 22.5523 3 22L3 2C3 1.4477 3.4477 1 4 1ZM17 14C17 11.2386 14.7614 9 12 9C9.2386 9 7 11.2386 7 14C7 16.7614 9.2386 19 12 19C14.7614 19 17 16.7614 17 14ZM11 5L11 7L17 7L17 5L11 5ZM9 6C9 5.4477 8.5523 5 8 5C7.4477 5 7 5.4477 7 6C7 6.5523 7.4477 7 8 7C8.5523 7 9 6.5523 9 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
