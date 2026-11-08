import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mount({ size = 24, ...props }: IconProps) {
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
      <path d="M19 12H5M11.544 2.13L5.0727 7.61C4.8674 7.78 5.1213 8 5.5287 8H18.4713C18.8787 8 19.1326 7.78 18.9273 7.61L12.456 2.13C12.2523 1.96 11.7477 1.96 11.544 2.13ZM11.544 21.87L5.0727 16.39C4.8674 16.22 5.1213 16 5.5287 16H18.4713C18.8787 16 19.1326 16.22 18.9273 16.39L12.456 21.87C12.2523 22.04 11.7477 22.04 11.544 21.87Z"/>
    </svg>
  )
}
