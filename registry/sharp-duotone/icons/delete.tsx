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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M1.2475 11.3415L8.2474 3.3415C8.4373 3.1245 8.7116 3 9 3L22 3C22.5523 3 23 3.4477 23 4L23 20C23 20.5523 22.5523 21 22 21L9 21C8.7116 21 8.4373 20.8755 8.2474 20.6585L1.2475 12.6585C1.088 12.4762 1 12.2422 1 12C1 11.7578 1.088 11.5238 1.2475 11.3415Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10.7071 8.7071L17.2929 15.2929M17.2929 8.7071L10.7071 15.2929"/>
    </svg>
  )
}
