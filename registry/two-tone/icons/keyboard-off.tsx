import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function KeyboardOff({ size = 24, ...props }: IconProps) {
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
      <path d="M20.6465 20.6465C20.1291 20.8803 19.5677 21.0008 19 21L5 21C2.7909 21 1 19.2091 1 17L1 7C0.9998 5.4276 1.9206 4.0009 3.3535 3.3535L20.6465 20.6465ZM9.6569 3L19 3C21.2091 3 23 4.7909 23 7L23 16.3431L22.98 16.3431C22.9802 16.8844 22.5415 17.3233 22.0002 17.3233C21.7402 17.3233 21.4908 17.22 21.3071 17.0361L21.2929 17.0503L8.9497 4.7071L8.9639 4.6929C8.78 4.5092 8.6767 4.2598 8.6767 3.9998C8.6767 3.4585 9.1156 3.0198 9.6569 3.02L9.6569 3Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M5.5 11L6.5 11C6.7761 11 7 11.2239 7 11.5L7 12.5C7 12.7761 6.7761 13 6.5 13L5.5 13C5.2239 13 5 12.7761 5 12.5L5 11.5C5 11.2239 5.2239 11 5.5 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M19.8715 19.8715C19.5957 19.9551 19.3031 20 19 20L5 20C3.3431 20 2 18.6569 2 17L2 7C2 5.6462 2.8967 4.5019 4.1285 4.1285M8 16L16 16M2 2L22 22" fill="none"/>
    </svg>
  )
}
