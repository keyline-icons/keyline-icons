import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignHorizontalSpaceBetween({ size = 24, ...props }: IconProps) {
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
      <path d="M20 2V22M4 2V22M4 9V15C4 16.1046 4.8954 17 6 17H7C8.1046 17 9 16.1046 9 15V9C9 7.8954 8.1046 7 7 7H6C4.8954 7 4 7.8954 4 9ZM15 9V15C15 16.1046 15.8954 17 17 17H18C19.1046 17 20 16.1046 20 15V9C20 7.8954 19.1046 7 18 7H17C15.8954 7 15 7.8954 15 9Z"/>
    </svg>
  )
}
