import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HeartPulse({ size = 24, ...props }: IconProps) {
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
      <path d="M11.3505 21.7604C6.8469 17.9139 1 14.3082 1 8.75C1 5.1476 4.2844 2 8 2C9.4261 2 10.8308 2.479 12 3.2568C13.1692 2.479 14.5739 2 16 2C19.7156 2 23 5.1476 23 8.75C23 14.3082 17.1531 17.9139 12.6495 21.7604C12.2754 22.0799 11.7246 22.0799 11.3505 21.7604Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M2.3805 11L9 11L10 8L13 14L14 11L21.6195 11" fill="none"/>
    </svg>
  )
}
