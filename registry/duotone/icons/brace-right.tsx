import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BraceRight({ size = 24, ...props }: IconProps) {
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
      <path d="M10 2C11.1046 2 12 2.8954 12 4L12 8.9645C12 9.4949 12.2107 10.0036 12.5858 10.3787L13.8536 11.6464C13.9473 11.7402 14 11.8674 14 12C14 12.1326 13.9473 12.2598 13.8536 12.3536L12.5858 13.6213C12.2107 13.9964 12 14.5051 12 15.0355L12 20C12 21.1046 11.1046 22 10 22" fill="none"/>
    </svg>
  )
}
