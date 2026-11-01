import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Castle({ size = 24, ...props }: IconProps) {
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
      <path d="M23 10L23 19C23 20.6569 21.6569 22 20 22L4 22C2.3431 22 1 20.6569 1 19L1 8C1 7.4477 1.4477 7 2 7C2.5523 7 3 7.4477 3 8L3 9L5 9L5 3C5 2.4477 5.4477 2 6 2C6.5523 2 7 2.4477 7 3L7 4L11 4L11 3C11 2.4477 11.4477 2 12 2C12.5523 2 13 2.4477 13 3L13 4L17 4L17 3C17 2.4477 17.4477 2 18 2C18.5523 2 19 2.4477 19 3L19 9L21 9L21 8C21 7.4477 21.4477 7 22 7C22.5523 7 23 7.4477 23 8L23 10Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M15 20L9 20L9 16.5C9 15.3954 10.8954 14 12 14C13.1046 14 15 15.3954 15 16.5L15 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
