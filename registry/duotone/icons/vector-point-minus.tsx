import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VectorPointMinus({ size = 24, ...props }: IconProps) {
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
      <path d="M2 19C2 15 5 11 9 11M13 11C17 11 22 9 22 5" strokeOpacity="0.4"/>
      <path d="M11 8H12C13.105 8 14 8.895 14 10V12C14 13.105 13.105 14 12 14H10C8.895 14 8 13.105 8 12V10C8 8.895 8.895 8 10 8H11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M16 19H22"/>
    </svg>
  )
}
