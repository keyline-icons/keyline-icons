import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bot({ size = 24, ...props }: IconProps) {
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
      <path d="M7 7L17 7C19.2091 7 21 8.7909 21 11L21 18C21 20.2091 19.2091 22 17 22L7 22C4.7909 22 3 20.2091 3 18L3 11C3 8.7909 4.7909 7 7 7ZM10 12C10 11.4477 9.5523 11 9 11C8.4477 11 8 11.4477 8 12L8 13C8 13.5523 8.4477 14 9 14C9.5523 14 10 13.5523 10 13L10 12ZM16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12L14 13C14 13.5523 14.4477 14 15 14C15.5523 14 16 13.5523 16 13L16 12ZM9 16C8.4477 16 8 16.4477 8 17C8 17.5523 8.4477 18 9 18L15 18C15.5523 18 16 17.5523 16 17C16 16.4477 15.5523 16 15 16L9 16Z" fill="currentColor" stroke="none"/>
      <path d="M12 8L12 3.5M2 14.5L4 14.5M22 14.5L20 14.5" fill="none"/>
      <path d="M13.5 3.5C13.5 4.3284 12.8284 5 12 5C11.1716 5 10.5 4.3284 10.5 3.5C10.5 2.6716 11.1716 2 12 2C12.8284 2 13.5 2.6716 13.5 3.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
