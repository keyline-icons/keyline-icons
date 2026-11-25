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
      <path d="M8.4856 6.1258L17.4856 11.1258C17.8031 11.3022 18 11.6368 18 12C18 12.3632 17.8031 12.6978 17.4856 12.8742L8.4856 17.8742C8.3371 17.9567 8.1699 18 8 18C7.4477 18 7 17.5523 7 17L7 7C7 6.4477 7.4477 6 8 6C8.1699 6 8.3371 6.0433 8.4856 6.1258ZM2 12L7 12M18 12L22 12"/>
    </svg>
  )
}
