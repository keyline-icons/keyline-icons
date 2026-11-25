import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlowOffPage({ size = 24, ...props }: IconProps) {
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
      <path d="M12 4L22 4C22.5523 4 23 4.4477 23 5L23 12C23 12.3264 22.8407 12.6322 22.5733 12.8193L12.5733 19.8168C12.4053 19.9344 12.2051 19.9975 12 19.9975C11.7949 19.9975 11.5947 19.9344 11.4267 19.8168L1.4267 12.8193C1.1593 12.6322 1 12.3264 1 12L1 5C1 4.4477 1.4477 4 2 4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 5L22 5L22 12L12 18.9975L2 12Z"/>
    </svg>
  )
}
