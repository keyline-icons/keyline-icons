import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowRightLeft2({ size = 24, ...props }: IconProps) {
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
      <path d="M23 17L22 17L11.7396 17L11.0856 17M16.1938 11.7061L15.8947 12L10.8066 17L15.8947 22L16.1938 22.2939M1 7L2 7L12.2604 7L12.9144 7M7.8062 12.2939L8.1053 12L13.1934 7L8.1053 2L7.8062 1.7061"/>
    </svg>
  )
}
