import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ATextCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M1.93 18.6273L7.002 6L12.074 18.6273M4.19 13H9.813" strokeOpacity="0.4"/>
      <path d="M19 6.8C18.667 6.35 17.6 5 16 5H15M19 6.8C19.333 6.35 20.4 5 22 5H23M19 6.8V17.2M19 17.2C19.333 17.65 20.4 19 22 19H23M19 17.2C18.667 17.65 17.6 19 16 19H15"/>
    </svg>
  )
}
