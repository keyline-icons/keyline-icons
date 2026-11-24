import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Tumbler({ size = 24, ...props }: IconProps) {
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
      <path d="M3.5208 7.6C4.8988 7.202 6.326 7 7.7604 7C9.1948 7 10.622 7.202 12 7.6C13.378 7.998 14.8052 8.2 16.2396 8.2C17.674 8.2 19.1012 7.998 20.4792 7.6M4 3H20C20.5524 3 21 3.4477 21 4C21 4.0489 20.9964 4.0977 20.9893 4.1461L18.8784 18.4383C18.6611 19.9099 17.3982 21 15.9106 21H8.0894C6.6018 21 5.3389 19.9099 5.1216 18.4383L3.0107 4.1461C3.0036 4.0977 3 4.0489 3 4C3 3.4477 3.4476 3 4 3ZM10.606 12.8516L12.5623 12.4358C13.1026 12.321 13.6336 12.6658 13.7484 13.206L14.1642 15.1623C14.279 15.7026 13.9342 16.2336 13.394 16.3484L11.4377 16.7642C10.8974 16.879 10.3664 16.5342 10.2516 15.994L9.8358 14.0377C9.721 13.4974 10.0658 12.9664 10.606 12.8516Z"/>
    </svg>
  )
}
