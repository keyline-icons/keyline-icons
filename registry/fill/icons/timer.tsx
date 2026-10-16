import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Timer({ size = 24, ...props }: IconProps) {
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
      <path d="M12 5C16.9706 5 21 9.0294 21 14C21 18.9706 16.9706 23 12 23C7.0294 23 3 18.9706 3 14C3 9.0294 7.0294 5 12 5ZM11 10L11 14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14L13 10C13 9.4477 12.5523 9 12 9C11.4477 9 11 9.4477 11 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M9 2L15 2M12 2L12 6M17.6569 8.3431L19 7"/>
    </svg>
  )
}
