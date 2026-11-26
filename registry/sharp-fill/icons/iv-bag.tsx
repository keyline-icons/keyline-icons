import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function IvBag({ size = 24, ...props }: IconProps) {
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
      <path d="M12 12L19 12C19.5523 12 20 12.4477 20 13L20 16C20 16.5523 19.5523 17 19 17L12 17L5 17C4.4477 17 4 16.5523 4 16L4 13C4 12.4477 4.4477 12 5 12ZM8.5 10L5 10C4.4477 10 4 9.5523 4 9L4 2C4 1.4477 4.4477 1 5 1L12 1L19 1C19.5523 1 20 1.4477 20 2L20 9C20 9.5523 19.5523 10 19 10L12 10ZM13.5 6.5C13.5 5.6716 12.8284 5 12 5C11.1716 5 10.5 5.6716 10.5 6.5C10.5 7.3284 11.1716 8 12 8C12.8284 8 13.5 7.3284 13.5 6.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 16L12 22L6 22"/>
    </svg>
  )
}
