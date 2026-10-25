import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Factory({ size = 24, ...props }: IconProps) {
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
      <path d="M2 19L2 4C2 3.4477 2.4477 3 3 3L6 3C6.5523 3 7 3.4477 7 4L7 10.1169C7 10.5056 7.424 10.7456 7.7572 10.5457L11.2428 8.4543C11.576 8.2544 12 8.4944 12 8.8831L12 10.1169C12 10.5056 12.424 10.7456 12.7572 10.5457L16.2428 8.4543C16.576 8.2544 17 8.4944 17 8.8831L17 10.1169C17 10.5056 17.424 10.7456 17.7572 10.5457L21.2428 8.4543C21.576 8.2544 22 8.4944 22 8.8831L22 19C22 20.1046 21.1046 21 20 21L4 21C2.8954 21 2 20.1046 2 19ZM2 7L7 7M11 4.5C11 3.6716 11.6716 3 12.5 3L22 3M10 15L10 17M14 15L14 17M18 15L18 17" fill="none"/>
    </svg>
  )
}
