import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function InboxDot({ size = 24, ...props }: IconProps) {
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
      <path d="M15 4L15 8C15 9.6569 16.3431 11 18 11L21.8051 11C21.8128 10.9998 21.8204 10.9997 21.828 10.9997C22.2519 10.9997 22.6298 11.2669 22.7711 11.6665C22.9226 12.0948 23 12.5457 23 13L23 17C23 19.2092 21.2092 21 19 21L5 21C2.7908 21 1 19.2092 1 17L1 13C1 12.2619 1.2042 11.5382 1.5901 10.9089L5.2695 4.9089C5.9969 3.7229 7.2882 3 8.6794 3L14 3C14.5523 3 15 3.4477 15 4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 13L8 13L10 16L14 16L16 13L22 13M22 6C22 7.1046 21.1046 8 20 8C18.8954 8 18 7.1046 18 6C18 4.8954 18.8954 4 20 4C21.1046 4 22 4.8954 22 6Z" fill="none"/>
    </svg>
  )
}
