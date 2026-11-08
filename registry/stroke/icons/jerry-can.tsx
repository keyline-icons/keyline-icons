import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function JerryCan({ size = 24, ...props }: IconProps) {
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
      <path d="M19 6H11.5736C11.1988 6 10.8315 6.11 10.5136 6.3L3.94 10.41C3.3552 10.78 3 11.42 3 12.11V20C3 21.1 3.8954 22 5 22H19C20.1046 22 21 21.1 21 20V8C21 6.9 20.1046 6 19 6ZM19 6V3.5C19 2.67 18.3284 2 17.5 2H14.5C13.6716 2 13 2.67 13 3.5V6M3 6L8 3M10 13V17M10 13H14M10 13L9 12M10 17H14M10 17L9 18M14 13V17M14 13L15 12M14 17L15 18"/>
    </svg>
  )
}
