import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ListVideo({ size = 24, ...props }: IconProps) {
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
      <path d="M2 6L16 6M2 12L12 12M2 18L12 18" strokeOpacity="0.4"/>
      <path d="M18.19907 9.40293L22.19907 12.3993C23.26698 13.19926 23.26698 14.80074 22.19907 15.6007L18.19907 18.59707C16.88045 19.58483 15 18.64393 15 16.99637L15 11.00363C15 9.35607 16.88045 8.41517 18.19907 9.40293Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
