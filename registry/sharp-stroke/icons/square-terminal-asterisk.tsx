import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareTerminalAsterisk({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L21 3L21 21L3 21L3 3Z"/>
      <path d="M10 6.4648L10 13.5352M6.5547 12.2968L13.4453 7.7032M6.5547 7.7032L13.4453 12.2968M12 17L18 17"/>
    </svg>
  )
}
