import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TerminalCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M11.5789 14.9797L14.7027 5.3519C14.8263 4.9622 14.4555 4.5969 14.0677 4.7264L4.3411 7.7852C3.9028 7.9316 3.8807 8.5435 4.3074 8.7211L8.353 10.4361C8.468 10.484 8.561 10.5731 8.6138 10.6859L10.6494 15.0402C10.8422 15.4527 11.4412 15.4137 11.5789 14.9797Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M21 18.9999L12 18.9999M15 4.6997L11.1917 16.2002L8.5317 10.5103L3.9995 8.208L15 4.6997Z"/>
    </svg>
  )
}
