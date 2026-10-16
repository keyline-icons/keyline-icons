import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Escape({ size = 24, ...props }: IconProps) {
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
      <path d="M12.4412 4.0174C12.6272 4.0058 12.8136 4 13 4C17.9706 4 22 8.0294 22 13C22 17.9706 17.9706 22 13 22C8.0294 22 4 17.9706 4 13C4 12.8136 4.0058 12.6272 4.0174 12.4412M13 13L3.2 3.2M2 9L2 2.5C2 2.2239 2.2239 2 2.5 2L9 2"/>
    </svg>
  )
}
