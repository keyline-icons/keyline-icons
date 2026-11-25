import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GateBuffer({ size = 24, ...props }: IconProps) {
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
      <path d="M12.9789 8.1221L18.4789 11.1221C18.8001 11.2973 19 11.6341 19 12C19 12.3659 18.8001 12.7027 18.4789 12.8779L7.4789 18.8779C7.332 18.958 7.1673 19 7 19C6.4477 19 6 18.5523 6 18L6 6C6 5.4477 6.4477 5 7 5C7.1673 5 7.332 5.042 7.4789 5.1221Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1 12L7 12M18 12L23 12"/>
    </svg>
  )
}
