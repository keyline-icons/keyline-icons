import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Grid3x3({ size = 24, ...props }: IconProps) {
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
      <path d="M18 2C20.2092 2 22 3.7909 22 6L22 18C22 20.2092 20.2092 22 18 22L6 22C3.7909 22 2 20.2092 2 18L2 6C2 3.7909 3.7909 2 6 2L18 2ZM8 8L4 8L4 10L8 10L8 14L4 14L4 16L8 16L8 20L10 20L10 16L14 16L14 20L16 20L16 16L20 16L20 14L16 14L16 10L20 10L20 8L16 8L16 4L14 4L14 8L10 8L10 4L8 4ZM10 10L10 14L14 14L14 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
