import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HexagonZap({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2L22 6.8477L22 17.1523L12 22L2 17.1523L2 6.8477L12 2ZM13.1111 7.0001L7.0001 13.1111L11.4444 13.1111L10.8889 16.9999L16.9999 10.8889L12.5556 10.8889L13.1111 7.0001Z" fill="none"/>
    </svg>
  )
}
