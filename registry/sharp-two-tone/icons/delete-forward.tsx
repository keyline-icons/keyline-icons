import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DeleteForward({ size = 24, ...props }: IconProps) {
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
      <path d="M15 3C15.288 3 15.563 3.12 15.753 3.34L22.753 11.34C23.082 11.72 23.082 12.28 22.753 12.66L15.753 20.66C15.563 20.88 15.288 21 15 21H2C1.448 21 1 20.55 1 20V4C1 3.45 1.448 3 2 3H15Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M13.293 8.71L10 12M10 12L6.707 15.29M10 12L6.707 8.71M10 12L13.293 15.29M22 12L15 4H2V20H15L22 12Z"/>
    </svg>
  )
}
