import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Heading5({ size = 24, ...props }: IconProps) {
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
      <path d="M2 4V20M11 4V20M2 12H11" strokeOpacity="0.4"/>
      <path d="M21 13H17V16H19C20.1046 16 21 16.8954 21 18C21 19.1046 20.1046 20 19 20C18.2855 20 17.3573 19.6188 17 19"/>
    </svg>
  )
}
