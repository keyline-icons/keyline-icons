import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Parallelogram({ size = 24, ...props }: IconProps) {
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
      <path d="M5.2631 6.1052C5.6545 4.8527 6.8144 4 8.1265 4L18.9985 4C21.0224 4 22.4656 5.963 21.8619 7.8948L18.7369 17.8948C18.3455 19.1473 17.1856 20 15.8735 20L5.0015 20C2.9776 20 1.5344 18.037 2.1381 16.1052Z"/>
    </svg>
  )
}
