import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AirVent({ size = 24, ...props }: IconProps) {
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
      <path d="M19 13C20.6569 13 22 11.6569 22 10L22 6C22 4.3431 20.6569 3 19 3L5 3C3.3431 3 2 4.3431 2 6L2 10C2 11.6569 3.3431 13 5 13M6 9L18 9M14 13L14 19C14 20.1046 14.8954 21 16 21C17.1046 21 18 20.1046 18 19L18 18M9.5 13L9.5 17C9.5 18.1046 8.6046 19 7.5 19C6.3954 19 5.5 18.1046 5.5 17" fill="none"/>
    </svg>
  )
}
