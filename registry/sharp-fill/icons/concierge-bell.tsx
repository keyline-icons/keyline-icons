import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ConciergeBell({ size = 24, ...props }: IconProps) {
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
      <path d="M4.1482 10.5987C5.7406 7.7578 8.7434 5.9986 12.0002 5.9986C15.2571 5.9986 18.26 7.7579 19.8524 10.599C19.9078 10.7255 19.9364 10.862 19.9364 11.0001C19.9364 11.5524 19.4886 12.0001 18.9363 12L5.0641 12C4.5118 12.0001 4.064 11.5525 4.064 11.0002C4.064 10.862 4.0927 10.7253 4.1482 10.5987ZM2 14L22 14C22.5523 14 23 14.4477 23 15L23 21C23 21.5523 22.5523 22 22 22L2 22C1.4477 22 1 21.5523 1 21L1 15C1 14.4477 1.4477 14 2 14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 7L12 3M8 3L16 3" fill="none"/>
    </svg>
  )
}
