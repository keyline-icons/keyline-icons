import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlagSwallowtail({ size = 24, ...props }: IconProps) {
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
      <path d="M4 3L18.9983 3C19.9908 2.9988 20.8337 3.7261 20.978 4.7081C20.9926 4.8054 20.9999 4.9038 20.9999 5.0022C20.9999 5.3966 20.8824 5.7821 20.6624 6.1094L18.0686 10L20.6623 13.8906C20.8821 14.2193 20.9994 14.6058 20.9994 15.0012C20.9994 15.567 20.7595 16.1063 20.3393 16.4853C19.9742 16.8165 19.4989 17 19.0059 17C19.0033 17 19.0008 17 18.9983 17L4 17C3.4477 17 3 16.5523 3 16L3 4C3 3.4477 3.4477 3 4 3Z" fill="currentColor" stroke="none"/>
      <path d="M4 2L4 22" fill="none"/>
    </svg>
  )
}
