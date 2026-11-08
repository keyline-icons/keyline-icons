import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HousePlay({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11.516 2.07C11.83 1.96 12.337 1.96 12.612 2.17L20.637 8.36L23 10.36L21.708 11.89L21.199 11.46L21.001 11.29V21C21.001 21.55 20.553 22 20.001 22H4.001C3.449 22 3.002 21.55 3.001 21V11.29L2.294 11.89L1 10.36L3.273 8.43L11.516 2.07Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M9.087 8.34C9.384 8.23 9.784 8.24 10.052 8.42L16.428 12.65C16.707 12.83 16.876 13.21 16.876 13.55C16.84 13.83 16.672 14.16 16.428 14.32L10.052 18.55C9.745 18.75 9.35 18.77 9.026 18.6C8.703 18.42 8.501 18.08 8.5 17.71V9.26C8.5 8.89 8.763 8.52 9.087 8.34Z" fill="currentColor"/>
    </svg>
  )
}
