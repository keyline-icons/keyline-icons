import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pitcher({ size = 24, ...props }: IconProps) {
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
      <path d="M9.625 13L12 13L16.75 13C17.3023 13 17.75 13.4477 17.75 14C17.75 14.0415 17.7474 14.0829 17.7423 14.124L17.2113 18.3721C17.0236 19.8734 15.7474 21 14.2344 21L9.7656 21C8.2526 21 6.9764 19.8734 6.7887 18.3721L6.2577 14.124C6.2526 14.0829 6.25 14.0415 6.25 14C6.25 13.4477 6.6977 13 7.25 13ZM6.468 3L9.9344 3L16.8672 3C18.0702 3 19.001 4.0543 18.8518 5.248L18.2423 10.124C18.1797 10.6245 17.7543 11 17.25 11L17 11L12 11L7 11L6.75 11C6.2457 11 5.8203 10.6245 5.7577 10.124L5.572 8.6383L2.0602 6.7646C1.6236 6.5317 1.3111 6.1728 1.1429 5.7548C0.9787 5.3465 0.9626 4.91 1.0613 4.5148C1.1602 4.1194 1.38 3.7419 1.7169 3.4592C2.062 3.1696 2.5067 3 3.0016 3Z" fill="currentColor" stroke="none"/>
      <path d="M17.5 8H18C20.2091 8 22 9.7909 22 12C22 14.2091 20.2091 16 18 16H16.5"/>
    </svg>
  )
}
