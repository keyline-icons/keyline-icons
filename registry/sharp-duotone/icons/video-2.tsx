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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M17 5C17.5523 5 18 5.44772 18 6V18C18 18.5523 17.5523 19 17 19H2C1.44772 19 1 18.5523 1 18V6C1 5.44772 1.44772 5 2 5H17Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M21.5527 6.60544C21.8626 6.45049 22.2306 6.46731 22.5254 6.64939C22.8202 6.8316 23 7.1534 23 7.49997V16.5C23 16.8465 22.8202 17.1684 22.5254 17.3506C22.2306 17.5326 21.8626 17.5495 21.5527 17.3945L16.5527 14.8945C16.214 14.7251 16 14.3787 16 14V9.99997C16 9.62121 16.214 9.27484 16.5527 9.10544L21.5527 6.60544Z" fill="currentColor"/>
    </svg>
  )
}
