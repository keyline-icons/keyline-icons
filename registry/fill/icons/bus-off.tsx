import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BusOff({ size = 24, ...props }: IconProps) {
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
      <path d="M16.1767 16.1767C15.4603 16.5004 14.9999 17.2138 15 18L9 18C9 16.8954 8.1046 16 7 16C5.8954 16 5 16.8954 5 18L4 18C2.8954 18 2 17.1046 2 16L2 9L9 9L16.1767 16.1767ZM13.2426 9L14 9L17 12L22 12L22 16C22.0007 16.4713 21.8343 16.9276 21.5304 17.2877L13.2426 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M10 18L14 18M9 18C9 19.1046 8.1046 20 7 20C5.8954 20 5 19.1046 5 18C5 16.8954 5.8954 16 7 16C8.1046 16 9 16.8954 9 18ZM18.8233 18.8233C18.5094 19.5172 17.8111 20 17 20C15.8954 20 15 19.1046 15 18C15 17.1889 15.4828 16.4906 16.1767 16.1767M5 18L4 18C2.8954 18 2 17.1046 2 16L2 6C2 4.8954 2.8954 4 4 4M8 9L2 9M9.6569 4L17.4118 4C17.7936 4 18.1651 4.1238 18.4706 4.3529C20.6924 6.0193 22 8.6345 22 11.4118L22 12L22 16C22 16.1082 21.9914 16.2144 21.9749 16.318M14 4L14 8.3431M17.6569 12L22 12M2 2L22 22" fill="none"/>
    </svg>
  )
}
