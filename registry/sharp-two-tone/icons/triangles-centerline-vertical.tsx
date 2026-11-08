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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13 23H11V1H13V23ZM7.425 6.96C7.73 6.75 8.13 6.72 8.461 6.89C8.792 7.06 9 7.4 9 7.78V16.22C9 16.6 8.792 16.94 8.461 17.11C8.13 17.28 7.73 17.26 7.425 17.04L1.425 12.82C1.159 12.63 1 12.33 1 12C1 11.67 1.159 11.37 1.425 11.18L7.425 6.96ZM15.539 6.89C15.87 6.72 16.27 6.75 16.575 6.96L22.575 11.18C22.841 11.37 23 11.67 23 12C23 12.33 22.841 12.63 22.575 12.82L16.575 17.04C16.27 17.26 15.87 17.28 15.539 17.11C15.208 16.94 15 16.6 15 16.22V7.78C15 7.4 15.208 7.06 15.539 6.89Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 1V23M2 12L8 16.22V7.78L2 12ZM22 12L16 16.22V7.78L22 12Z"/>
    </svg>
  )
}
