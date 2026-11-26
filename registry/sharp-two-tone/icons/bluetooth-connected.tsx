import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BluetoothConnected({ size = 24, ...props }: IconProps) {
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
      <path d="M6.707 6.707L17 17L12 22V2L17 7L6.707 17.293" strokeOpacity="0.4"/>
      <path d="M7 12C7 12.552 6.552 13 6 13C5.448 13 5 12.552 5 12C5 11.448 5.448 11 6 11C6.552 11 7 11.448 7 12ZM19 12C19 12.552 18.552 13 18 13C17.448 13 17 12.552 17 12C17 11.448 17.448 11 18 11C18.552 11 19 11.448 19 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
