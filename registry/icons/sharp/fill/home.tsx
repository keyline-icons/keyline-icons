import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Home({ size = 24, ...props }: IconProps) {
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
      <path d="M12.6135 2.2048L20.9395 8.6379L21.6854 9.3401C21.8862 9.529 22 9.7925 22 10.0682L21.9998 21.0002C21.9998 21.5525 21.5521 22.0002 20.9998 22.0002L16 22.0002L16 13.0002L8 13.0002L8 22.0002L3.0002 22.0002C2.4479 22.0002 2.0002 21.5525 2.0002 21.0002L2 9.9999C2 9.706 2.1293 9.4269 2.3536 9.2369L11.3881 2.2069C11.7482 1.9266 12.2524 1.9258 12.6135 2.2048Z" fill="currentColor"/>
    </svg>
  )
}
