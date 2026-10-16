import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Delete({ size = 24, ...props }: IconProps) {
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
      <path d="M1.2475 11.3415L8.2474 3.3415C8.4373 3.1245 8.7116 3 9 3L22 3C22.5523 3 23 3.4477 23 4L23 20C23 20.5523 22.5523 21 22 21L9 21C8.7116 21 8.4373 20.8755 8.2474 20.6585L1.2475 12.6585C1.088 12.4762 1 12.2422 1 12C1 11.7578 1.088 11.5238 1.2475 11.3415ZM11.4142 8L10 9.4142L12.5858 12L10 14.5858L11.4142 16L14 13.4142L16.5858 16L18 14.5858L15.4142 12L18 9.4142L16.5858 8L14 10.5858L11.4142 8Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
