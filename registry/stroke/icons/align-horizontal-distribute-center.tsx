import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignHorizontalDistributeCenter({ size = 24, ...props }: IconProps) {
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
      <path d="M17 17H16C14.8964 17 14 16.106 14 15V9C14 7.897 14.8967 7 16 7H17M17 17H18C19.1055 17 20 16.105 20 15V9C20 7.896 19.1058 7 18 7H17M17 17V22M17 7V2M7 5H8C9.1035 5 10 5.897 10 7V17C10 18.107 9.1079 19 8 19H7M7 5H6C4.8943 5 4 5.899 4 7V17C4 18.108 4.8988 19 6 19H7M7 5V2M7 19V22"/>
    </svg>
  )
}
