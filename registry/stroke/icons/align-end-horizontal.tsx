import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignEndHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M22 22H2M18 18H16C14.8954 18 14 17.105 14 16V12C14 10.895 14.8954 10 16 10H18C19.1046 10 20 10.895 20 12V16C20 17.105 19.1046 18 18 18ZM8 18H6C4.8954 18 4 17.105 4 16V4C4 2.895 4.8954 2 6 2H8C9.1046 2 10 2.895 10 4V16C10 17.105 9.1046 18 8 18Z"/>
    </svg>
  )
}
