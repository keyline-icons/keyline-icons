import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowUpDown2({ size = 24, ...props }: IconProps) {
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
      <path d="M17 1L17 2L17 12.2604L17 12.9144M11.7061 7.8062L12 8.1053L17 13.1934L22 8.1053L22.2939 7.8062" fill="none" strokeOpacity="0.4"/>
      <path d="M7 23L7 22L7 11.7396L7 11.0856M12.2939 16.1938L12 15.8947L7 10.8066L2 15.8947L1.7061 16.1938"/>
    </svg>
  )
}
