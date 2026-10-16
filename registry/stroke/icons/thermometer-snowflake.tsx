import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ThermometerSnowflake({ size = 24, ...props }: IconProps) {
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
      <path d="M14.5 5C14.5 3.3431 15.8431 2 17.5 2C19.1569 2 20.5 3.3431 20.5 5L20.5 13.7251C20.5 13.9803 20.5976 14.2258 20.7727 14.4114C21.5609 15.2466 22 16.3516 22 17.5C22 19.9853 19.9853 22 17.5 22C15.0147 22 13 19.9853 13 17.5C13 16.3516 13.4391 15.2466 14.2273 14.4114C14.4024 14.2258 14.5 13.9803 14.5 13.7251L14.5 5ZM9.7809 10.7545L6.4148 16.5848M7.0619 18.9996L6.4148 16.5848L4 17.2319M10.5 12L3.7678 12M2 13.7678L3.7678 12L2 10.2322M9.7809 13.2455L6.4148 7.4152M4 6.7681L6.4148 7.4152L7.0619 5.0004" fill="none"/>
      <path d="M19 17.5C19 18.3284 18.3284 19 17.5 19C16.6716 19 16 18.3284 16 17.5C16 16.6716 16.6716 16 17.5 16C18.3284 16 19 16.6716 19 17.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
