import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Banknote2({ size = 24, ...props }: IconProps) {
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
      <path d="M6 5L18 5C18 6.33333 18.8 9 22 9L22 15C18.8 15 18 17.6667 18 19L6 19C6 17.6667 5.2 15 2 15L2 9C5.2 9 6 6.33333 6 5ZM15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M22 17L22 7C22 5.8954 21.1046 5 20 5L4 5C2.8954 5 2 5.8954 2 7L2 17C2 18.1046 2.8954 19 4 19L20 19C21.1046 19 22 18.1046 22 17ZM18 5C18 6.33333 18.8 9 22 9M18 19C18 17.6667 18.8 15 22 15M6 19C6 17.6667 5.2 15 2 15M6 5C6 6.33333 5.2 9 2 9"/>
    </svg>
  )
}
