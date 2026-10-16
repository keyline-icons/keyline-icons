import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowLeftRight2({ size = 24, ...props }: IconProps) {
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
      <path d="M1 17L2 17L12.2604 17L12.9144 17M7.8062 11.7061L8.1053 12L13.1934 17L8.1053 22L7.8062 22.2939M23 7L22 7L11.7396 7L11.0856 7M16.1938 12.2939L15.8947 12L10.8066 7L15.8947 2L16.1938 1.7061"/>
    </svg>
  )
}
