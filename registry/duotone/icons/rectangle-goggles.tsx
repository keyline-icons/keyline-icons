import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RectangleGoggles({ size = 24, ...props }: IconProps) {
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
      <path d="M22 8V16C22 17.1046 21.1046 18 20 18H16.9612C16.3537 18 15.7791 17.7238 15.3995 17.2494L12.7809 13.9761C12.3805 13.4757 11.6195 13.4757 11.2191 13.9761L8.60049 17.2494C8.22094 17.7238 7.64632 18 7.03875 18H4C2.89543 18 2 17.1046 2 16V8C2 6.89543 2.89543 6 4 6H20C21.1046 6 22 6.89543 22 8Z"/>
    </svg>
  )
}
