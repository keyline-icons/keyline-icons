import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TypeOutline({ size = 24, ...props }: IconProps) {
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
      <path d="M4 2L20 2C21.6569 2 23 3.3431 23 5L23 9C23 10.6569 21.6569 12 20 12C18.3431 12 17 10.6569 17 9C17 8.4477 16.5523 8 16 8C15.4477 8 15 8.4477 15 9L15 15C15 15.5523 15.4477 16 16 16C17.6569 16 19 17.3431 19 19C19 20.6569 17.6569 22 16 22L8 22C6.3431 22 5 20.6569 5 19C5 17.3431 6.3431 16 8 16C8.5523 16 9 15.5523 9 15L9 9C9 8.4477 8.5523 8 8 8C7.4477 8 7 8.4477 7 9C7 10.6569 5.6569 12 4 12C2.3431 12 1 10.6569 1 9L1 5C1 3.3431 2.3431 2 4 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4 3L20 3C21.1046 3 22 3.8954 22 5L22 9C22 10.1046 21.1046 11 20 11C18.8954 11 18 10.1046 18 9C18 7.8954 17.1046 7 16 7C14.8954 7 14 7.8954 14 9L14 15C14 16.1046 14.8954 17 16 17C17.1046 17 18 17.8954 18 19C18 20.1046 17.1046 21 16 21L8 21C6.8954 21 6 20.1046 6 19C6 17.8954 6.8954 17 8 17C9.1046 17 10 16.1046 10 15L10 9C10 7.8954 9.1046 7 8 7C6.8954 7 6 7.8954 6 9C6 10.1046 5.1046 11 4 11C2.8954 11 2 10.1046 2 9L2 5C2 3.8954 2.8954 3 4 3Z"/>
    </svg>
  )
}
