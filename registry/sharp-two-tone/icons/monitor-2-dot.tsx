import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor2Dot({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M23 12L23 17C23 17.5523 22.5523 18 22 18L2 18C1.4477 18 1 17.5523 1 17L1 3C1 2.4477 1.4477 2 2 2L13 2L13 12L23 12ZM23 6C23 8.2091 21.2091 10 19 10C16.7909 10 15 8.2091 15 6C15 3.7909 16.7909 2 19 2C21.2091 2 23 3.7909 23 6Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M13 3L2 3L2 17L22 17L22 12M12 17L12 21M7 21L17 21M22 6C22 7.6569 20.6569 9 19 9C17.3431 9 16 7.6569 16 6C16 4.3431 17.3431 3 19 3C20.6569 3 22 4.3431 22 6Z" fill="none"/>
    </svg>
  )
}
