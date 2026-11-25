import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlowDocument({ size = 24, ...props }: IconProps) {
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
      <path d="M2 17L2 5L22 5L22 17C20.6519 15.7161 18.8616 15 17 15C15.1384 15 13.3481 15.7161 12 17C10.6519 18.2839 8.8616 19 7 19C5.1384 19 3.3481 18.2839 2 17Z"/>
    </svg>
  )
}
