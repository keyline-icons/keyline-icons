import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Escalator({ size = 24, ...props }: IconProps) {
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
      <path d="M4 8V11M2 18C2 16.3431 3.3431 15 5 15H5.9289C6.4593 15 6.968 14.7893 7.3431 14.4142L13.5858 8.1716C14.3359 7.4215 15.3533 7 16.4142 7H19C20.6569 7 22 8.3431 22 10C22 11.6569 20.6569 13 19 13H18.0711C17.5407 13 17.032 13.2107 16.6569 13.5858L10.4142 19.8284C9.6641 20.5785 8.6467 21 7.5858 21H5C3.3431 21 2 19.6569 2 18Z"/>
      <path d="M5.5 3.5C5.5 4.3284 4.8284 5 4 5C3.1716 5 2.5 4.3284 2.5 3.5C2.5 2.6716 3.1716 2 4 2C4.8284 2 5.5 2.6716 5.5 3.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
