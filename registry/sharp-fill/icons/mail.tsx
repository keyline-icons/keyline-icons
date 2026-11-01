import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mail({ size = 24, ...props }: IconProps) {
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
      <path d="M23 9.1774L23 20C23 20.5523 22.5523 21 22 21L2 21C1.4477 21 1 20.5523 1 20L1 9.1774C1 8.6251 1.4477 8.1774 2 8.1774C2.135 8.1774 2.2685 8.2047 2.3926 8.2577L10.8263 11.8879C11.1812 12.0995 11.5868 12.2113 12 12.2113C12.4132 12.2113 12.8188 12.0995 13.1737 11.8879L21.6074 8.2577C21.7315 8.2047 21.865 8.1774 22 8.1774C22.5523 8.1774 23 8.6251 23 9.1774ZM1 4.8226L1 4C1 3.4477 1.4477 3 2 3L22 3C22.5523 3 23 3.4477 23 4L23 4.8226C23 5.222 22.7623 5.5832 22.3954 5.7411L12.3117 10.0815C12.2561 10.1054 12.2028 10.1344 12.1524 10.168C12.1066 10.1963 12.0538 10.2113 12 10.2113C11.9462 10.2113 11.8934 10.1963 11.8476 10.168C11.7972 10.1344 11.7439 10.1054 11.6883 10.0815L1.6046 5.7411C1.2377 5.5832 1 5.222 1 4.8226Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
