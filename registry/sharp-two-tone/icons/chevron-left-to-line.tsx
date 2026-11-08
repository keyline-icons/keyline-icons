import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChevronLeftToLine({ size = 24, ...props }: IconProps) {
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
      <path d="M18 6.41L12.414 12L18 17.59L16.586 19L10.293 12.71C9.902 12.32 9.902 11.68 10.293 11.29L16.586 5L18 6.41Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M8 20H6V4H8V20Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
