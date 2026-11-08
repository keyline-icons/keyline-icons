import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function NavigationUpRight({ size = 24, ...props }: IconProps) {
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
      <path d="M4.3977 8.98L19.2337 4.03C19.6883 3.88 20.1207 4.31 19.9691 4.77L15.0229 19.6C14.859 20.09 14.1828 20.14 13.951 19.68L10.8281 13.43C10.7718 13.32 10.6806 13.23 10.5681 13.17L4.3214 10.05C3.8581 9.82 3.9062 9.14 4.3977 8.98Z"/>
    </svg>
  )
}
