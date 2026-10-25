import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TruckOff({ size = 24, ...props }: IconProps) {
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
      <path d="M14 18L14 14M4.1285 4.1285C2.8967 4.5019 2 5.6462 2 7L2 17C2 17.5523 2.4477 18 3 18L4 18M10 18L14 18M9 18C9 19.1046 8.1046 20 7 20C5.8954 20 5 19.1046 5 18C5 16.8954 5.8954 16 7 16C8.1046 16 9 16.8954 9 18ZM18.8233 18.8233C18.5094 19.5172 17.8111 20 17 20C15.8954 20 15 19.1046 15 18C15 17.1889 15.4828 16.4906 16.1767 16.1767M14 8.3431L14 7C14 5.3431 12.6569 4 11 4L9.6569 4M22 16.3431L22 13C22 12.4696 21.7893 11.9609 21.4142 11.5858L18.4142 8.5858C18.0391 8.2107 17.5304 8 17 8L14 8M2 2L22 22" fill="none"/>
    </svg>
  )
}
