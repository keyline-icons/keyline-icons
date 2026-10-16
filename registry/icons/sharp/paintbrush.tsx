import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Paintbrush({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2L18 2L18 12L19 12L19 16L13.8 16L15 22L9 22L9.5 19.5L10.2 16L5 16L5 12L6 12L6 2ZM6 12L18 12M10 2L10 7M14 2L14 9" fill="none"/>
    </svg>
  )
}
