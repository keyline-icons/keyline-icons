import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Blinds({ size = 24, ...props }: IconProps) {
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
      <path d="M21 3.0001L21 11C21 13.2092 19.2092 15 17 15L7 15C4.7908 15 3 13.2092 3 11L3 3.0001L2 3.0001C1.4477 3.0001 1 2.5524 1 2.0001C1 1.4478 1.4477 1.0001 2 1.0001L3.988 1.0001C3.992 1 3.996 1 4 1L20 1C20.004 1 20.008 1 20.012 1.0001L22 1.0001C22.5523 1.0001 23 1.4478 23 2.0001C23 2.5524 22.5523 3.0001 22 3.0001L21 3.0001ZM8 5C7.4477 5 7 5.4477 7 6C7 6.5523 7.4477 7 8 7L16 7C16.5523 7 17 6.5523 17 6C17 5.4477 16.5523 5 16 5L8 5ZM8 9C7.4477 9 7 9.4477 7 10C7 10.5523 7.4477 11 8 11L16 11C16.5523 11 17 10.5523 17 10C17 9.4477 16.5523 9 16 9L8 9ZM15 20C15 21.6569 13.6569 23 12 23C10.3431 23 9 21.6569 9 20C9 18.3431 10.3431 17 12 17C13.6569 17 15 18.3431 15 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 14L12 18" fill="none"/>
    </svg>
  )
}
