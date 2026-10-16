import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Input({ size = 24, ...props }: IconProps) {
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
      <path d="M2 9C2 7.8954 2.8954 7 4 7L20 7C21.1046 7 22 7.8954 22 9L22 15C22 16.1046 21.1046 17 20 17L4 17C2.8954 17 2 16.1046 2 15L2 9ZM6 11L6 13" fill="none"/>
    </svg>
  )
}
