import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TextCursorInput({ size = 24, ...props }: IconProps) {
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
      <path d="M13 7L2 7L2 17L13 17M19 7L22 7L22 17L19 17" fill="none" strokeOpacity="0.4"/>
      <path d="M16 4.25C15.5556 3.6875 14.1333 2 12 2L11 2M16 4.25C16.4444 3.6875 17.8667 2 20 2L21 2M16 4.25L16 19.75M16 19.75C16.4444 20.3125 17.8667 22 20 22L21 22M16 19.75C15.5556 20.3125 14.1333 22 12 22L11 22" fill="none"/>
    </svg>
  )
}
