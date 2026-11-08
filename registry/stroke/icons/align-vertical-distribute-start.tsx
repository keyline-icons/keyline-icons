import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignVerticalDistributeStart({ size = 24, ...props }: IconProps) {
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
      <path d="M22 4H2M22 14H2M16 8V6C16 4.895 15.1046 4 14 4H10C8.8954 4 8 4.895 8 6V8C8 9.105 8.8954 10 10 10H14C15.1046 10 16 9.105 16 8ZM18 14H6C4.8954 14 4 14.895 4 16V18C4 19.105 4.8954 20 6 20H18C19.1046 20 20 19.105 20 18V16C20 14.895 19.1046 14 18 14Z"/>
    </svg>
  )
}
