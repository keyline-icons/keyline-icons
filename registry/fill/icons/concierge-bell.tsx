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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4.148 10.599C5.7404 7.7579 8.7433 5.9986 12.0002 5.9986C15.2571 5.9986 18.26 7.7579 19.8524 10.599C19.9078 10.7255 19.9364 10.862 19.9364 11.0001C19.9364 11.5524 19.4886 12.0001 18.9363 12L5.064 12C4.5117 12.0001 4.064 11.5525 4.064 11.0002C4.064 10.8621 4.0926 10.7255 4.148 10.599ZM4 14L20 14C21.6569 14 23 15.3431 23 17L23 19C23 20.6569 21.6569 22 20 22L4 22C2.3431 22 1 20.6569 1 19L1 17C1 15.3431 2.3431 14 4 14Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 7L12 3M9 3L15 3" fill="none"/>
    </svg>
  )
}
