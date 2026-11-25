import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ImageAlignLeft({ size = 24, ...props }: IconProps) {
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
      <path d="M5 7L11 7C12.1046 7 13 7.8954 13 9L13 15C13 16.1046 12.1046 17 11 17L5 17C3.8954 17 3 16.1046 3 15L3 9C3 7.8954 3.8954 7 5 7ZM3 3H21M3 21H21"/>
    </svg>
  )
}
