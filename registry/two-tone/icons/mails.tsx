import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mails({ size = 24, ...props }: IconProps) {
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
      <path d="M9 7L19 7C21.2092 7 23 8.7908 23 11L23 17C23 19.2092 21.2092 21 19 21L9 21C6.7908 21 5 19.2092 5 17L5 11C5 8.7908 6.7908 7 9 7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 13L2 7C2 5.3431 3.3431 4 5 4L15 4M9 8L19 8C20.6569 8 22 9.3431 22 11L22 17C22 18.6569 20.6569 20 19 20L9 20C7.3431 20 6 18.6569 6 17L6 11C6 9.3431 7.3431 8 9 8ZM6 11L13.6046 14.2733C13.857 14.3819 14.143 14.3819 14.3954 14.2733L22 11" fill="none"/>
    </svg>
  )
}
