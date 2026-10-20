import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ScanUser({ size = 24, ...props }: IconProps) {
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
      <path d="M3 8L3 6C3 4.3431 4.3431 3 6 3L8 3M16 3L18 3C19.6569 3 21 4.3431 21 6L21 8M21 16L21 18C21 19.6569 19.6569 21 18 21L16 21M8 21L6 21C4.3431 21 3 19.6569 3 18L3 16" fill="none"/>
      <path d="M14.5 7.5C14.5 8.8807 13.3807 10 12 10C10.6193 10 9.5 8.8807 9.5 7.5C9.5 6.1193 10.6193 5 12 5C13.3807 5 14.5 6.1193 14.5 7.5ZM11 12L13 12C15.2092 12 17 13.7908 17 16C17 17.1046 16.1046 18 15 18L9 18C7.8954 18 7 17.1046 7 16C7 13.7908 8.7908 12 11 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
