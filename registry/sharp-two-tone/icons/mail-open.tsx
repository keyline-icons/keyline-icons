import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MailOpen({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11.4576 1.1599L1.4576 7.616C1.1723 7.8002 1 8.1165 1 8.4561L1 22C1 22.5523 1.4477 23 2 23L22 23C22.5523 23 23 22.5523 23 22L23 8.4561C23 8.1165 22.8277 7.8002 22.5424 7.616L12.5424 1.1599C12.2122 0.9467 11.7878 0.9467 11.4576 1.1599Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 2L2 8.4561L2 22L22 22L22 8.4561L12 2ZM2 10L12 17.1428L22 10"/>
    </svg>
  )
}
