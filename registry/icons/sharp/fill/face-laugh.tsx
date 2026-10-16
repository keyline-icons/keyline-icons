import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FaceLaugh({ size = 24, ...props }: IconProps) {
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
      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12ZM10 7L8 7L8 10L10 10L10 7ZM16 7L14 7L14 10L16 10L16 7ZM7 12C6.4477 12 6 12.4477 6 13C6 16.3137 8.6863 19 12 19C15.3137 19 18 16.3137 18 13C18 12.4477 17.5523 12 17 12L7 12Z" fill="currentColor"/>
    </svg>
  )
}
