import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Archive({ size = 24, ...props }: IconProps) {
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
      <path d="M4 4L20 4C21.1046 4 22 4.8954 22 6L22 7C22 8.1046 21.1046 9 20 9L4 9C2.8954 9 2 8.1046 2 7L2 6C2 4.8954 2.8954 4 4 4Z" fill="currentColor" stroke="none"/>
      <path d="M4 4L20 4C21.1046 4 22 4.8954 22 6L22 7C22 8.1046 21.1046 9 20 9L4 9C2.8954 9 2 8.1046 2 7L2 6C2 4.8954 2.8954 4 4 4ZM4 9L4 17C4 18.6569 5.3431 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 9M10 13L14 13"/>
    </svg>
  )
}
