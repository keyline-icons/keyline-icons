import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CassetteTape({ size = 24, ...props }: IconProps) {
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
      <path d="M5 3L19 3C21.2092 3 23 4.7908 23 7L23 17C23 19.2092 21.2092 21 19 21L5 21C2.7908 21 1 19.2092 1 17L1 7C1 4.7908 2.7908 3 5 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 4L19 4C20.6569 4 22 5.3431 22 7L22 17C22 18.6569 20.6569 20 19 20L5 20C3.3431 20 2 18.6569 2 17L2 7C2 5.3431 3.3431 4 5 4ZM10 10C10 11.1046 9.1046 12 8 12C6.8954 12 6 11.1046 6 10C6 8.8954 6.8954 8 8 8C9.1046 8 10 8.8954 10 10ZM18 10C18 11.1046 17.1046 12 16 12C14.8954 12 14 11.1046 14 10C14 8.8954 14.8954 8 16 8C17.1046 8 18 8.8954 18 10ZM8 12L16 12M6 20L7.3495 16.8054C7.4277 16.6203 7.6092 16.5 7.8101 16.5L16.1899 16.5C16.3908 16.5 16.5723 16.6203 16.6505 16.8054L18 20" fill="none"/>
    </svg>
  )
}
