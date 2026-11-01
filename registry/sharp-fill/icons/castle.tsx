import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Castle({ size = 24, ...props }: IconProps) {
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
      <path d="M8 22L2 22C1.4477 22 1 21.5523 1 21L1 7L3 7L3 9L5 9L5 2L7 2L7 4L11 4L11 2L13 2L13 4L17 4L17 2L19 2L19 9L21 9L21 7L23 7L23 21C23 21.5523 22.5523 22 22 22L8 22ZM15 20L15 16.5C15 15.3954 13.1046 14 12 14C10.8954 14 9 15.3954 9 16.5L9 20L15 20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
