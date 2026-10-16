import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CaretRight({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M18.5039 12.8638L6.5039 19.8638C5.8372 20.2527 5 19.7718 5 19L5 5C5 4.2282 5.8372 3.7473 6.5039 4.1362L18.5039 11.1362C19.1654 11.5221 19.1654 12.4779 18.5039 12.8638Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18 12L6 19L6 5L18 12Z"/>
    </svg>
  )
}
