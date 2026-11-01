import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function EvChargerOff({ size = 24, ...props }: IconProps) {
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
      <path d="M14 14L14 22L2 22L2 5C2 4.1715 2.3358 3.4215 2.8787 2.8787M14 22L22 22M14 17L17 17M8.5714 8.5714L6 12L10 12L7 16M7.6569 2L11 2C12.6569 2 14 3.3431 14 5L14 8.3431M20 14.3431L20 10M18 6L22 6L22 8.5C22 9.3284 21.3284 10 20.5 10L19.5 10C18.6716 10 18 9.3284 18 8.5L18 6ZM22 6L22 4M18 6L18 4M2 2L22 22" fill="none"/>
    </svg>
  )
}
