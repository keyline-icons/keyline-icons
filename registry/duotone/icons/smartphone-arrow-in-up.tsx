import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SmartphoneArrowInUp({ size = 24, ...props }: IconProps) {
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
      <path d="M15 1C17.7614 1 20 3.23858 20 6V12C20 12.5523 19.5523 13 19 13H13C11.3431 13 10 14.3431 10 16V22C10 22.5523 9.5523 23 9 23C6.23858 23 4 20.7614 4 18V6C4 3.23858 6.23858 1 9 1H15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M13.5 6L10.5 6M16 22L16 16M19 19L16 16L13 19"/>
    </svg>
  )
}
