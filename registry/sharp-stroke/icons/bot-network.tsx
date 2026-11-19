import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BotNetwork({ size = 24, ...props }: IconProps) {
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
      <path d="M11 9C11 9.5523 10.5523 10 10 10C9.4477 10 9 9.5523 9 9C9 8.4477 9.4477 8 10 8C10.5523 8 11 8.4477 11 9ZM15 9C15 9.5523 14.5523 10 14 10C13.4477 10 13 9.5523 13 9C13 8.4477 13.4477 8 14 8C14.5523 8 15 8.4477 15 9Z" fill="currentColor" stroke="none"/>
      <path d="M6 5L18 5L18 13L6 13ZM12 5L12 1M3 9L6 9M18 9L21 9M9 13L5 17M15 13L19 17M2 17L8 17L8 22L2 22ZM16 17L22 17L22 22L16 22Z"/>
    </svg>
  )
}
