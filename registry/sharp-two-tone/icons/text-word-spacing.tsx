import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TextWordSpacing({ size = 24, ...props }: IconProps) {
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
      <path d="M13 20V22H2V20H13Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M22 14V16H11V14H22ZM13 2V4H2V2H13ZM9 14V16H2V14H9ZM22 8V10H15V8H22ZM22 2V4H15V2H22ZM13 8V10H8V8H13ZM6 8V10H2V8H6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
