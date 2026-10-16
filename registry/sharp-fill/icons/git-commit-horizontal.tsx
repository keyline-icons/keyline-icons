import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GitCommitHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M2 12L10 12M14 12L22 12"/>
      <path d="M12 8C14.0711 8 16 9.9289 16 12C16 14.0711 14.0711 16 12 16C9.9289 16 8 14.0711 8 12C8 9.9289 9.9289 8 12 8Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
