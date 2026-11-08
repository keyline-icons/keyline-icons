import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrianglesCenterlineVertical({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13.006 1V23H11.007V1H13.006ZM7.434 6.96C7.739 6.74 8.139 6.72 8.47 6.89C8.801 7.06 9.009 7.4 9.009 7.78V16.29C8.964 16.61 8.759 16.96 8.47 17.11C8.139 17.28 7.737 17.26 7.433 17.04L1.438 12.82C1.206 12.65 1.035 12.23 1 11.95C1.055 11.71 1.235 11.33 1.438 11.18L7.434 6.96ZM15.544 6.89C15.797 6.76 16.217 6.79 16.478 6.89L22.575 11.18C22.841 11.37 23 11.74 23 12.06C22.965 12.34 22.807 12.65 22.575 12.82L16.579 17.04C16.274 17.25 15.875 17.28 15.544 17.11C15.291 16.98 15.076 16.62 15.005 16.35V7.78C15.005 7.4 15.213 7.06 15.544 6.89Z" fill="currentColor"/>
    </svg>
  )
}
