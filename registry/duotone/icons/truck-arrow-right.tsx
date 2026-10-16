import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TruckArrowRight({ size = 24, ...props }: IconProps) {
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
      <path d="M10 4C10 3.44772 10.44772 3 11 3C13.209139 3 15 4.790861 15 7L15 7L16.585787 7C17.11622 7 17.624928 7.210714 18 7.585786L22.414214 12C22.789286 12.375072 23 12.88378 23 13.414213L23 17C23 18.104569 22.104569 19 21 19L3 19C1.895431 19 1 18.104569 1 17L1 13C1 12.44772 1.44772 12 2 12L8 12C9.10457 12 10 11.10457 10 10L10 4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 18C9 19.1046 8.1046 20 7 20C5.8954 20 5 19.1046 5 18C5 16.8954 5.8954 16 7 16C8.1046 16 9 16.8954 9 18ZM19 18C19 19.1046 18.1046 20 17 20C15.8954 20 15 19.1046 15 18C15 16.8954 15.8954 16 17 16C18.1046 16 19 16.8954 19 18ZM2 6.5L7 6.5M4.5 4L7 6.5L4.5 9"/>
    </svg>
  )
}
