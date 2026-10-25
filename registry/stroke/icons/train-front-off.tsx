import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrainFrontOff({ size = 24, ...props }: IconProps) {
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
      <path d="M17.8715 17.8715C17.5957 17.9551 17.3031 18 17 18L7 18C5.3431 18 4 16.6569 4 15L4 5C4 4.6969 4.0449 4.4043 4.1285 4.1285M4 9L9 9M4 5L2 5M7 18L5 22M17 18L19 22M7.6569 2L17 2C18.6569 2 20 3.3431 20 5L20 14.3431M14.6569 9L20 9M20 5L22 5M2 2L22 22" fill="none"/>
      <path d="M10 13.5C10 14.3284 9.3284 15 8.5 15C7.6716 15 7 14.3284 7 13.5C7 12.6716 7.6716 12 8.5 12C9.3284 12 10 12.6716 10 13.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
