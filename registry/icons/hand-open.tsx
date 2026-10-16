import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HandOpen({ size = 24, ...props }: IconProps) {
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
      <path d="M11.0991 8.384L10.6566 4.586C10.485 3.7192 9.6065 3.1464 8.6906 3.3042C7.771 3.4625 7.1611 4.2971 7.3283 5.1682L8.434 13.6532C8.469 13.9211 8.1257 14.0793 7.924 13.8883L5.4898 11.5822C4.9857 11.1046 4.1909 11.0423 3.6108 11.4349C2.987 11.8571 2.8147 12.6647 3.2165 13.2832L4.9181 15.9026C8.5408 22.1944 12.7674 22.1944 15.1826 21.9082C19.6629 21.1366 20.9836 16.7211 20.998 13.49C21.001 13.3014 21.0001 9.7027 20.9988 7.027C20.9984 6.2092 20.2972 5.5474 19.4323 5.5474C18.5672 5.5474 17.8658 6.2106 17.8658 7.0287L17.8658 7.7302M11.0991 8.384L11.2579 10.4687M11.0991 8.384L10.8717 3.6524C10.8311 2.8082 11.5 2.0831 12.3901 2.0066C13.3264 1.9261 14.1488 2.5916 14.2093 3.4789L14.3364 5.3415M17.9984 10.937L17.8658 7.7302L17.7633 5.1763C17.7274 4.2835 16.9351 3.5861 15.9908 3.6162C15.0234 3.6471 14.2746 4.4281 14.3364 5.3415M14.3364 5.3415L14.6988 10.6534" fill="none"/>
    </svg>
  )
}
