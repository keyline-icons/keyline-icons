import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WifiPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M7.3333 15.0186C8.0667 14.3626 9.0161 14 10 14C10.7121 14 11.4113 14.1901 12.0253 14.5506M4.6667 12.0372C6.1334 10.7253 8.0322 10 10 10C11.4242 10 12.8225 10.3802 14.0506 11.1013M2 9.0557C4.2001 7.0879 7.0483 6 10 6C12.606 6 15.1411 6.8483 17.2223 8.4167" strokeOpacity="0.4"/>
      <path d="M11 18C11 18.5523 10.5523 19 10 19C9.4477 19 9 18.5523 9 18C9 17.4477 9.4477 17 10 17C10.5523 17 11 17.4477 11 18Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19 12L19 18M16 15L22 15"/>
    </svg>
  )
}
