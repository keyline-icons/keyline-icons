import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TriangleDashed({ size = 24, ...props }: IconProps) {
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
      <path d="M16.8653 8.5934L14.4051 4.3922C13.3181 2.536 10.6819 2.536 9.5949 4.3922L7.1347 8.5934M4.8608 12.4765L2.4006 16.6777C1.2854 18.5822 2.6307 21 4.8057 21L9.75 21M14.25 21L19.1943 21C21.3693 21 22.7146 18.5822 21.5994 16.6777L19.1392 12.4765"/>
    </svg>
  )
}
