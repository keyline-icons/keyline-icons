import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GateBufferTriState({ size = 24, ...props }: IconProps) {
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
      <path d="M8.4856 8.1258L17.4856 13.1258C17.8031 13.3022 18 13.6368 18 14C18 14.3632 17.8031 14.6978 17.4856 14.8742L8.4856 19.8742C8.3371 19.9567 8.1699 20 8 20C7.4477 20 7 19.5523 7 19L7 9C7 8.4477 7.4477 8 8 8C8.1699 8 8.3371 8.0433 8.4856 8.1258ZM2 14L7 14M18 14L22 14M13 4L13 10.6338"/>
    </svg>
  )
}
