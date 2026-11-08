import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignVerticalDistributeCenter({ size = 24, ...props }: IconProps) {
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
      <path d="M7 17V16C7 14.896 7.8941 14 9 14H15C16.1032 14 17 14.897 17 16V17M7 17V18C7 19.106 7.8945 20 9 20H15C16.1037 20 17 19.106 17 18V17M7 17H2M17 17H22M19 7V8C19 9.104 18.1025 10 17 10H7C5.8934 10 5 9.108 5 8V7M19 7V6C19 4.894 18.1011 4 17 4H7C5.892 4 5 4.899 5 6V7M19 7H22M5 7H2"/>
    </svg>
  )
}
