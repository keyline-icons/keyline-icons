import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrafficLight({ size = 24, ...props }: IconProps) {
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
      <path d="M7 1L17 1C17.5523 1 18 1.4477 18 2L18 17C18 17.5523 17.5523 18 17 18L7 18C6.4477 18 6 17.5523 6 17L6 2C6 1.4477 6.4477 1 7 1ZM13.5 7C13.5 7.8284 12.8284 8.5 12 8.5C11.1716 8.5 10.5 7.8284 10.5 7C10.5 6.1716 11.1716 5.5 12 5.5C12.8284 5.5 13.5 6.1716 13.5 7ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8 5L4 5M16 5L20 5M8 10L4 10M16 10L20 10M12 16L12 23"/>
    </svg>
  )
}
