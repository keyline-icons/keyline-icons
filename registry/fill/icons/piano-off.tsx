import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PianoOff({ size = 24, ...props }: IconProps) {
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
      <path d="M6 6L6 12C6 12.3703 6.2013 12.6936 6.5004 12.8664C6.8096 13.0451 7 13.3751 7 13.7323L7 20C7 20.5523 6.5523 21 6 21L5 21C2.7908 21 1 19.2092 1 17L1 7C1 5.3778 1.9656 3.9811 3.3535 3.3535ZM20.6465 20.6465C20.1444 20.8736 19.587 21 19 21L10 21C9.4477 21 9 20.5523 9 20L9 13.7323C9 13.3751 9.1904 13.0451 9.4996 12.8664C9.7987 12.6936 10 12.3703 10 12L10 10ZM21.2929 17.0502L17.2186 12.976C17.6658 12.8763 18 12.4772 18 12L18 6C18 5.4477 17.5523 5 17 5L15 5C14.4477 5 14 5.4477 14 6L14 9.7574L8.9498 4.7071C8.7688 4.5261 8.6569 4.2761 8.6569 4C8.6569 3.4477 9.1046 3 9.6569 3L12 3L19 3C21.2092 3 23 4.7908 23 7L23 16.3431C23 16.8954 22.5523 17.3431 22 17.3431C21.7239 17.3431 21.4739 17.2312 21.2929 17.0502Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M2 2L22 22"/>
    </svg>
  )
}
