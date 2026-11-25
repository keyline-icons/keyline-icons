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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13.4712 7.7516L17.9712 10.2516C18.6062 10.6044 19 11.2736 19 12C19 12.7264 18.6062 13.3956 17.9713 13.7483L8.9712 18.7484C8.6741 18.9134 8.3397 19 8 19C6.8954 19 6 18.1046 6 17L6 7C6 5.8954 6.8954 5 8 5C8.3397 5 8.6741 5.0866 8.9712 5.2516Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2 12L7 12M18 12L22 12"/>
    </svg>
  )
}
