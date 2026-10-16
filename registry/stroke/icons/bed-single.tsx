import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BedSingle({ size = 24, ...props }: IconProps) {
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
      <path d="M6 11L18 11C19.1046 11 20 11.8954 20 13L20 18C20 19.1046 19.1046 20 18 20L6 20C4.8954 20 4 19.1046 4 18L4 13C4 11.8954 4.8954 11 6 11ZM7 11L7 6C7 4.8954 7.8954 4 9 4L15 4C16.1046 4 17 4.8954 17 6L17 11M4 15L20 15" fill="none"/>
    </svg>
  )
}
