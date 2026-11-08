import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignHorizontalDistributeStart({ size = 24, ...props }: IconProps) {
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
      <path d="M4 2V22M14 2V22M18 8H16C14.8954 8 14 8.895 14 10V14C14 15.105 14.8954 16 16 16H18C19.1046 16 20 15.105 20 14V10C20 8.895 19.1046 8 18 8ZM4 6V18C4 19.105 4.8954 20 6 20H8C9.1046 20 10 19.105 10 18V6C10 4.895 9.1046 4 8 4H6C4.8954 4 4 4.895 4 6Z"/>
    </svg>
  )
}
