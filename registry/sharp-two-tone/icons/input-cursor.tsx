import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function InputCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M21 7L2 7L2 17L13 17" fill="none" strokeOpacity="0.4"/>
      <path d="M6 10L6 14M17.9543 17L15.8719 10.8669L22 13.0514L19.4086 14.3063L17.9543 17Z" fill="none"/>
    </svg>
  )
}
