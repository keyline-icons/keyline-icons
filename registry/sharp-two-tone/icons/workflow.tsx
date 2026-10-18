import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Workflow({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L11 3C11.5523 3 12 3.4477 12 4L12 10C12 10.5523 11.5523 11 11 11L3 11C2.4477 11 2 10.5523 2 10L2 4C2 3.4477 2.4477 3 3 3ZM13 13L21 13C21.5523 13 22 13.4477 22 14L22 20C22 20.5523 21.5523 21 21 21L13 21C12.4477 21 12 20.5523 12 20L12 14C12 13.4477 12.4477 13 13 13Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M3 4L11 4L11 10L3 10L3 4ZM13 14L21 14L21 20L13 20L13 14ZM7 10L7 17L13 17" fill="none"/>
    </svg>
  )
}
