import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BanknoteMinus({ size = 24, ...props }: IconProps) {
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
      <path d="M4 1L20 1C21.6569 1 23 2.3431 23 4L23 12C23 12.5523 22.5523 13 22 13L16 13C14.3431 13 13 14.3431 13 16C13 16.5523 12.5523 17 12 17L4 17C2.3431 17 1 15.6569 1 14L1 4C1 2.3431 2.3431 1 4 1ZM15 9C15 7.3431 13.6569 6 12 6C10.3431 6 9 7.3431 9 9C9 10.6569 10.3431 12 12 12C13.6569 12 15 10.6569 15 9ZM17 5C16.4477 5 16 5.4477 16 6C16 6.5523 16.4477 7 17 7L18 7C18.5523 7 19 6.5523 19 6C19 5.4477 18.5523 5 18 5L17 5ZM6 11C5.4477 11 5 11.4477 5 12C5 12.5523 5.4477 13 6 13L7 13C7.5523 13 8 12.5523 8 12C8 11.4477 7.5523 11 7 11L6 11ZM13 9C13 9.5523 12.5523 10 12 10C11.4477 10 11 9.5523 11 9C11 8.4477 11.4477 8 12 8C12.5523 8 13 8.4477 13 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M22 19H16"/>
    </svg>
  )
}
