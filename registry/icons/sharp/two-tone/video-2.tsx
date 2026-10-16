import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Video2({ size = 24, ...props }: IconProps) {
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
      <path d="M17 5C17.5523 5 18 5.44772 18 6V8.38184L21.5527 6.60547C21.8626 6.45051 22.2306 6.46733 22.5254 6.64941C22.8202 6.83162 23 7.15343 23 7.5V16.5C23 16.8466 22.8202 17.1684 22.5254 17.3506C22.2306 17.5326 21.8626 17.5495 21.5527 17.3945L18 15.6182V18C18 18.5523 17.5523 19 17 19H2C1.44772 19 1 18.5523 1 18V6C1 5.44772 1.44772 5 2 5H17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 6L17 6L17 18L2 18ZM17 10L22 7.5L22 16.5L17 14"/>
    </svg>
  )
}
