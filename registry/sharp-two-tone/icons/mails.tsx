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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 7L22 7C22.5523 7 23 7.4477 23 8L23 20C23 20.5523 22.5523 21 22 21L6 21C5.4477 21 5 20.5523 5 20L5 8C5 7.4477 5.4477 7 6 7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 14L2 4L16 4M6 8L22 8L22 20L6 20ZM6 11L14 14.4435L22 11" fill="none"/>
    </svg>
  )
}
