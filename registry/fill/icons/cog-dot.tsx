import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CogDot({ size = 24, ...props }: IconProps) {
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
      <path d="M20 12C20 16.42 16.4182 20 12 20M20 12H22M20 12H14M12 20C7.5818 20 4 16.42 4 12M12 20V22M4 12C4 7.58 7.5818 4 12 4V2M4 12H2M14 12C14 10.9 13.1046 10 12 10C10.8954 10 10 10.9 10 12C10 13.1 10.8954 14 12 14C13.1046 14 14 13.1 14 12ZM7 3.35L8 5.08L10.8366 10M16 18.94L17 20.67M3.3373 7L5.0693 8M18.9257 16L20.6578 17M3.3422 17L5.0743 16M7 20.67L8 18.94L10.854 14M19 2C20.6568 2 22 3.34 22 5C22 6.66 20.6568 8 19 8C17.3432 8 16 6.66 16 5C16 3.34 17.3432 2 19 2Z"/>
    </svg>
  )
}
