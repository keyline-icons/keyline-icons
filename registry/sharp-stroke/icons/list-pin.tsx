import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ListPin({ size = 24, ...props }: IconProps) {
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
      <path d="M11.5 4L19.5 4L19.5 7L17.5 7L17.5 10.5L22 13.5L22 15L9 15L9 13.5L13.5 10.5L13.5 7L11.5 7L11.5 4ZM15.5 15L15.5 21M1 10L8 10M1 15L6 15M1 20L12 20" fill="none"/>
    </svg>
  )
}
