import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartNoAxesCombined({ size = 24, ...props }: IconProps) {
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
      <path d="M22 3L13.5984 10.0013C13.2465 10.2945 12.7405 10.3112 12.37 10.0418L8.1911 7.0026C7.7931 6.7132 7.2437 6.7563 6.8958 7.1042L2 12" strokeOpacity="0.4"/>
      <path d="M4 21L4 17M8 21L8 12M12 21L12 15M16 21L16 13.5M20 21L20 10"/>
    </svg>
  )
}
