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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10 1L14 1C16.2091 1 18 2.7909 18 5L18 14C18 16.2091 16.2091 18 14 18L10 18C7.7909 18 6 16.2091 6 14L6 5C6 2.7909 7.7909 1 10 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7 5L5 5M17 5L19 5M7 10L5 10M17 10L19 10M12 17L12 22"/>
      <path d="M13.5 7C13.5 7.8284 12.8284 8.5 12 8.5C11.1716 8.5 10.5 7.8284 10.5 7C10.5 6.1716 11.1716 5.5 12 5.5C12.8284 5.5 13.5 6.1716 13.5 7ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
