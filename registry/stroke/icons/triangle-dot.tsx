import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TriangleDot({ size = 24, ...props }: IconProps) {
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
      <path d="M14.4051 4.3922C13.3181 2.536 10.6819 2.536 9.5949 4.3922L2.4006 16.6777C1.2854 18.5822 2.6307 21 4.8057 21L19.1943 21C21.3693 21 22.7146 18.5822 21.5994 16.6777L14.4051 4.3922Z" fill="none"/>
      <path d="M14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
