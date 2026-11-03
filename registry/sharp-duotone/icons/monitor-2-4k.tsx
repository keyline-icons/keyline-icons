import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor24k({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11 18L2 18C1.4477 18 1 17.5523 1 17L1 3C1 2.4477 1.4477 2 2 2L22 2C22.5523 2 23 2.4477 23 3L23 17C23 17.5523 22.5523 18 22 18L13 18L13 20L17 20L17 22L7 22L7 20L11 20L11 18Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M8 14L8 12.2L6 12.2C5.6254 12.2 5.2822 11.9907 5.1108 11.6576C4.9394 11.3245 4.9685 10.9236 5.1863 10.6188L8.1863 6.4188C8.4389 6.065 8.8912 5.915 9.3052 6.0477C9.7192 6.1804 10 6.5653 10 7L10 10.2L10.5 10.2L10.5 12.2L10 12.2L10 14ZM15 6L15 8.4707L17.3113 6.275L18.6887 7.725L16.5701 9.7377L18.7663 12.3576L17.2337 13.6424L15.1173 11.1179L15 11.2293L15 14L13 14L13 6Z" fill="currentColor"/>
    </svg>
  )
}
