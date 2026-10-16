import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SquareNavigation({ size = 24, ...props }: IconProps) {
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
      <path d="M19 21L21 21L21 3L3 3L3 21L5 21"/>
      <path d="M8.6148 18.0691L11.2224 12.9948C11.5613 12.3351 12.4387 12.3351 12.7776 12.9948L15.3852 18.0691C15.7728 18.8235 15.1164 19.7053 14.3519 19.4574L12.2556 18.7775C12.0889 18.7234 11.9111 18.7234 11.7444 18.7775L9.6481 19.4574C8.8836 19.7053 8.2272 18.8235 8.6148 18.0691Z" fill="currentColor" stroke="none"/>
      <path d="M8.5 19.5L12 12.5L15.5 19.5L12 18.6945L8.5 19.5Z"/>
    </svg>
  )
}
