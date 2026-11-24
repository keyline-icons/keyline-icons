import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FireTruck({ size = 24, ...props }: IconProps) {
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
      <path d="M15 18L9 18C9 16.8954 8.1046 16 7 16C5.8954 16 5 16.8954 5 18L3 18C2.4477 18 2 17.5523 2 17L2 11C2 10.4477 2.4477 10 3 10L15.5 10L15.5 11C15.5 11.8284 16.1716 12.5 17 12.5L19.5 12.5L22 12.5L22 17.0001C22 17.5524 21.5523 18.0001 21 18.0001L19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18Z" fill="currentColor" stroke="none"/>
      <path d="M4 18L3 18C2.4477 18 2 17.5523 2 17L2 11C2 10.4477 2.4477 10 3 10L16 10M2 6L11 6C11.5523 6 12 6.4477 12 7L12 10M4 6L4 10M8 6L8 10M10 18L14 18M22 12L17 12C16.4477 12 16 11.5523 16 11L16 7C16 6.4477 16.4477 6 17 6L17.8676 6C18.5701 6 19.2212 6.3686 19.5826 6.971L21.715 10.525C21.9015 10.8358 22 11.1915 22 11.554L22 17C22 17.5523 21.5523 18 21 18L20 18M17.5 6L17.5 4M9 18C9 19.1046 8.1046 20 7 20C5.8954 20 5 19.1046 5 18C5 16.8954 5.8954 16 7 16C8.1046 16 9 16.8954 9 18ZM19 18C19 19.1046 18.1046 20 17 20C15.8954 20 15 19.1046 15 18C15 16.8954 15.8954 16 17 16C18.1046 16 19 16.8954 19 18Z"/>
    </svg>
  )
}
