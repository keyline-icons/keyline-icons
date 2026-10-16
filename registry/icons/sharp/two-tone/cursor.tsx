import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Cursor({ size = 24, ...props }: IconProps) {
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
      <path d="M7.912 21.3097L2.0492 3.3097C1.7938 2.5258 2.5434 1.7871 3.3235 2.0538L21.3235 8.2081C22.1688 8.4971 22.2398 9.665 21.4358 10.0543L13.9523 13.6783L9.7427 21.4751C9.3251 22.2487 8.1842 22.1456 7.912 21.3097Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8.8628 21L3 3L21 9.1543L13.2258 12.919L8.8628 21Z"/>
    </svg>
  )
}
