import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Send({ size = 24, ...props }: IconProps) {
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
      <path d="M2.7164 7.7054L22 2L16.2946 21.2836C16.0554 22.0918 14.985 22.2598 14.5098 21.5637L9.9303 14.8559C9.7195 14.5471 9.4529 14.2805 9.1441 14.0697L2.4363 9.4902C1.7402 9.015 1.9082 7.9446 2.7164 7.7054ZM9.6113 14.3887L22 2" fill="none"/>
    </svg>
  )
}
