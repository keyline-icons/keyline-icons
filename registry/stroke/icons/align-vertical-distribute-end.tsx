import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignVerticalDistributeEnd({ size = 24, ...props }: IconProps) {
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
      <path d="M22 20H2M22 10H2M16 16V18C16 19.105 15.1046 20 14 20H10C8.8954 20 8 19.105 8 18V16C8 14.895 8.8954 14 10 14H14C15.1046 14 16 14.895 16 16ZM18 10H6C4.8954 10 4 9.105 4 8V6C4 4.895 4.8954 4 6 4H18C19.1046 4 20 4.895 20 6V8C20 9.105 19.1046 10 18 10Z"/>
    </svg>
  )
}
