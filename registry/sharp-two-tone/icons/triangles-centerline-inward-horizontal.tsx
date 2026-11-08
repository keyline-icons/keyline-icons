import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrianglesCenterlineInwardHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M12 14.74C12.332 14.74 12.643 14.91 12.829 15.18L17.053 21.44C17.259 21.75 17.28 22.14 17.106 22.47C16.933 22.8 16.593 23 16.224 23H7.777C7.408 23 7.068 22.8 6.895 22.47C6.721 22.14 6.741 21.75 6.948 21.44L11.206 15.13C11.395 14.92 11.709 14.74 12 14.74ZM23 13H1V11H23V13ZM16.223 1C16.592 1 16.932 1.2 17.105 1.53C17.279 1.86 17.259 2.25 17.052 2.56L12.828 8.82C12.642 9.09 12.331 9.26 11.999 9.26C11.667 9.26 11.357 9.09 11.171 8.82L6.947 2.56C6.741 2.25 6.72 1.86 6.894 1.53C7.067 1.2 7.407 1 7.776 1H16.223Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M23 12H1M12 8.26L7.777 2H16.223L12 8.26ZM12 15.74L7.777 22H16.223L12 15.74Z"/>
    </svg>
  )
}
