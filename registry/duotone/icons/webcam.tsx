import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Webcam({ size = 24, ...props }: IconProps) {
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
      <path d="M3 7C3 3.6863 5.6863 1 9 1L15 1C18.3137 1 21 3.6863 21 7L21 13C21 16.3137 18.3137 19 15 19L9 19C5.6863 19 3 16.3137 3 13L3 7Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.3431 10.3431 7 12 7C13.6569 7 15 8.3431 15 10ZM12 18L12 22M6 22L18 22" fill="none"/>
    </svg>
  )
}
