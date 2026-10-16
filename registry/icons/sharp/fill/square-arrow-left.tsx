import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareArrowLeft({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 2L21 2C21.5523 2 22 2.4477 22 3L22 21C22 21.5523 21.5523 22 21 22L3 22C2.4477 22 2 21.5523 2 21L2 3C2 2.4477 2.4477 2 3 2ZM11.4984 6.9894L7.0889 11.2836C6.6859 11.6762 6.6859 12.3238 7.0889 12.7164L11.4983 17.0112L12.8938 15.5776L10.2471 13L17 13L17 11L10.2471 11L12.8939 8.423L11.4984 6.9894Z" fill="currentColor"/>
    </svg>
  )
}
