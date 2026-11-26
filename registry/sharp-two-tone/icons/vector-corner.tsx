import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VectorCorner({ size = 24, ...props }: IconProps) {
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
      <path d="M12 4L14 4C14.5523 4 15 4.4477 15 5L15 9C15 9.5523 14.5523 10 14 10L10 10C9.4477 10 9 9.5523 9 9L9 5C9 4.4477 9.4477 4 10 4Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10 5L14 5L14 9L10 9ZM10 8L1.8126 19.4172M14 8L22.1874 19.4172"/>
    </svg>
  )
}
