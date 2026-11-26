import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BluetoothSearching({ size = 24, ...props }: IconProps) {
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
      <path d="M7 7L17 17L12 22V2L17 7L7 17" strokeOpacity="0.4"/>
      <path d="M21.1652 8C21.7158 9.2617 22 10.6234 22 12C22 13.3766 21.7158 14.7383 21.1652 16M2.8348 8C2.2842 9.2617 2 10.6234 2 12C2 13.3766 2.2842 14.7383 2.8348 16"/>
    </svg>
  )
}
