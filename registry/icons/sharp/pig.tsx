import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pig({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4.0749 11.9925C4.0749 15.1509 5.0194 17.021 6.8228 18.0115L7.1038 18.166L7.1038 21L9.7355 21L11.6223 18.1555L12.5656 18.1555L14.4526 21L17.0346 21L17.0346 17.3785L17.4468 17.28C20.0664 16.6559 20.09 14.9685 20.0359 13.914L20.0102 13.4148L22 13.4148L22 10.5704L20.0301 10.5704L20.0264 10.0431C20.0161 8.5618 19.5959 7.4312 18.5591 6.9149L18.2263 6.7493L18.1968 3L17.7263 3.001C15.7712 3.1278 14.6975 3.9882 14.2076 4.6549L13.9724 4.9747L13.6162 4.9013C8.9271 3.9337 5.942 6.152 4.5466 9.5102C4.2408 10.2462 4.0749 11.0754 4.0749 11.9925ZM4.0749 11.9925C3.1315 11.6765 1.4333 10.3807 2.1881 7.7258L2.3943 6.9986" fill="none"/>
      <path d="M17 9.5C17 10.0523 16.5523 10.5 16 10.5C15.4477 10.5 15 10.0523 15 9.5C15 8.9477 15.4477 8.5 16 8.5C16.5523 8.5 17 8.9477 17 9.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
