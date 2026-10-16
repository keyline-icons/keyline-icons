import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cctv({ size = 24, ...props }: IconProps) {
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
      <path d="M9.4787 3.1459L16.8962 6.1428C17.4083 6.3497 17.6556 6.9325 17.4488 7.4446L15.5757 12.0805C15.3688 12.5926 14.786 12.84 14.2739 12.6331L6.8565 9.6362C5.8323 9.2224 5.3375 8.0568 5.7513 7.0326L6.8751 4.2511C7.2889 3.2269 8.4546 2.7322 9.4787 3.1459ZM17.0742 8.3718L19.9192 8.1446C20.6602 8.0854 21.2044 8.8268 20.926 9.516L19.516 13.0059C19.2375 13.6951 18.331 13.8504 17.8391 13.293L15.9503 11.1533M7.3201 9.8235L7.3201 17L3 17M3 13L3 21"/>
    </svg>
  )
}
