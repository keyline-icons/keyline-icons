import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function QuoteEnd({ size = 24, ...props }: IconProps) {
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
      <path d="M10 9.5C10 12.9659 8.2018 16.1837 5.25 18C5.9991 17.3614 6.4306 16.4265 6.4306 15.4421C6.4306 14.2412 5.79 13.1315 4.75 12.5311C3.6671 11.9059 3 10.7504 3 9.5C3 7.567 4.567 6 6.5 6C8.433 6 10 7.567 10 9.5ZM21 9.5C21 12.9659 19.2018 16.1837 16.25 18C16.9991 17.3614 17.4306 16.4265 17.4306 15.4421C17.4306 14.2412 16.79 13.1315 15.75 12.5311C14.6671 11.9059 14 10.7504 14 9.5C14 7.567 15.567 6 17.5 6C19.433 6 21 7.567 21 9.5Z" fill="none"/>
    </svg>
  )
}
