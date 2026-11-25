import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BeforeAndAfter({ size = 24, ...props }: IconProps) {
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
      <path d="M13 4L19 4C21.2092 4 23 5.7908 23 8L23 16C23 18.2092 21.2092 20 19 20L13 20L13 22.0001C13 22.5524 12.5523 23.0001 12 23.0001C11.4477 23.0001 11 22.5524 11 22.0001L11 19L11 12L11 4.9922L11 2.0001C11 1.4478 11.4477 1.0001 12 1.0001C12.5523 1.0001 13 1.4478 13 2.0001Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8 19H5C3.3431 19 2 17.6569 2 16V8C2 6.3431 3.3431 5 5 5H8"/>
    </svg>
  )
}
