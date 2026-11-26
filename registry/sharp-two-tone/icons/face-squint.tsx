import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FaceSquint({ size = 24, ...props }: IconProps) {
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
      <path d="M19.778 4.222C21.768 6.211 23 8.963 23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1C15.037 1 17.789 2.232 19.778 4.222Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M8.14 7.2L8.5 7.5L10 8.75L8.5 10L8.14 10.3M15.86 7.2L15.5 7.5L14 8.75L15.5 10L15.86 10.3M22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12ZM8 14H16C16 16.209 14.209 18 12 18C9.791 18 8 16.209 8 14Z"/>
    </svg>
  )
}
