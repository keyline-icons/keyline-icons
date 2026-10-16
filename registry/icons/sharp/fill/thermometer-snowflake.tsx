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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13.5 5C13.5 2.7909 15.2909 1 17.5 1C19.7091 1 21.5 2.7909 21.5 5L21.5 13.7251C22.4634 14.7459 23 16.0964 23 17.5C23 20.5376 20.5376 23 17.5 23C14.4624 23 12 20.5376 12 17.5C12 16.0964 12.5366 14.7459 13.5 13.7251L13.5 5ZM18.5 14.1459L18.5 4L16.5 4L16.5 14.1459C15.0167 14.5881 14 15.9522 14 17.5C14 19.433 15.567 21 17.5 21C19.433 21 21 19.433 21 17.5C21 15.9522 19.9833 14.5881 18.5 14.1459ZM19 17.5C19 18.3284 18.3284 19 17.5 19C16.6716 19 16 18.3284 16 17.5C16 16.6716 16.6716 16 17.5 16C18.3284 16 19 16.6716 19 17.5Z" fill="currentColor" stroke="none"/>
      <path d="M10.0696 10.2545L9.7809 10.7545L6.4148 16.5848M7.2605 19.7408L7.0619 18.9996L6.4148 16.5848L4 17.2319L3.2588 17.4305M11.5 12L10.5 12L3.7678 12M1.7071 14.0607L2 13.7678L3.7678 12L2 10.2322L1.7071 9.9393M10.0696 13.7455L9.7809 13.2455L6.4148 7.4152M3.2588 6.5695L4 6.7681L6.4148 7.4152L7.0619 5.0004L7.2605 4.2592" fill="none"/>
    </svg>
  )
}
