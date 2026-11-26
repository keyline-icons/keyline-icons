import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShieldAlert({ size = 24, ...props }: IconProps) {
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
      <path d="M5.065 4.175C7.451 3.892 9.251 2.7 10.328 1.655C10.769 1.228 11.382 1 12 1C12.618 1 13.231 1.228 13.672 1.655C14.749 2.7 16.55 3.892 18.935 4.175C20.094 4.313 21 5.255 21 6.383V12.571C21 14.566 20.639 16.586 19.403 18.185C18.108 19.859 16.054 21.733 13.175 22.791C12.417 23.07 11.583 23.07 10.825 22.791C7.946 21.733 5.892 19.859 4.597 18.185C3.361 16.586 3 14.566 3 12.571V6.383C3 5.255 3.906 4.313 5.065 4.175Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 7V13"/>
      <path d="M13 17C13 17.552 12.552 18 12 18C11.448 18 11 17.552 11 17C11 16.448 11.448 16 12 16C12.552 16 13 16.448 13 17Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
