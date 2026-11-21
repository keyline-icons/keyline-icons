import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RockingChair({ size = 24, ...props }: IconProps) {
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
      <path d="M4 3L6.7862 12.2873C6.9131 12.7103 7.3024 13 7.744 13H10M14 13H17M14 13L17 20.1107M14 13H10M22 17C20.5505 18.3805 18.8454 19.4327 17 20.1107C15.4127 20.6938 13.7216 21 12 21C10.2784 21 8.58726 20.6938 7 20.1107C5.15456 19.4327 3.44949 18.3805 2 17M10 13L7 20.1107"/>
    </svg>
  )
}
