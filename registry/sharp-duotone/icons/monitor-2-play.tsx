import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor2Play({ size = 24, ...props }: IconProps) {
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
      <path d="M10.561 6.1722L14.9877 9.1722C15.2623 9.3583 15.4267 9.6683 15.4267 10C15.4267 10.3317 15.2623 10.6417 14.9877 10.8278L10.561 13.8278C10.3954 13.94 10.2 14 10 14C9.4477 14 9 13.5523 9 13L9 7C9 6.4477 9.4477 6 10 6C10.2 6 10.3954 6.06 10.561 6.1722Z" fill="currentColor"/>
    </svg>
  )
}
