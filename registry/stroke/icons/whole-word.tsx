import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WholeWord({ size = 24, ...props }: IconProps) {
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
      <path d="M10 11C10 12.6569 8.6569 14 7 14C5.3431 14 4 12.6569 4 11C4 9.3431 5.3431 8 7 8C8.6569 8 10 9.3431 10 11ZM10 8L10 14M14 4L14 14M20 11C20 12.6569 18.6569 14 17 14C15.3431 14 14 12.6569 14 11C14 9.3431 15.3431 8 17 8C18.6569 8 20 9.3431 20 11ZM2 17L2 18C2 19.1046 2.8954 20 4 20L20 20C21.1046 20 22 19.1046 22 18L22 17"/>
    </svg>
  )
}
