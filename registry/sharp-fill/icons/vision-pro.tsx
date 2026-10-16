import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VisionPro({ size = 24, ...props }: IconProps) {
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
      <path d="M7 6L17 6C20.3137 6 23 8.6863 23 12C23 15.3137 20.3137 18 17 18L15.39 18C15.0548 18 14.7419 17.8321 14.5566 17.5528L13.0734 15.3166L10.9266 15.3166L9.4434 17.5528C9.2581 17.8321 8.9452 18 8.61 18L7 18C3.6863 18 1 15.3137 1 12C1 8.6863 3.6863 6 7 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
