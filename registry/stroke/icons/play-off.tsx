import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlayOff({ size = 24, ...props }: IconProps) {
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
      <path d="M14.948 14.948L9.2585 19.5544C8.9024 19.8427 8.4582 20 8 20C6.8954 20 6 19.1046 6 18L6 6M13.6917 8.0348L17.6292 11.2228C17.8638 11.4127 18 11.6983 18 12C18 12.101 17.9847 12.2014 17.9546 12.2978M2 2L22 22"/>
    </svg>
  )
}
